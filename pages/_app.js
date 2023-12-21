import Head from "next/head";
import "../public/globalStyles.css";
import theme from "../theme";
import Layout from "@/components/Layout";
import Footer from "../components/Footer";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// add long-press functionality for favorites (added library)
// add authentication

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
