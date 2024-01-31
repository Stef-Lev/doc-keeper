import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ buttonType, ...props }) => {
  const buttonTypes = {
    primary: "basic.secondaryDark",
    transparent: "whiteAlpha.200",
    disabled: "gray.400",
    success: "green.300",
    error: "red.400",
  };
  return (
    <ChakraButton
      as="button"
      variant="solid"
      color="white"
      bg={buttonTypes[buttonType]}
      _hover={{ bg: buttonTypes[buttonType] }}
      _active={{ bg: buttonTypes[buttonType] }}
      _focus={{ bg: buttonTypes[buttonType] }}
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
};

export default Button;
