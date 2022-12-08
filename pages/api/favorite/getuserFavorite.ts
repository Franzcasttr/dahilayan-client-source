import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getUserFavorite = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    try {
      const result = await prisma.favorite.findMany({
        where: {
          favoriteId: session?.id as string,
        },
        include: {
          roomProduct: {
            select: {
              number_of_guests: true,
              image_url: true,
              name: true,
              price: true,
            },
          },
        },
      });
      res.status(200).json({ result });
    } catch (error) {
      res.status(403).json({ error: 'somthing went wrong' });
    }
  } else {
    res.status(403).json({ error: 'Please login to continue' });
  }
};

export default getUserFavorite;
