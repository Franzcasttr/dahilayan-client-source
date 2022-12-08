import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const GetSingleRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const rideID = id?.toString();
  try {
    const singleRide = await prisma.rides.findUnique({
      where: {
        id: rideID,
      },
    });
    res.status(200).json({ singleRide });
  } catch (error) {
    res
      .status(400)
      .json({ errorMsg: 'Something went wrong please try again later' });
  }
};

export default GetSingleRide;
