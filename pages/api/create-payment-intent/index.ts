import { NextApiRequest, NextApiResponse } from 'next';

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: number) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  items * 100;
  return items;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    userById,
    check_in,
    check_out,
    room_type,
    paid,
    number_of_nights,
    number_of_guest,
  } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(paid),
    currency: 'usd',
    metadata: {
      booking: JSON.stringify({
        userById,
        check_in,
        check_out,
        room_type,
        paid,
        number_of_nights,
        number_of_guest,
      }),
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
