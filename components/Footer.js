import { Box } from "@chakra-ui/react";
import useFooterContent from "../hooks/useFooterContent";

const Footer = () => {
  const footerContent = useFooterContent();
  return (
    <Box
      position="fixed"
      display="flex"
      justifyContent="center"
      bottom="5"
      w="100%"
      h="56px"
      zIndex={10}
    >
      <Box
        borderRadius="16px"
        backgroundColor="basic.primary"
        color="basic.white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={{ base: "16px", sm: "20px", md: "32px" }}
        w={{ base: "92%", sm: "380px", md: "460px" }}
      >
        {footerContent}
      </Box>
    </Box>
  );
};

export default Footer;
