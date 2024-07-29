const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  email: String,
  password: String,
  tokenUser: String,
  avatar: String,
  status:{
    type: String,
    default: "active"
  },
  deleted:{
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema, "user");

module.exports = User;