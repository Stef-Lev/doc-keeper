import { Box } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useMemo } from "react";

const PageHeader = ({ buttons, backToPage }) => {
  const router = useRouter();
  const renderButtons = useMemo(() => {
    if (!buttons || buttons.length === 0) {
      return null;
    }
    return (
      <Box display="flex" gap={buttons.length > 1 ? 2 : 0}>
        {buttons.map((item, index) => (
          <Box key={`button__${index}`} mr={2}>
            {item}
          </Box>
        ))}
      </Box>
    );
  }, [buttons]);

  const goBack = () => {
    router.push(backToPage);
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
      <Box onClick={goBack} cursor="pointer">
        <FaChevronLeft size="28" />
      </Box>
      {renderButtons}
    </Box>
  );
};

export default PageHeader;
