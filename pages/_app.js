import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { store } from "../store/store";
import { Provider } from "react-redux";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </SessionProvider>
    </>
  );
}
