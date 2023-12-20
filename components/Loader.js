import { Box, Spinner, Center, Text } from "@chakra-ui/react";

const Loader = ({
  fullScreen = false,
  size = "xl",
  thickness = "8px",
  text = "",
}) => {
  return (
    <Box>
      <Center height={`${fullScreen ? "50vh" : "40px"}`}>
        {text && <Text mr="10px">{text}</Text>}
        <Spinner
          thickness={thickness}
          speed="1s"
          emptyColor="transparent"
          color="teal.200"
          size={size}
        />
      </Center>
    </Box>
  );
};

export default Loader;
