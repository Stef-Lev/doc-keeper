import { Box } from "@chakra-ui/react";
import Loader from "./Loader";

const LoaderOverlay = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      bg="black"
      position="absolute"
      top={0}
      left={0}
      opacity={0.5}
      zIndex={998}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Loader />
    </Box>
  );
};

export default LoaderOverlay;
