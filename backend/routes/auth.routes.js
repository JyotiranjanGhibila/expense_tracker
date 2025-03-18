const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/users.model");
const verifyToken = require("../middleware/verifyToken.middleware");
const authRouter = express.Router();
require("dotenv").config()

authRouter.post("/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: `email is required.` });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: `password is required.` });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ success: false, message: "User already register" });
    } else {
      bcrypt.hash(password, 5, async (err, hashedPassword) => {
        const newUserInfo = { firstName:firstName || "Unknown", lastName: lastName || "Unknown", email, password: hashedPassword }
        const newUser = new User(newUserInfo);
        await newUser.save();
        res
          .status(201)
          .json({ success: true, message: "User registration successful." });
      });
    }
  } catch (err) {
    console.error("register err:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

authRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Provided email is not registered." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });

    // res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    return res.json({ success: true, message: "Login successful" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

authRouter.get("/profile/:id", verifyToken, async(req, res) => {
  try{
    const id = req.params.id;

    const profile = await User.find({_id:id})

    if(!profile) return res.status(404).json({success:false, message:"User not found."})

    return res.status(200).json({success:true, profile})  

  }catch(err){
    return res.status(500).json({success:false, message:"Internal server error."})
  }
})

authRouter.get("/auth/me", verifyToken, (req, res) => {
  res.json({ success: true, message: "Protected Profile Data", user: req.user });
});

authRouter.post("/auth/logout", async(req, res) => {
    res.clearCookie("token");
    res.json({success:true, message: "Logged out successfully" });
})

module.exports = { authRouter };
