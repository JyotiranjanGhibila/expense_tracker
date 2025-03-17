import React from 'react';
import {
  Box,
  Select,
  Input,
  FormControl,
  FormLabel,
  useBreakpointValue,
} from '@chakra-ui/react';

const FilterExpense = ({ filters, handleFilterChange }) => {
  return (
    <Box
      display="flex"
      flexDirection={useBreakpointValue({ base: 'column', md: 'row' })}
      gap={4}
      my={4}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <FormControl>
        <FormLabel htmlFor="category" fontWeight="bold" color="teal.600">
          Category
        </FormLabel>
        <Select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="Select Category"
          variant="outline"
          borderColor="teal.300"
          _hover={{ borderColor: 'teal.500' }}
          _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="startDate" fontWeight="bold" color="teal.600">
          Start Date
        </FormLabel>
        <Input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          variant="outline"
          borderColor="teal.300"
          _hover={{ borderColor: 'teal.500' }}
          _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="endDate" fontWeight="bold" color="teal.600">
          End Date
        </FormLabel>
        <Input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          variant="outline"
          borderColor="teal.300"
          _hover={{ borderColor: 'teal.500' }}
          _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
        />
      </FormControl>
    </Box>
  );
};

export default FilterExpense;