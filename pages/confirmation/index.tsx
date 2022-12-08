import moment from 'moment';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IoArrowBackSharp } from 'react-icons/io5';
import { roomDetails } from '../../assets/roomData';
import { API } from '../../client/config';
import PaymentForm from '../../components/Payment/PaymentForm';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { createBooking } from '../../features/booking/bookingSlice';
import { singleRoomTypes } from '../../types/RoomTypes';
import { formatter } from '../../utils/format';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../../components/PaymentForm/CheckoutForm';
import LoginForm from '../../components/LoginForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const ConfirmationPage: FC<singleRoomTypes> = ({ singleRoom }) => {
  const { back, query, pathname, push } = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { message, loading } = useAppSelector((state) => state.booking);
  const [clientSecret, setClientSecret] = React.useState('');

  const {
    id,
    name,
    number_of_guests,
    price,
    image_url,
    amenities,
    bathrooms,
    bedrooms,
    beds,
    bedtype,
    description,
  } = singleRoom;
  // if(isReady){
  // setAdult(query.adults)
  // }  const datestart = moment(startDate).format('YYYY-MM-DD');
  const dateStartquery = query.startDate;
  const dateEndquery = query.endDate;
  const room_type = query.roomID;
  const dateEnd = moment(query.endDate).format('YYYY-MM-DD');
  const dateStart = moment(query.startDate).format('YYYY-MM-DD');
  const adultQuery: number = parseInt(query.adults as string);
  const childrenQuery: number = parseInt(query.children as string);
  const infantQuery: number = parseInt(query.infant as string);

  const total_guest = adultQuery + childrenQuery + infantQuery;
  // let Days: number = 0;

  const numberOfDays = (date1: any, date2: any) => {
    const diff = Math.abs(date1 - date2);

    return diff / (1000 * 60 * 60 * 24);
  };
  const number_of_nights = numberOfDays(new Date(dateStart), new Date(dateEnd));

  const stayCost = price * number_of_nights;
  const totalCost = stayCost + 500;

  const payload = {
    userById: session?.id,
    check_in: dateStartquery,
    check_out: dateEndquery,
    room_type,
    paid: totalCost,
    number_of_nights,
    number_of_guest: total_guest,
  };
  const handleSubmitRequest = async () => {
    dispatch(createBooking(payload));
  };

  // useEffect(() => {
  //   if (message === 'successfully') {
  //     push(
  //       `/success?roomID=${id}&startDate=${dateStartquery}&endDate=${dateEndquery}&adults=${adultQuery}&children=${childrenQuery}&infant=${infantQuery}`
  //     );
  //     // push('/success')
  //   }
  // }, [message]);

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (session) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [session]);
  // if (!session) {
  //   push(`/auth/signin?callbackUrl=${pathname}`);
  // }
  return (
    <div className='mb-4'>
      <div className='border-b border-gray-300  seconday-bg sticky top-0 z-50 font-semibold'>
        <div className='py-4 flex justify-between items-center section-center'>
          <IoArrowBackSharp
            className='text-3xl font-semibold'
            onClick={() => back()}
          />
          <p className='text-xl'>Confirm and pay</p>
          <div></div>
        </div>
      </div>

      <div className='mt-8'>
        <div>
          <div className='section-center flex gap-3 p-4 seconday-bg drop-shadow-4xl rounded-xl md:gap-7'>
            {image_url.map((data, index: number) => {
              // console.log(data.url[0]);
              return (
                <div
                  key={index}
                  className='relative w-full h-[8rem] mb-4 md:w-32'>
                  <Image
                    src={data.url[0].url}
                    alt={name}
                    layout='fill'
                    className='rounded-xl'
                  />
                </div>
              );
            })}

            <div className='space-y-3'>
              <p className='font-semibold text-xl'>{name}</p>
              <div className='flex space-x-1 items-center'>
                <AiFillStar className='text-yellow-400' />{' '}
                <p className='font-semibold'>5.0</p>
              </div>
              <p className='text-sm'>
                {number_of_guests} guest - {bedrooms} bedrooms - {beds} beds -{' '}
                {bathrooms} bathrooms
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='section-center'>
        <hr className='border border-gray-200 my-12' />
        <div className='mt-8'>
          <p className='text-2xl'>Good to know:</p>
          <p className='mt-3 text-gray-400'>
            To receive a full refund, guests must cancel within 48 hours of
            booking, and the cancellation must occur at least 14 days before
            check-in.
            <br />
            <br />
            If you cancel between 7 and 14 days before check-in, your account
            will be charge 50% for all nights, and if you cancel after that,
            your account will be charge 100% for all nights.
          </p>
        </div>
        <hr className='border border-gray-200 my-12' />
        <div className='space-y-3'>
          <p className='text-2xl'>Your Booking</p>
          <div className='uppercase'>
            <p>check-in</p>
            <p>{dateStartquery}</p>
          </div>
          <div className='uppercase'>
            <p>check-out</p>
            <p>{dateEndquery}</p>
          </div>
          <div className='uppercase'>
            <p>Guest</p>
            <p>{total_guest}</p>
          </div>
        </div>
        <hr className='border border-gray-200 my-12' />
        <div className='space-y-3'>
          <p className='text-2xl'>Price Details</p>
          <div className='flex justify-between'>
            <p>
              {formatter(price)} x {number_of_nights} nights
            </p>
            <p>{formatter(stayCost)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='underline'>Cleaning fee</p>
            <p>{formatter(500)}</p>
          </div>
          <div className='flex justify-between font-bold text-xl'>
            <p>Total</p>
            <p>{formatter(price * number_of_nights + 500)}</p>
          </div>
        </div>
        <hr className='border border-gray-200 my-12' />
        <p className='text-2xl my-4'>Payment</p>
        {!session ? (
          <LoginForm />
        ) : (
          <div className='App mb-32'>
            {clientSecret && (
              <Elements
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'flat',
                    variables: { colorBackground: '#fff' },
                  },
                }}
                stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        )}
        {/* <PaymentForm handleSubmitRequest={handleSubmitRequest} /> */}
      </div>
    </div>
  );
};

export default ConfirmationPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { roomID } = ctx.query;

  const res = await API.get(`rooms/${roomID}`);
  const { singleRoom } = res.data;

  return {
    props: {
      singleRoom,
    },
  };
};
