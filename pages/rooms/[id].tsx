import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../../components/Footer/Footer';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { API } from '../../client/config';
import { roomDataTypes, singleRoomTypes } from '../../types/RoomTypes';

import 'swiper/css';
import 'swiper/css/pagination';
import 'react-datepicker/dist/react-datepicker.css';

import ImageGallery from '../../components/Rooms/ImageGallery';
import MobileView from '../../components/Rooms/MobileView';
import RoomWebView from '../../components/Rooms/RoomWebView';
import RoomReviews from '../../components/Rooms/RoomReviews';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { getUserFavorites } from '../../features/favorite/favoriteSlice';
import { useSession } from 'next-auth/react';
import ReviewModal from '../../components/Reviews/ReviewModal';
import { AiFillCloseCircle } from 'react-icons/ai';
import TitleHeader from '../../components/Header/Title';

const RoomDetails: FC<singleRoomTypes> = ({ singleRoom }) => {
  const { push, query } = useRouter();
  const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);
  const [openPicture, setOpenPicture] = useState<boolean>(false);
  const [isOpenReview, setIsOpenReview] = useState<boolean>(false);
  const [roomImg, setRoomImg] = useState<string>('');
  const [favorites, setFavorites] = useState<boolean>(false);
  const { myFavorite } = useAppSelector((state) => state.favorite);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      dispatch(getUserFavorites());
    }
  }, [session]);

  const handleBackClick = () => {
    push('/rooms');
  };

  const handleSingleImage = (data: string) => {
    setOpenPicture(true);
    setRoomImg(data);
  };

  const {
    id,
    name,

    price,
    image_url,
    reviews,
  } = singleRoom;

  let roomId: string | undefined;
  const roomIdFilter = myFavorite.filter((item) => item.roomProductId === id);
  roomIdFilter.map((item) => {
    roomId = item.roomProductId;
    return item;
  });

  if (isOpenGallery) {
    return (
      <ImageGallery
        roomImg={roomImg}
        setOpenPicture={setOpenPicture}
        setIsOpenGallery={setIsOpenGallery}
        image_url={image_url}
        handleSingleImage={handleSingleImage}
        name={name}
        openPicture={openPicture}
      />
    );
  }

  return (
    <>
      <TitleHeader titlePage={name} />
      <AnimatePresence>
        {isOpenReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='modal-backdrop'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='review-content scrollbar-hide'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <div className='flex justify-end text-4xl mb-3 cursor-pointer'>
                  <AiFillCloseCircle
                    onClick={() => setIsOpenReview(false)}
                    className='text-black'
                  />
                </div>
                <ReviewModal reviews={reviews} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileView
        handleBackClick={handleBackClick}
        setFavorites={setFavorites}
        favorites={favorites}
        setIsOpenGallery={setIsOpenGallery}
        singleRoom={singleRoom}
        roomId={roomId}
      />

      {/* web */}
      <RoomWebView
        setIsOpenGallery={setIsOpenGallery}
        singleRoom={singleRoom}
        setFavorites={setFavorites}
        favorites={favorites}
        roomId={roomId}
      />

      <div className='section-center'>
        <p className='font-semibold text-xl'>Hotel Rules</p>
        <p className='text-sm'>Check-in: 3:00 PM - 9:00 PM</p>
        <hr className='border border-gray-200 my-8' />
      </div>
      {/* reviews */}
      <RoomReviews reviews={reviews} setIsOpenReview={setIsOpenReview} />

      <footer className=' bg-black text-white md:block'>
        <Footer />
      </footer>
      <div className='my-20 md:hidden'></div>
    </>
  );
};

export default RoomDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await API.get('rooms/getRooms');
  const { rooms } = res.data;
  const paths = rooms.map((rooms: roomDataTypes) => ({
    params: { id: rooms.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const roomID = ctx.params?.id;
  const res = await API.get(`rooms/${roomID}`);
  const { singleRoom } = res.data;

  return {
    props: {
      singleRoom,
    },
  };
};

{
  /* <div className='columns-2 md:columns-3 lg:columns-4 overflow-y-scroll'>
          <img className='mb-4' src='https://source.unsplash.com/random/1' />
          <img className='mb-4' src='https://source.unsplash.com/random/2' />
          <img className='mb-4' src='https://source.unsplash.com/random/3' />
          <img className='mb-4' src='https://source.unsplash.com/random/4' />
          <img className='mb-4' src='https://source.unsplash.com/random/5' />
          <img className='mb-4' src='https://source.unsplash.com/random/6' />
          <img className='mb-4' src='https://source.unsplash.com/random/7' />
          <img className='mb-4' src='https://source.unsplash.com/random/8' />
          <img className='mb-4' src='https://source.unsplash.com/random/10' />
          <img className='mb-4' src='https://source.unsplash.com/random/11' />
          <img className='mb-4' src='https://source.unsplash.com/random/12' />
          <img className='mb-4' src='https://source.unsplash.com/random/13' />
          <img className='mb-4' src='https://source.unsplash.com/random/14' />
          <img className='mb-4' src='https://source.unsplash.com/random/15' />
          <img className='mb-4' src='https://source.unsplash.com/random/16' />
          <img className='mb-4' src='https://source.unsplash.com/random/17' />
          <img className='mb-4' src='https://source.unsplash.com/random/18' />
          <img className='mb-4' src='https://source.unsplash.com/random/19' />
          <img className='mb-4' src='https://source.unsplash.com/random/20' />
        </div> */
}
