// components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoadingBar from "react-top-loading-bar";

//css imports
import "@/styles/globals.css";
import "@/styles/slug.css";
// react
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
// redux
import { store } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { setWindowWidth } from "@/slices/globalSlice";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    const handleResize = () => {
      store.dispatch(setWindowWidth(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setProgress(40);
    };

    const handleRouteChangeComplete = () => {
      setProgress(100);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router, setProgress]);
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <LoadingBar
            color="#2563EB"
            progress={progress}
            waitingTime={400}
            onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </SessionProvider>
    </>
  );
}
