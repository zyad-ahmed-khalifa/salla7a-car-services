const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const validateCredentials = (email, password) => {
  if (!emailRegex.test(String(email || ""))) return "Please enter a valid email address.";
  if (!passwordRegex.test(String(password || ""))) {
    return "Password must be at least 8 characters and contain uppercase, lowercase, and a number.";
  }
  return null;
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting users");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting user");
  }
};

// Public signup is for customers only. Role can never be supplied by the client.
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const validationError = validateCredentials(email, password);
    if (validationError) return res.status(400).send(validationError);
    if (!name) return res.status(400).send("Name is required");

    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) return res.status(409).send("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: String(email).toLowerCase(),
      phone,
      address,
      role: "customer",
      status: "Active",
      password: hashedPassword
    });

    res.status(201).json({ message: "Customer created successfully", id: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving user");
  }
};

// Only an authenticated admin can create technicians.
const createTechnician = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const validationError = validateCredentials(email, password);
    if (validationError) return res.status(400).send(validationError);
    if (!name) return res.status(400).send("Name is required");

    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) return res.status(409).send("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const technician = await User.create({
      name,
      email: String(email).toLowerCase(),
      phone,
      address,
      role: "technician",
      status: "Active",
      password: hashedPassword
    });

    res.status(201).json({ message: "Technician created successfully", id: technician._id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating technician");
  }
};


// Only an authenticated admin can create other admin accounts.
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const validationError = validateCredentials(email, password);
    if (validationError) return res.status(400).send(validationError);
    if (!name) return res.status(400).send("Name is required");

    const normalizedEmail = String(email).toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).send("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({
      name, email: normalizedEmail, phone, address, role: "admin", status: "Active", password: hashedPassword
    });
    res.status(201).json({ message: "Admin created successfully", id: admin._id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating admin");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!emailRegex.test(String(email || ""))) return res.status(400).send("Please enter a valid email address.");
    if (!password) return res.status(400).send("Password is required");

    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) return res.status(404).send("User not found");
    if (user.status === "Inactive") return res.status(403).send("This account is inactive");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Wrong password");

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in");
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting profile");
  }
};

const updateProfile = async (req, res) => {
  try {
    const { role, password, email, ...profileData } = req.body;
    if (email && !emailRegex.test(email)) return res.status(400).send("Please enter a valid email address.");
    if (password && !passwordRegex.test(password)) return res.status(400).send("Password must be at least 8 characters and contain uppercase, lowercase, and a number.");
    if (password) profileData.password = await bcrypt.hash(password, 10);
    if (email) profileData.email = String(email).toLowerCase();

    const user = await User.findByIdAndUpdate(req.user.id, profileData, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating profile");
  }
};

const updateUser = async (req, res) => {
  try {
    const { password, email, ...data } = req.body;
    if (email) {
      if (!emailRegex.test(email)) return res.status(400).send("Please enter a valid email address.");
      data.email = String(email).toLowerCase();
    }
    if (password) {
      if (!passwordRegex.test(password)) return res.status(400).send("Password must be at least 8 characters and contain uppercase, lowercase, and a number.");
      data.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting user");
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  createTechnician,
  createAdmin,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
  updateProfile
};
