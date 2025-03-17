import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Heading,
  Spinner,
  Center,
  Text,
  Flex,
} from "@chakra-ui/react";
import ExpenseForm from "../components/ExpenseForm";
import expenseService from "../api/expenseService";
import Chart from "./Chart";
import SessionEnd from "./SessionEnd";
import ExpenseTable from "./ExpenseTable";
import FilterExpense from "./FilterExpense";
import Nav from "./Navbar";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#DC143C",
];

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 4,
  });

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["expenses", filters],
    queryFn: () => expenseService.getExpenses(filters),
    keepPreviousData: true,
  });

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const delRes = await expenseService.deleteExpense(id);
      queryClient.invalidateQueries(["expenses"]);
      console.log("del res:", delRes);
      setSelectedExpense(null);
    }
  };

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= data?.totalPages) {
      setFilters({ ...filters, page: newPage });
    }
  };

  const categoryData = useMemo(() => {
    if (!data?.result) return [];
    const grouped = data?.result.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    return Object.keys(grouped).map((key, index) => ({
      name: key,
      value: grouped[key],
      color: COLORS[index % COLORS.length],
    }));
  }, [data]);

  const monthlyData = useMemo(() => {
    if (!data?.result) return [];
    const grouped = data?.result.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "short",
      });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {});
    return Object.keys(grouped).map((key) => ({
      month: key,
      amount: grouped[key],
    }));
  }, [data]);

  if (isLoading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  if (isError) return <SessionEnd />;

  return (
    <>
    <Nav/>
    <Box mt={1} p={6} boxShadow="md" borderRadius="lg" bg="white">
      <Heading size="lg" textAlign="center">
        Expense Stats
      </Heading>
      <Button
        colorScheme="teal"
        onClick={() => {
          setSelectedExpense(null);
          setShowForm(!showForm);
        }}
        my={3}
      >
        {showForm ? "Hide Form" : "Add Expense"}
      </Button>

      {showForm && <ExpenseForm expense={selectedExpense} />}

      {!data?.isDataExist > 0 ? (
        <Box textAlign="center" mt={6}>
          <Text fontSize="lg" color="gray.600">
            No expenses recorded yet. Start by adding your first expense!
          </Text>
          <Button
            colorScheme="teal"
            mt={4}
            onClick={() => {
              setSelectedExpense(null);
              setShowForm(true);
            }}
          >
            Add Your First Expense
          </Button>
        </Box>
      ) : (
        <Box>
          <FilterExpense
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
          {!data?.result.length > 0 ? (
            <Box textAlign="center" mt={6} height={"100px"}>
              <Text fontSize="lg" color="gray.600">
                No expenses found for the selected filters.
              </Text>
            </Box>
          ) : (
            <Box>
              <ExpenseTable
                data={data}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />

              <Flex justifyContent="space-between" mt={4}>
                <Button
                  onClick={() => handlePageChange(filters.page - 1)}
                  isDisabled={filters.page === 1}
                >
                  Previous
                </Button>
                <Text fontSize={"10px"}>
                  Page {filters.page} of {data?.totalPages}
                </Text>
                <Button
                  onClick={() => handlePageChange(filters.page + 1)}
                  isDisabled={filters.page >= data?.totalPages}
                >
                  Next
                </Button>
              </Flex>

              <Chart categoryData={categoryData} monthlyData={monthlyData} />
            </Box>
          )}
        </Box>
      )}
    </Box>
    </>

  );
};

export default Dashboard;
