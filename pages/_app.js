import "../public/globalStyles.css";
import theme from "../theme";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// add long-press functionality for favorites (added library)
// add authentication
// add warning on delete
// fix one to many relationship to mongo database

const queryClient = new QueryClient();

function MyApp({ Component, session, ...pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            <SessionProvider session={session}>
              <Component {...pageProps} />
              <ToastContainer limit={3} />
            </SessionProvider>
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
