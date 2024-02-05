import { Box, Heading, Input, Text } from "@chakra-ui/react";
import Button from "@/components/Button";
import { useState } from "react";
import { useRegisterUser } from "@/helpers/apiMutations";

const RegisterPage = () => {
  const { registerUser } = useRegisterUser();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    setError("");
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    await registerUser(loginData);
  };

  console.log(loginData);
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
        <Heading mb="20px">Register</Heading>
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
          <Input
            id="confirmPassword"
            placeholder="Confirm password"
            type="password"
            variant="filled"
            isInvalid={error}
            errorBorderColor="crimson"
            value={loginData.confirmPassword}
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

export default RegisterPage;
