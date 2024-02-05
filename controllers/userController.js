const asyncHandler = require("express-async-handler");

//@desc Register a user
//@routes POST /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Registered user" });
});

//@desc Login a user
//@routes POST /users/login
//@access public
const loginrUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

//@desc Register a user
//@routes GET /users/current
//@access private
const CurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginrUser, CurrentUser };
