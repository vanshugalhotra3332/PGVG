// components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopLoadingBar from "@/components/TopLoadingBar";

//css imports
import "@/styles/globals.css";
import "@/styles/slug.css";
// react
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
// redux
import { store } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { setProgress, setWindowWidth } from "@/slices/globalSlice";

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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      store.dispatch(setProgress(40));
    };

    const handleRouteChangeComplete = () => {
      store.dispatch(setProgress(100));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <TopLoadingBar />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </SessionProvider>
    </>
  );
}
