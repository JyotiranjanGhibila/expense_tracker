import { axiosInstance } from "./interceptor";

class ExpenseService {
  getExpenses = async ( queryKey ) => {
    const { category, startDate, endDate, page, limit } = queryKey;
    try {
      const response = await axiosInstance.get(`/get/expenses`,{
        params: { category, startDate, endDate, page, limit },
      });
      console.log("get expense:", response.data);
      return response.data;
    } catch (err) {
      throw err.response?.data || "Error fetching expenses";
    }
  };

  addExpense = async (payload) => {
    try {
      const response = await axiosInstance.post(`/add/expense`, payload); 
      return response.data;
    } catch (err) {
      throw err.response?.data || "Error adding expense";
    }
  };

  updateExpense = async (payload) => {
    try {
      const response = await axiosInstance.put(`/update/expense`, payload);
      return response.data;
    } catch (err) {
      throw err.response?.data || "Error updating expense";
    }
  };

  deleteExpense = async (id) => {
    try {
      const response = await axiosInstance.delete(`/delete/expense/${id}`);
      return response.data;
    } catch (err) {
      throw err.response?.data || "Error deleting expense";
    }
  };
  
}

export default new ExpenseService();
