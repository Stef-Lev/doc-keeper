import Head from "next/head";
import "../public/globalStyles.css";
import theme from "../theme";
import { ChakraProvider, Container } from "@chakra-ui/react";

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
      </ChakraProvider>
    </>
  );
}

export default MyApp;
