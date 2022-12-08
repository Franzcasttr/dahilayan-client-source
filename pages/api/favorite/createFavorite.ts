import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

const createFavorites = async (req: NextApiRequest, res: NextApiResponse) => {
  const { productID } = req.body;

  const session = await unstable_getServerSession(req, res, authOptions);

  try {
    const result = await prisma.favorite.create({
      data: {
        favoriteId: session?.id as string,
        roomProductId: productID,
      },
    });
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export default createFavorites;
