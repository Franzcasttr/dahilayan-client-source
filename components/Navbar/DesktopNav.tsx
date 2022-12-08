import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { BsMenuUp } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { DesktopnavbarData } from '../../assets/navbarData';
import { ProfileData } from '../../assets/profileLinks';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { getUser } from '../../features/user/userSlice';
import Logo from '../Logo/Logo';

const DesktopNav = () => {
  const { replace, pathname, push } = useRouter();
  const { data: session } = useSession();
  const { user, loading } = useAppSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenModal(false);
      }
    };
    document.addEventListener('mousedown', getClickOutside);
    return () => {
      document.removeEventListener('mousedown', getClickOutside);
    };
  }, [openModal]);

  useEffect(() => {
    if (session) {
      dispatch(getUser());
    }
  }, [session || user]);

  return (
    <div className='hidden md:flex md:justify-between md:items-center py-8 section-center'>
      <p>Logo</p>
      <div className=' flex gap-8 bg-[#EFF6FF]'>
        {DesktopnavbarData.map((data) => {
          const { id, name, link } = data;
          return (
            <div key={id}>
              <Link href={link}>
                <a
                  className={
                    pathname === link ? ' text-[#14DAB6] font-bold' : ' '
                  }>
                  <p>{name}</p>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <div className='relative'>
        {session ? (
          <div
            className='flex items-center gap-2 py-1 px-4 border border-gray-300 rounded-full cursor-pointer'
            onClick={() => setOpenModal(!openModal)}>
            <BsMenuUp className='text-xl' />
            {user.image !== undefined ? (
              <Image
                src={user.image}
                alt={user.name}
                width={35}
                height={35}
                layout='fixed'
                className='rounded-full'
              />
            ) : (
              <CgProfile className='text-3xl' />
            )}
          </div>
        ) : (
          <p
            className='primary-clr cursor-pointer'
            onClick={() => push('/auth/signin')}>
            Login
          </p>
        )}
        {openModal && (
          <div
            ref={menuRef}
            className='absolute right-0 seconday-bg w-[250px] h-fit p-4  rounded-xl z-[99999] mt-3 drop-shadow-8xl'>
            {ProfileData.map((data, index) => {
              const { name, icon, links } = data;
              return (
                <div
                  key={index}
                  className='mb-4'
                  onClick={() => setOpenModal(false)}>
                  <Link href={links}>
                    <a>
                      <div className='flex justify-between cursor-pointer'>
                        <p>{name}</p>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
            <hr className='bg-gray-300 my-4' />
            <button
              onClick={() => {
                signOut({ redirect: true, callbackUrl: '/' });
                setOpenModal(false);
              }}
              className='red-clr'>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
