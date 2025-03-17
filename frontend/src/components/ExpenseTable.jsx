import React from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

const ExpenseTable = (props) => {
  const { handleEdit, data, handleDelete } = props;

  return (
    <Box overflowX="auto" mt={4}>
      <Table
        variant="striped"
        colorScheme="teal"
        size={useBreakpointValue({ base: "sm", md: "md" })}
      >
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Description</Th>
            <Th isNumeric>Amount</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.result?.map((expense) => (
            <Tr key={expense._id} _hover={{ bg: "gray.100" }}>
              <Td>{expense.category}</Td>
              <Td>{expense.description}</Td>
              <Td isNumeric>₹{expense.amount}</Td>
              <Td>{new Date(expense.date).toLocaleDateString()}</Td>
              <Td>
                <Button width={{base:"full",md:"auto"}}
                  colorScheme="blue"
                  size="sm"
                  mr={2}
                  onClick={() => handleEdit(expense)}
                >
                  Edit
                </Button>
                <Button mt={{base:"3px",sm:"3px",md:"0px"}} width={{base:"full",md:"auto"}}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(expense._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpenseTable;
