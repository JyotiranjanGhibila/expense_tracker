const express = require("express");
const { authenticate } = require("../middleware/authenticate.middleware");
const { Expense } = require("../models/expense.model");
const mongoose = require("mongoose");

const expenseRouter = express.Router();

expenseRouter.post("/add/expense",authenticate, async(req, res) => {
    try {
        const { amount, category, date, description } = req.body;

        if(!amount) return res.status(400).json({success:false, message:"amount is required"})
        if(!category) return res.status(400).json({success:false, message:"category is required"})
        if(!date) return res.status(400).json({success:false, message:"date is required"})

        const expenseInfo = { userId: req.user.userId, amount, category, date, description }
        const newExpense = new Expense(expenseInfo);
        await newExpense.save();
        res.status(201).json({success:true, message:"New expense added successfully.", data:newExpense});
      } catch (error) {
        console.log("add expense err:", error);
        res.status(500).json({success:false, message: "Error adding expense" });
      }
})

expenseRouter.put("/update/expense", authenticate, async (req, res) => {
  try {
    const { _id, amount, category, date, description } = req.body;

    if (!_id) return res.status(400).json({ success: false, message: "_id is required to update expense" });
    if (!amount) return res.status(400).json({ success: false, message: "Amount is required" });
    if (!category) return res.status(400).json({ success: false, message: "Category is required" });
    if (!date) return res.status(400).json({ success: false, message: "Date is required" });

    const updatedExpense = await Expense.findByIdAndUpdate(
      _id,
      { amount, category, date, description },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ success: true, message: "Expense updated successfully", data: updatedExpense });
  } catch (error) {
    console.error("Update expense error:", error);
    res.status(500).json({ success: false, message: "Error updating expense" });
  }
});

// expenseRouter.get("/get/expenses", authenticate, async(req, res) => {
//     try {
//         const { category, startDate, endDate, page = 1, limit = 10 } = req.query;
//         let query = { userId: req.user.userId };

//         if (category) query.category = category;
//         if (startDate && endDate) query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        
//         const expenses = await Expense.find(query)
//           .skip((page - 1) * limit)
//           .limit(Number(limit));
//         res.status(200).json({success:true, result:expenses});
//       } catch (error) {
//         res.status(500).json({ error: "Error fetching expenses" });
//       }
// })

expenseRouter.get("/get/expenses", authenticate, async (req, res) => {
  try {
      let { category, startDate, endDate, page = 1, limit = 10 } = req.query;
      
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);
      
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;
      if (limit > 100) limit = 100;
      
      let query = { userId: req.user.userId };

      if (category) query.category = category;
      if (startDate && endDate) {
          query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }

      const isDataExist = await Expense.find({userId:req.user.userId})
      const totalRecords = await Expense.countDocuments(query);
      const totalPages = Math.ceil(totalRecords / limit);

      const expenses = await Expense.find(query)
          .skip((page - 1) * limit)
          .limit(limit);

      res.status(200).json({
          success: true,
          currentPage: page,
          totalPages,
          totalRecords,
          limit,
          result: expenses,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          isDataExist: isDataExist?.length || 0
      });
  } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ success: false, error: "Error fetching expenses" });
  }
});


expenseRouter.delete("/delete/expense/:id", authenticate, async(req, res) => {
    try {
        let Id = req.params.id
        if(!Id) return res.status(400).json({success: false, message:"Id is required for delete."})

        await Expense.findByIdAndDelete(Id);
        res.status(201).json({success:true, message: "Expense deleted" });
      } catch (error) {
        res.status(500).json({success:false, message: "Error deleting expense" });
      }
})

expenseRouter.get("/get/insight", authenticate, async(req, res) => {
    try {
        const uId = new mongoose.Types.ObjectId(req.user.userId);
        const expenses = await Expense.aggregate([
          { $match: { userId: uId } },
          { $group: { _id: "$category", total: { $sum: "$amount" } } },
        ]);
        res.status(200).json({success:true, result:expenses});
      } catch (error) {
        console.error("insight err:", error)
        res.status(500).json({ success:false, message: "Error calculating insights" });
      }
})

module.exports = {expenseRouter}