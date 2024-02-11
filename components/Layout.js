import Head from "next/head";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";
import ScrollTopButton from "./ScrollTopButton";
import LoaderOverlay from "@/components/LoaderOverlay";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const { route } = router;
  const [loading, setLoading] = useState(false);
  const isAuthPage = ["/register", "/login"].includes(route);

  useEffect(() => {
    if (router && router.events) {
      router.events.on("routeChangeStart", () => setLoading(true));
      router.events.on("routeChangeComplete", () => setLoading(false));
      router.events.on("routeChangeError", () => setLoading(false));
    }
    return () => {
      if (router && router.events) {
        router.events.off("routeChangeStart", () => setLoading(true));
        router.events.off("routeChangeComplete", () => setLoading(false));
        router.events.off("routeChangeError", () => setLoading(false));
      }
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Doc Keeper</title>
        <meta name="description" content="Doc Keeper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="4xl" color="white">
        {children}
        <ScrollTopButton />
      </Container>
      {!isAuthPage && <Footer />}
      {loading && <LoaderOverlay />}
    </>
  );
};

export default Layout;
