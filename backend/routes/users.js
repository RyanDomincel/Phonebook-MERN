const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  forgotPassword,
  resetPassword,
  approveUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// sign up route
router.post("/signup", signupUser);

// forgot password route
router.post("/forgot-password", forgotPassword);

// RESET a password
router.post("/reset-password/:token", resetPassword);

// approve user route
router.patch("/approve/:id", approveUser);

// GET all users
router.get("/", getAllUsers);

// GET a single user
router.get("/:id", getSingleUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

module.exports = router;
