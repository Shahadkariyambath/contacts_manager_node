const express = require("express");
const {
  registerUser,
  loginrUser,
  CurrentUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginrUser);

router.get("/current", CurrentUser);

module.exports = router;
