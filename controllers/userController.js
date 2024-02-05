const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@routes POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //Check if user exists
  if (!username || !email || !password) {
    res.status(404);
    throw new Error("All fields the mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already Registered");
  }
  //Hash password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashPassword);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  console.log("User created: ", user);
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Registered user" });
});

//@desc Login a user
//@routes POST /api/users/login
//@access public
const loginrUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });
  // compare
  if (user || (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "10m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc Register a user
//@routes GET /api/users/current
//@access private
const CurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginrUser, CurrentUser };
