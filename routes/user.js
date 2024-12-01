const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getUserById, deleteUser } = require("../controllers/userController");

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

module.exports = router;
