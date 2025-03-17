import React, { useState } from "react";
import authServices from "../api/authServices";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useToaster from "../hooks/useToaster";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToaster()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);
    try {
      const response = await authServices.registering(formData);
      console.log("registe res::", response);
      // if (!response.ok) {
      //   throw new Error("Registration failed");
      // }
      if(response?.response?.data?.message == "User already register") {
        showToast({
          title: "Already registered.",
          description: "Your account has been already register.",
          status: "info",
        });
      }
      if(response?.message === 'User registration successful.') {
        showToast({
          title: "Registration Successful",
          description: "Your account has been created successfully.",
          status: "success",
        });
        navigate("/login")
        setFormData({})
      }
    } catch (error) {
      console.log("reg rer:", error);
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
      <Text fontWeight={"bold"} fontSize={"17px"}>
        Register
      </Text>
      {error && <Text color={"red.300"}>{error}</Text>}
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={isLoading}
          >
            Register
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
          Already have an account?{" "}
          <Link to={"/login"}>
            <Text
              as={"span"}
              textDecoration="underline"
              colorScheme="teal.800"
              cursor="pointer"
            >
              Login.
            </Text>
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};

export default Register;
