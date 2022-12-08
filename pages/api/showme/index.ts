import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
const prisma = new PrismaClient();

const Whoiam = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(403).json({ errorMsg: 'no user' });
  }
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: session?.id as string,
      },
      select: {
        id: true,
        image: true,
        phone_number: true,
        name: true,
        date_of_birth: true,
        gender: true,
        role: true,
        email: true,
      },
    });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(403).json({ errorMsg: 'Something went wrong' });
  }
  //   res.send('heelo');
};

export default Whoiam;
