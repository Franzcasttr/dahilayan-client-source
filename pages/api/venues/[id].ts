import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const HandleActionRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const roomID = id?.toString();

  try {
    const singleVenue = await prisma.venues.findUnique({
      where: {
        id: roomID,
      },
    });
    res.status(200).json({ singleVenue });
  } catch (error) {
    console.log(error);
  }
};

export default HandleActionRoom;
