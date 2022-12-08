import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { GiBrokenHeartZone } from 'react-icons/gi';
import { IoArrowBackSharp } from 'react-icons/io5';
import { roomData } from '../../assets/roomData';
import Footer from '../../components/Footer/Footer';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import {
  getUserFavorites,
  removeToFavorites,
} from '../../features/favorite/favoriteSlice';
import { formatter } from '../../utils/format';

// export const getServerSideProps: GetServerSideProps = async ()=>{

// const res = await API.get

//   return{
//     props:{

//     }
//   }
// }

const MyWishlistPage = () => {
  const { push, pathname } = useRouter();
  const dispatch = useAppDispatch();
  const { myFavorite } = useAppSelector((state) => state.favorite);
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(getUserFavorites());
    if (!session?.user.name) {
      push(`/auth/signin?callbackUrl=${pathname}`);
    }
  }, []);

  const handleRemoveFavorites = (id: string) => {
    const payload = { productID: id };
    dispatch(removeToFavorites(payload));
  };

  if (myFavorite.length === 0) {
    return (
      <div>
        <div className='border-b border-gray-300  seconday-bg sticky top-0 z-50 font-semibold md:hidden'>
          <div className='py-4 flex justify-between items-center section-center'>
            <IoArrowBackSharp
              className='text-3xl font-semibold cursor-pointer'
              onClick={() => push('/profile')}
            />
            <p className='text-xl'>Wishlist</p>
            <div></div>
          </div>
        </div>
        <div className='section-center'>
          <div className='mt-12 flex flex-col items-center gap-3'>
            <GiBrokenHeartZone className='text-7xl red-clr' />
            <div>
              <p className='text-center text-lg mt-3'>
                On no you have no Wishlist!
              </p>
            </div>
            <button
              onClick={() => push('/rooms')}
              className='bg-black mt-4 text-white p-4 rounded-lg'>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='border-b border-gray-300  seconday-bg sticky top-0 z-50 font-semibold md:hidden'>
        <div className='py-4 flex justify-between items-center section-center'>
          <IoArrowBackSharp
            className='text-3xl font-semibold cursor-pointer'
            onClick={() => push('/profile')}
          />
          <p className='text-xl'>Wishlist</p>
          <div></div>
        </div>
      </div>
      <div className='section-center py-8'>
        <div className=' grid grid-cols-2 gap-8 lg:grid-cols-4 mb-8  md:grid-cols-3'>
          {myFavorite &&
            myFavorite.map((rooms) => {
              const { id, roomProduct, roomProductId } = rooms;
              const { image_url, name, number_of_guests, price } = roomProduct;

              return (
                <div
                  key={id}
                  className='seconday-bg drop-shadow-4xl p-4 rounded-2xl'>
                  {image_url.map((data, index: number) => {
                    return (
                      <div
                        key={index}
                        className='mb-3 relative cursor-pointer w-full h-[8rem] md:h-[10rem]'>
                        <Image
                          src={data.url[0].url}
                          alt={data.name}
                          layout='fill'
                          className='rounded-xl'
                        />
                        <div className='section-center'>
                          <button
                            onClick={() => handleRemoveFavorites(roomProductId)}
                            className='p-2 rounded-full bg-white absolute right-1 mt-2 z-50'>
                            <AiFillHeart className='text-lg cursor-pointer text-red-400' />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <Link href={`/rooms/${roomProductId}`}>
                    <a>
                      <div className='space-y-1'>
                        <p className='font-semibold text-base'>
                          {name.substring(0, 20)} ...
                        </p>

                        <p className='text-sm'>
                          Up to {number_of_guests} persons
                        </p>
                        <p className='font-semibold'>{formatter(price)}</p>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <footer className=' '>
        <Footer />
      </footer>
    </div>
  );
};

export default MyWishlistPage;

// {roomData.map((rooms) => {
//   const { id, name, number_of_guests, price, image_url } = rooms;
//   return (
//     <div
//       key={id}
//       className='seconday-bg drop-shadow-4xl p-4 rounded-2xl'>
//       <Link href={`/rooms/${id}`}>
//         <a>
//           <div className='mb-3 relative cursor-pointer w-full h-[8rem] md:h-[10rem]'>
//             <Image
//               src={image_url}
//               alt={name}
//               layout='fill'
//               className='rounded-xl'
//             />
//             <div className='section-center'>
//               <div className='p-2 rounded-full bg-white absolute mt-3 right-2'>
//                 <AiFillHeart className='text-lg cursor-pointer text-red-400' />
//               </div>
//             </div>
//           </div>
//           <div className='space-y-1'>
//             <p className='font-semibold text-lg'>{name}</p>

//             <p className='text-sm'>
//               Up to {number_of_guests} persons
//             </p>
//             <p className='font-semibold'>₱{price}</p>
//           </div>
//         </a>
//       </Link>
//     </div>
//   );
// })}
