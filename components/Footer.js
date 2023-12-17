import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useFooterContent from "../hooks/useFooterContent";
import {
  IoHomeOutline,
  IoAddCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";

const Footer = () => {
  const router = useRouter();
  console.log(router);
  const footerContent = useFooterContent(router.route);
  return (
    <Box
      position="fixed"
      display="flex"
      justifyContent="center"
      bottom="5"
      w="100%"
      h="56px"
    >
      <Box
        borderRadius="16px"
        backgroundColor="#c24c5a"
        color="white"
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
