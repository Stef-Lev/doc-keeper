import { Box } from "@chakra-ui/react";
const Footer = () => {
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
        backgroundColor="red.200"
        border="2px solid white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        w={{ base: "92%", sm: "80%", md: "600px", lg: "738px" }}
      >
        <Box>HOME</Box>
        <Box>ADD</Box>
        <Box>USER</Box>
      </Box>
    </Box>
  );
};

export default Footer;
