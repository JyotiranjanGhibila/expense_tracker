const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
