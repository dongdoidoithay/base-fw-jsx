import 'bootstrap/dist/css/bootstrap.css';

import "@/styles/pblstyle.css"
import "@/styles/responsive.css"
import "@/styles/settings.css"
import "@/styles/globals.css";

import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from "next/app";
import { useEffect } from 'react';
import Providers from '@/components/ui/providers';
import { ToastContainer } from 'react-toastify';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FetchApi } from '@/utils/handleApi';
import { currentByDomain } from '@/utils/currentSetting';
import Head from 'next/head';
import WrapContext from '@/components/share/WrapContext';


export default function App({ Component, pageProps}: AppProps) {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap");
    //import("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return (
    <>

      <Providers>
        <Component {...pageProps} />
        <ToastContainer />
      </Providers>
    </>
  );
}
