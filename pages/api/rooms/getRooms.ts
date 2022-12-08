import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

const ViewRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rooms = await prisma.rooms.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        image_url: true,
      },
    });
    res.status(200).json({ rooms });
  } catch (error) {
    console.log(error);
  }
};

export default ViewRoom;

// const ViewRoom = async (req: NextApiRequest, res: NextApiResponse) => {
//   const pages: number = Number(req.query.pages) || 1;
//   const skip = (pages - 1) * 10;
//   const searchQuery = req.query.search?.toString();
//   const rooms = await prisma.rooms.findMany({
//     skip,
//     take: 10,
//     where: {
//       name: {
//         contains: searchQuery,
//         mode: 'insensitive',
//       },
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//     include: {
//       image_url: {},
//     },
//   });
//   if (searchQuery) {
//     const numberOfPages = Math.ceil(rooms.length / 10);
//     res.status(200).json({ rooms, numberOfPages });
//   } else {
//     const totalrooms = await prisma.rooms.count();
//     const numberOfPages = Math.ceil(totalrooms / 10);
//     res.json({ rooms, numberOfPages });
//   }
// };
