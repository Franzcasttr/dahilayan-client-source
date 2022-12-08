import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

const myBookingList = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id?.toString();

  try {
    const result = await prisma.bookings.findMany({
      where: {
        userById: id,
      },
      include: {
        roomBy: {
          select: {
            id: true,
            name: true,
            bathrooms: true,
            bedrooms: true,
            beds: true,
            number_of_guests: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default myBookingList;
