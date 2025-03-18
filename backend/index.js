const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { connection } = require("./config/db");
const { authRouter } = require("./routes/auth.routes");
const { expenseRouter } = require("./routes/expense.routes");
require("dotenv").config()

const PORT = process.env.PORT
const corsOptions = {
    origin: [
        "https://expense-tracker-smy8.vercel.app",
        "http://localhost:3002",
        "https://expense-tracker-5hjb.vercel.app"
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
  
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.json())


app.use("/api", authRouter)
app.use("/api", expenseRouter)

app.get("/api", async(req,res) =>{
    res.send("Hey 😁")
})

app.listen(PORT , async() => {
    console.log(`Server running on PORT ${PORT}.`);
    try{
       connection;
       console.log("DB connected successfully.");
    }catch(err){
        console.log("Connection Error:", err.message);
    }
})


