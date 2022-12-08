import React, { FC } from 'react';

import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { ridesData } from '../../assets/ridesData';
import { RidesTypes } from '../../types/RidesTypes';
import { formatter } from '../../utils/format';
import Link from 'next/link';
const Rides: FC<RidesTypes> = ({ rides }) => {
  return (
    <div className='my-10'>
      <p className='text-3xl font-semibold text-center md:text-left'>
        <span className='primary-clr my-8'>See</span> our rides
      </p>
      <div className='flex gap-4 overflow-x-auto my-8 scrollbar-hide md:overflow-hidden md:grid md:grid-cols-3 md:gap-8'>
        {rides.slice(0, 6).map((rooms) => {
          const { id, name, price, image_url } = rooms;
          const firstImage = image_url[0];
          return (
            <div key={id} className='w-[16rem] md:w-[23rem]'>
              <Link href={`/rides/${id}`}>
                <a>
                  <div className='mb-3 md:hidden relative'>
                    <Image
                      className='rounded-3xl'
                      src={firstImage.url}
                      alt={name}
                      width={200}
                      height={200}
                      layout='responsive'
                    />
                    <div className='bg-white p-2 primary-clr rounded-xl w-fit absolute z-50 top-1 right-2'>
                      <p>₱{price}</p>
                    </div>
                  </div>
                  <div className='mb-3 w-full hidden relative md:block'>
                    <Image
                      src={firstImage.url}
                      alt={name}
                      width={200}
                      height={200}
                      layout='responsive'
                      className='rounded-2xl relative'
                    />
                    <div className='bg-white p-2 primary-clr rounded-xl w-fit absolute z-50 top-1 right-2'>
                      <p>{formatter(price)}</p>
                    </div>
                  </div>
                  <div className='flex justify-between gap-1'>
                    <p className='font-semibold'>{name}</p>
                    {/* <div className='flex space-x-2 items-center'>
                      <AiFillStar className='text-yellow-400' />{' '}
                      <p className='font-semibold'>5.0</p>
                    </div> */}
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <div className='w-fit mx-auto'>
        <button className='p-4 drop-shadow-4xl bg-[#EFF6FF] rounded-xl primary-clr font-semibold '>
          View more
        </button>
      </div>
    </div>
  );
};

export default Rides;
