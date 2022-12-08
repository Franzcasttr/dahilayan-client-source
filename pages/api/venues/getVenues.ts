import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

const ViewVenue = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const venues = await prisma.venues.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json({ venues });
  } catch (error) {
    console.log(error);
  }
};

export default ViewVenue;
