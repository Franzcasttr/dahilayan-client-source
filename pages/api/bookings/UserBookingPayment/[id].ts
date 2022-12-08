import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getUserPaymentIntent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.id;
  const pid = id?.toString();

  try {
    const result = await prisma.bookings.findFirstOrThrow({
      where: {
        payment_intent_id: pid,
      },
      include: {
        roomBy: {
          select: {
            name: true,
            bathrooms: true,
            bedrooms: true,
            beds: true,
            number_of_guests: true,
          },
        },
        userBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ errorMsg: 'Something went wrong' });
  }
};

export default getUserPaymentIntent;
