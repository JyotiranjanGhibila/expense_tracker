import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';

const SessionEnd = () => {
  return (
    <Box mt={4} p={4} borderRadius="md" boxShadow="lg">
      <Alert status="error" borderRadius="md" variant="solid">
        <AlertIcon />
        <AlertTitle mr={2}>Session Expired!</AlertTitle>
        <AlertDescription>
          Your session has ended.{' '}
          <Text
            as="span"
            onClick={() => window.location.reload()}
            cursor="pointer"
            color="white.500"
            textDecoration="underline"
            fontWeight="bold"
          >
            Click here to retry.
          </Text>
        </AlertDescription>
      </Alert>
    </Box>
  );
};

export default SessionEnd;