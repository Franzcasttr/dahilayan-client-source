import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import Footer from '../../components/Footer/Footer';
import TitleHeader from '../../components/Header/Title';
import EditProfile from '../../components/User/EditProfile';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { getUser } from '../../features/user/userSlice';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const myAccountPage = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const { push, pathname } = useRouter();

  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
    if (!session) {
      push(`/auth/signin?callbackUrl=${pathname}`);
    }
  }, []);
  // const { name, id, date_of_birth, gender, email, phone_number } = user;
  // console.log(user.name);
  // const mapping = user.map((item) => {
  //   console.log(item);
  //   return item;
  // });

  if (loading) {
    return <div className='mt-8 text-center'>Loading...</div>;
  }

  return (
    <>
      <TitleHeader titlePage='My Account' />
      <div>
        <div className='border-b border-gray-300  seconday-bg sticky top-0 z-50 font-semibold md:hidden'>
          <div className='py-4 flex justify-between items-center section-center'>
            <IoArrowBackSharp
              className='text-3xl font-semibold cursor-pointer'
              onClick={() => push('/profile')}
            />
            <p className='text-xl'>Account</p>
            <div></div>
          </div>
        </div>
        <p className='text-2xl text-center font-semibold my-12'>
          Personal Info
        </p>
        <EditProfile user={user} />
        <footer className=' bg-black text-white md:block mt-32'>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default myAccountPage;
