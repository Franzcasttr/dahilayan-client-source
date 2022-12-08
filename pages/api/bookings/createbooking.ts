import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createBookings = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    userById,
    check_in,
    check_out,
    room_type,
    paid,
    number_of_nights,
    payment_intent_id,
  } = req.body;
  //   try {
  //     await prisma.bookings.create({dat:{

  //     }})
  //   } catch (error) {
  //     console.log(error)
  //   }
  try {
    await prisma.bookings.create({
      data: {
        userById,
        check_in,
        check_out,
        paid,
        roomsById: room_type,
        number_of_nights,
        payment_intent_id,
      },
    });

    res.status(201).json({ msg: 'successfully' });
  } catch (error) {
    console.log(error);
  }
};
export default createBookings;
