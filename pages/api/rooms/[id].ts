import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const HandleActionRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const roomID = id?.toString();

  if (req.method === 'GET') {
    try {
      const singleRoom = await prisma.rooms.findUnique({
        where: {
          id: roomID,
        },

        include: {
          image_url: true,
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json({ singleRoom });
    } catch (error) {
      res.status(400).json({ errorMsg: 'Something went wrong' });
    }
  }
};

export default HandleActionRoom;
