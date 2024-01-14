import { Box } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const PageHeader = ({ buttons }) => {
  const router = useRouter();
  const renderButtons = () => {
    if (!buttons) {
      return;
    }
    return (
      <Box display="flex" gap={buttons.length > 1 ? 2 : 0}>
        {buttons.map((item) => (
          <Box>{item}</Box>
        ))}
      </Box>
    );
  };
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
      {renderButtons()}
    </Box>
  );
};

export default PageHeader;
