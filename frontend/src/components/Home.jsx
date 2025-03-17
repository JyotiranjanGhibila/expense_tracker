import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaChartPie, FaFingerprint, FaMoneyBillWave } from "react-icons/fa";
import {useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.lg" centerContent>
      <Box textAlign="center" py={10} fontFamily="'Poppins', sans-serif">
        <Heading as="h1" size="2xl" mb={4} color="teal.600">
          Expense Tracker
        </Heading>
        <Text fontSize="lg" mb={6} color="gray.600">
          Manage your expenses effortlessly and gain intelligent insights into
          your spending patterns.
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          mb={4}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Box>

      <Stack spacing={8} direction={{ base: "column", md: "row" }} mb={10}>
        <Feature
          icon={<Icon as={FaFingerprint} boxSize={10} color="teal.500" />}
          title="Secure Authentication"
          description="Register and log in securely with JWT-based authentication."
        />
        <Feature
          icon={<Icon as={FaMoneyBillWave} boxSize={10} color="teal.500" />}
          title="Expense Management"
          description="Easily add, update, delete, and view your expenses."
        />
        <Feature
          icon={<Icon as={FaChartPie} boxSize={10} color="teal.500" />}
          title="Spending Insights"
          description="Visualize your spending patterns with insightful charts."
        />
      </Stack>

      <Box textAlign="center" mb={10}>
        <Text fontSize="lg" color="gray.600">
          Track your expenses and make informed financial decisions.
        </Text>
      </Box>
    </Container>
  );
};

const Feature = ({ icon, title, description }) => {
  return (
    <Flex
      direction="column"
      align="center"
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      transition="0.3s"
      _hover={{ boxShadow: "lg" }}
      fontFamily="'Poppins', sans-serif"
    >
      {icon}
      <Heading as="h3" size="lg" mt={4} color="teal.600">
        {title}
      </Heading>
      <Text mt={2} textAlign="center" color="gray.600">
        {description}
      </Text>
    </Flex>
  );
};

export default HomePage;
