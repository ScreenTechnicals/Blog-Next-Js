import Navbar from '../components/Navbar'
import '../styles/globals.css'
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [progress, setProgress] = useState(0)


  useEffect(()=>{
    router.events.on("routeChangeStart", ()=>{setProgress(50)});
    router.events.on("routeChangeComplete", ()=>{setProgress(100)});
  })

  return(
    <div>
      <LoadingBar
        color='#fff'
        waitingTime={300}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
