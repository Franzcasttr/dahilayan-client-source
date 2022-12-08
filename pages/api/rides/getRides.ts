import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getRides = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rides = await prisma.rides.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json({ rides });
  } catch (error) {
    res.status(400).json({ errorMsg: error });
  }
};

export default getRides;
