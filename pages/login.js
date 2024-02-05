import { Box, Heading, Input, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import { useState } from "react";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    setError("");
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: false,
      username: loginData.username,
      password: loginData.password,
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      mt="25vh"
    >
      <Box>
        <Heading mb="20px">Login</Heading>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          gap="10px"
        >
          <Input
            id="username"
            placeholder="Username"
            type="text"
            variant="filled"
            isInvalid={error}
            errorBorderColor="crimson"
            value={loginData.username}
            onChange={handleInputChange}
          />
          <Input
            id="password"
            placeholder="Password"
            type="password"
            variant="filled"
            isInvalid={error}
            errorBorderColor="crimson"
            value={loginData.password}
            onChange={handleInputChange}
          />
          {error && (
            <Text color="crimson" fontSize="13px">
              {error}
            </Text>
          )}
          <Button buttonType="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
