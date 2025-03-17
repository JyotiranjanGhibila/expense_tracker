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
    origin: process.env.CLIENT_URL || true, 
    methods: ['GET', 'POST', 'PATCH', 'PUT' ,'DELETE'],
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(cookieParser())

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


