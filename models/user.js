const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please enter your name."],
    trim: true,
    maxlength: [30, "Name should not exceed 30 characters"],
  },
  lname: {
    type: String,
    required: [true, "Please enter your name."],
    trim: true,
    maxlength: [30, "Name should not exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email",
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value);
      },
      message: "Please enter a valid phone number",
    },
  },
  message:{
    type: String,
    required: true,
    trim: true,
    maxlength: [200, "Message should not exceed 200 characters"]
  }
  
},
{
  timestamps: true,
});
  
module.exports = mongoose.model("User", userSchema);