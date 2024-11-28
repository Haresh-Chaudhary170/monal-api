const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, verifyEmail } = require("../controllers/authController");
const { isAuthenticatedAdmin } = require("../middlewares/auth");

router.route("/register").post(registerAdmin);
router.route("/loginAdmin").post(loginAdmin);

router.get("/admin/protected", isAuthenticatedAdmin, (req, res) => {
    res.status(200).json({ success: true, message: "Authorized" });
  });

  router.post("/logoutAdmin", (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0), // Expire immediately
        httpOnly: true,      // Prevent JavaScript access    
        sameSite: "lax",     
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

module.exports = router;
