import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../api/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsLoading(true);
      const response = await authServices.logging({ email, password });
      if (!response?.response?.data?.success) {
        setError(response.response?.data?.message);
      }
      if (response.message === "Login successful") {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("handle login err:", err);
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p="5"
      borderWidth="1px"
      borderRadius="lg"
      shadow="lg"
      fontFamily="'Poppins', sans-serif"
    >
      <Heading size="lg" mb="5">
        Login
      </Heading>
      {error && <Text color="red.500">{error}</Text>}
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button
            type="submit"
            disabled={isLoading}
            colorScheme="teal"
            width="full"
          >
            Login
          </Button>
        </VStack>
      </form>
      <Flex
        borderRadius="md"
        p={3}
        align="center"
        justify="center"
        bg="gray.50"
        m="5px 0"
      >
        <Text fontSize={"9px"} color="gray.700">
          Don't have an account? {" "}
          <Link to={"/register"}>
           <Text as={"span"} textDecoration="underline" colorScheme="teal.800" cursor="pointer">Create</Text>
          </Link> {" "}
          here.
        </Text>
      </Flex>
    </Box>
  );
};

export default Login;
