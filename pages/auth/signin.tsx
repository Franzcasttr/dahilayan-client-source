import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { API } from '../../client/config';
import { signup } from '../../client/request';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [switchAuth, setSwitchAuth] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const { push, query } = useRouter();
  const callback = query.callbackUrl;

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    const payload = { email, password };
    await signIn('credentials', { ...payload, redirect: false });
  };

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    const payload = { name, email, password };
    await signup(payload);
  };

  // if (session && session.role !== 'SuperAdmin') {
  //   signOut();
  //   return (
  //     <div className='section-center'>
  //       <div className='text-center mt-32'>
  //         <h1 className='text-xl font-semibold'>
  //           Not allowed to access this page...
  //         </h1>
  //       </div>
  //     </div>
  //   );
  // }
  if (session) {
    if (callback) {
      setTimeout(() => {
        push(`${callback}`);
      }, 2000);
    } else {
      setTimeout(() => {
        push('/');
      }, 2000);
    }
    return (
      <div className='section-center'>
        <div className='text-center mt-32'>
          <h1 className='text-xl font-semibold'>Checking Authentication...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='section-center'>
      <div className='p-8 border-2 border-gray-300 rounded-3xl w-fit mx-auto mt-20'>
        {switchAuth ? (
          <p className='font-semibold text-center mb-3 text-xl'>Sign up</p>
        ) : (
          <p className='font-semibold text-center mb-3 text-xl'>Login</p>
        )}
        <form className='flex flex-col gap-4 form-login'>
          {switchAuth && (
            <>
              <label htmlFor='email'>Name</label>
              <input
                type='text'
                name='name'
                id='email'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {switchAuth ? (
            <button
              className='p-2 mx-auto text-lg rounded-lg bg-[#65CFA9] text-white w-28 cursor-pointer'
              onClick={handleSignup}>
              Sign up
            </button>
          ) : (
            <button
              className='p-2 mx-auto text-lg rounded-lg bg-[#65CFA9] text-white w-28 cursor-pointer'
              onClick={handleLogin}>
              Login
            </button>
          )}
        </form>
        <p className='font-semibold text-center my-3 text-xl'>or</p>
        <div className='flex justify-center'>
          <button
            className='flex gap-4 items-center cursor-pointer p-4 border border-gray-400 rounded-md'
            onClick={() => signIn('google')}>
            <FcGoogle className='text-4xl' />
            <p>Continue with Google</p>
          </button>
        </div>
        <div className='text-center'>
          {switchAuth ? (
            <p className='text-sm mt-4'>
              Already have an account?{' '}
              <button
                className='text-blue-400 font-semibold cursor-pointer'
                onClick={() => setSwitchAuth(false)}>
                Login
              </button>
            </p>
          ) : (
            <p className='text-sm mt-4'>
              Don't you have an account?{' '}
              <button
                className='text-blue-400 font-semibold cursor-pointer'
                onClick={() => setSwitchAuth(true)}>
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
