import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

const viewUserReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  try {
    const result = await prisma.reviews.findMany({
      where: {
        userId: session?.id as string,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    res.status(200).json({ result });
  } catch (error: any) {
    res.status(400).json({ errorMsg: error.message });
  }
};

export default viewUserReview;
