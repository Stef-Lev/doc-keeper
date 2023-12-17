import Head from "next/head";
import "../public/globalStyles.css";
import theme from "../theme";
import Footer from "../components/Footer";
import { ChakraProvider, Container } from "@chakra-ui/react";

// add long-press functionality for favorites (added library)
// add authentication

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Doc Keeper</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Container maxW="4xl" color="white">
          <Component {...pageProps} />
        </Container>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
