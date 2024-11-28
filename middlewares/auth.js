const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const Admin = require("../models/admin");

// check if admin is authenticated or not
exports.isAuthenticatedAdmin = async (req, res, next) => {   
  const {token}= req.cookies;
   if(!token){
    return next(
        new ErrorHandler("You are not authorized!", 401)
    )
  }
  const decoded= jwt.verify(
    token,
    process.env.JWT_SECRET
  )
  req.admin= await Admin.findById(decoded._id);
  next();
  
};
