import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

const HandleActionUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  //   if (req.method === 'DELETE') {
  //     try {
  //       await prisma.user.delete({
  //         where: { id },
  //       });

  //       return res.status(200).json({ msg: 'Successfully deleted rooms' });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  const { name, date_of_birth, gender, phone_number } = req.body;
  if (name) {
    try {
      await prisma.user.update({
        where: {
          id: session?.id as string,
        },
        data: {
          name,
        },
      });
      res.status(200).json({ msg: 'Successfully updated rooms' });
    } catch (error) {
      res.status(500).json({ errorMsg: 'Somthing went wrong' });
    }
  }
  if (date_of_birth) {
    try {
      await prisma.user.update({
        where: {
          id: session?.id as string,
        },
        data: {
          date_of_birth,
        },
      });
      res.status(200).json({ msg: 'Successfully updated rooms' });
    } catch (error) {
      res.status(500).json({ errorMsg: 'Somthing went wrong' });
    }
  }
  if (gender) {
    try {
      await prisma.user.update({
        where: {
          id: session?.id as string,
        },
        data: {
          gender,
        },
      });
      res.status(200).json({ msg: 'Successfully updated rooms' });
    } catch (error) {
      res.status(500).json({ errorMsg: 'Somthing went wrong' });
    }
  }
  if (phone_number) {
    try {
      await prisma.user.update({
        where: {
          id: session?.id as string,
        },
        data: {
          phone_number,
        },
      });
      res.status(200).json({ msg: 'Successfully updated rooms' });
    } catch (error) {
      res.status(500).json({ errorMsg: 'Somthing went wrong' });
    }
  }
};

export default HandleActionUsers;
