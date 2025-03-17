import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Input, FormControl, FormLabel, VStack, Select } from "@chakra-ui/react";
import expenseService from "../api/expenseService";

const ExpenseForm = ({ expense }) => {
  const [formData, setFormData] = useState({category:"", description: "", amount: "", date: "" });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (expense) setFormData(expense);
  }, [expense]);

  const mutation = useMutation({
    mutationFn: (data) => (expense ? expenseService.updateExpense(data) : expenseService.addExpense(data)),  
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Error adding/updating expense:", error.message);
    },
  });
  

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Box p={4} boxShadow="sm" borderRadius="md" bg="gray.100">
      <form onSubmit={handleSubmit}>
        <VStack spacing={3}>
          <FormControl>
          <FormLabel>Category</FormLabel>
          {/* <Input name="category" value={formData.category} onChange={handleChange} required /> */}
          <Select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select a category</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
            </Select>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={formData.description} onChange={handleChange} required />
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </FormControl>
          <Button colorScheme="teal" type="submit" isLoading={mutation.isLoading}>
            {expense ? "Update Expense" : "Add Expense"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ExpenseForm;
