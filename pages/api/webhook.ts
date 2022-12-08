import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import Stripe from 'stripe';
import { Readable } from 'stream';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const webhookSecret =
  'whsec_d9804f55fb8a146f9b574f5d4fb2c8a960391d781ed84be4e3ccbe608732898b';
export const config = {
  api: {
    bodyParser: false,
  },
};

interface IObject {
  userById: string;
  check_in: string;
  check_out: string;
  room_type: string;
  paid: number;
  number_of_nights: number;
  number_of_guest: number;
}

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string | string[] | Buffer;

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    console.log(`Webhook Error: ${err.message}`);
    return;
  }

  const data = event.data.object.metadata.booking;
  if (event.type === 'payment_intent.succeeded') {
    const payment_intent_id = event.data.object.id;
    CreateOrderSuccess(data, payment_intent_id, res);
  } else {
    console.log('somthing went wrong');
  }

  res.json({ received: true });
};
export default handler;

const CreateOrderSuccess = async (
  paymentMethod: string,
  payment_intent_id: string,
  res: NextApiResponse
) => {
  const bookingData = JSON.parse(paymentMethod) as IObject;
  const {
    check_in,
    check_out,
    number_of_nights,
    paid,
    room_type,
    userById,
    number_of_guest,
  } = bookingData;

  try {
    const result = await prisma.bookings.create({
      data: {
        userById,
        check_in,
        check_out,
        paid,
        roomsById: room_type,
        number_of_nights,
        payment_intent_id,
        number_of_guest,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
