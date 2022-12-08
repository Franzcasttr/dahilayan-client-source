import '../styles/globals.css';
import '../styles/styles.css';
import 'swiper/css/bundle';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
