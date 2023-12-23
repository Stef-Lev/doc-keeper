import { useState, useEffect } from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
import { FiArrowUp } from "react-icons/fi";

const ScrollTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const ScrollStart = 200;
  const ScrollEnd = 300;

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScrollBtnVisibility = () => {
      window.scrollY > ScrollStart ? setShowButton(true) : setShowButton(false);
    };
    const calculateOpacity = () => {
      if (window.scrollY > ScrollStart && window.scrollY < ScrollEnd) {
        setOpacity((window.scrollY - ScrollStart) / (ScrollEnd - ScrollStart));
      } else {
        setOpacity(1);
      }
    };
    window.addEventListener("scroll", handleScrollBtnVisibility);
    window.addEventListener("scroll", calculateOpacity);

    return () => {
      window.removeEventListener("scroll", handleScrollBtnVisibility);
    };
  }, []);

  return (
    <>
      {showButton && (
        <Flex
          position="sticky"
          bottom="90px"
          zIndex={11}
          justifyContent="flex-end"
        >
          <Box>
            <Button
              w="60px"
              h="60px"
              borderRadius="16px"
              background="basic.secondaryDark"
              color="basic.white"
              _active={{ background: "basic.secondaryDark" }}
              _hover={{ background: "basic.secondaryDark" }}
              opacity={opacity}
              onClick={handleScrollTop}
            >
              <FiArrowUp size="60px" />
            </Button>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ScrollTopButton;
