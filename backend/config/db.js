const mongoose = require("mongoose");
require("dotenv").config()

const URI = process.env.MONGO_URI || ""
const connection = mongoose.connect(URI)

module.exports = {connection}