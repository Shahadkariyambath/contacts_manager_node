const asyncHandler = require("express-async-handler");

//@desc Get all conatcts
//@routes GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});

//@desc create new conatcts
//@routes POST /api/contacts
//@access public

const createContacts = asyncHandler(async (req, res) => {
  console.log("This is a request body :", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  res.status(201).json({ message: "Create contact" });
});

//@desc Get  conatcts
//@routes Get /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contacts for ${req.params.id}` });
});

//@desc update new conatcts
//@routes PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update contacts for ${req.params.id}` });
});

//@desc delete new conatcts
//@routes DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
