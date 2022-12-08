import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import { roomData } from '../../assets/roomData';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { roomTypes } from '../../types/RoomTypes';
import Link from 'next/link';
import { formatter } from '../../utils/format';
// import { RidesAndRoomTypes } from '../../pages';
const Rooms: FC<roomTypes> = ({ rooms }) => {
  return (
    <div>
      <p className='text-3xl font-semibold text-center md:text-left'>
        <span className='primary-clr my-8'>Explore</span> our rooms
      </p>
      <div className='flex gap-4 overflow-x-auto my-8 scrollbar-hide md:overflow-hidden md:grid md:grid-cols-3 md:gap-8'>
        {rooms &&
          rooms.slice(0, 6).map((rooms) => {
            const { id, name, number_of_guests, price, image_url } = rooms;
            return (
              <div key={id} className='w-[16rem] md:w-[23rem]'>
                <Link href={`/rooms/${id}`}>
                  <a>
                    {image_url.map((data: any, index: any) => {
                      return (
                        <div key={index}>
                          <div className='mb-3 md:hidden relative cursor-pointer'>
                            <Image
                              src={data.url[0].url}
                              alt={data.name}
                              width={200}
                              height={200}
                              priority
                              layout='responsive'
                              className='rounded-3xl'
                            />
                            <div className='bg-white p-2 primary-clr rounded-xl w-fit absolute z-50 top-1 right-2'>
                              <p>{formatter(price)}</p>
                            </div>
                          </div>
                          <div className='mb-3 hidden relative cursor-pointer md:block'>
                            <Image
                              src={data.url[0].url}
                              alt={data.name}
                              width={200}
                              height={200}
                              priority
                              layout='responsive'
                              className='rounded-md relative'
                            />
                            <div className='bg-white p-2 primary-clr rounded-xl w-fit absolute z-50 top-1 right-2'>
                              <p>{formatter(price)}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className='flex justify-between gap-1'>
                      <p className='font-semibold'>{name}</p>
                      <div className='flex space-x-2 items-center'>
                        <AiFillStar className='text-yellow-400' />{' '}
                        <p className='font-semibold'>5.0</p>
                      </div>
                    </div>
                    <p className='text-sm'>Up to {number_of_guests} persons</p>
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

export default Rooms;
