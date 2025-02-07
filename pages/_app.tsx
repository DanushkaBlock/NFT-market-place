import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoadingScreen from "../components/preloader/LoadingScreen";
import { TransactionProvider } from "../context/TransactionContext"


function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url: string) => setLoading(false)


    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

  }, [router])

  return (
    <TransactionProvider>
      <div className='overflow-hidden bg-[#E5E5E5]'>
        <Head>
          <title>Cey NFT</title>
          <link rel='icon' href='/logo2.png' />
        </Head>

        <>


          <Header />
         



          <LoadingScreen loading={loading} />
          <Component {...pageProps} />
          <Footer />

        </>
      </div>
    </TransactionProvider>

  )
}

export default MyApp
