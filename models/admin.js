const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  name: {
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
  password: {
    required:[true, "Password is required"],
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
    select:false
  },

  
});
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
  next();
});


//compare admin password
adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  //Return JWT token
  adminSchema.methods.getJwtToken = async function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
  };
  
module.exports = mongoose.model("Admin", adminSchema);