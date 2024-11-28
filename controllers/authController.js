const Admin = require("../models/admin");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.registerAdmin = async (req, res, next) => {
  const verificationCode = generateVerificationCode();

  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(new ErrorHandler("Admin already exists", 400));
    }

    // Create new admin
    const admin = await Admin.create({
      name,
      email,
      password,
      verificationCode,
    });

    await sendToken(admin, 200, res);

  } catch (error) {
    next(error);
  }
};

//login admin
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return next(new ErrorHandler("Admin not found", 400));
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    await sendToken(admin, 200, res);
  } catch (error) {
    next(error);
  }
};



exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
