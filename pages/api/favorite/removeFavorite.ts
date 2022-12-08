import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
const deleteFavorites = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { userID, productID } = req.body;

  const id = session?.id as string;
  const productId = productID?.toString();

  try {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        favorite: {
          deleteMany: { roomProductId: productId },
        },
      },
    });
    res.status(200).json({ msg: 'Successfully deleted' });
  } catch (error) {
    console.log(error);
  }
  // res.send('hello world');
};

export default deleteFavorites;
