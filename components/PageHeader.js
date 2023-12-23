import { Box } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const PageHeader = () => {
  const router = useRouter();
  return (
    <Box
      display="flex"
      h="40px"
      p="8px"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid rgba(255, 255, 255, 0.16)"
      mt="16px"
      borderRadius="8px"
    >
      <Box onClick={router.back} cursor="pointer">
        <FaChevronLeft size="28" />
      </Box>
    </Box>
  );
};

export default PageHeader;
