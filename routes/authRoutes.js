const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// 👇 ADD THIS (test route)
router.get("/", (req, res) => {
  res.send("Auth route is working ✅");
});

// existing routes (KEEP THESE)
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router; 