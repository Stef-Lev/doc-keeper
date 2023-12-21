import Head from "next/head";
import Footer from "./Footer";
import { Container } from "@chakra-ui/react";
import ScrollTopButton from "./ScrollTopButton";

const Layout = ({ children }) => {
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
      <Footer />
    </>
  );
};

export default Layout;
