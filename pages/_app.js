import Head from "next/head";
import "../public/globalStyles.css";
import theme from "../theme";
import Footer from "../components/Footer";
import { ChakraProvider, Container } from "@chakra-ui/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// add long-press functionality for favorites (added library)
// add authentication
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Doc Keeper</title>
        </Head>
        <ChakraProvider theme={theme}>
          <Container maxW="4xl" color="white">
            <Component {...pageProps} />
          </Container>
          <Footer />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
