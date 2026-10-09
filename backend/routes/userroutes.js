const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/role");
const router = express.Router();
const {
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
} = require("../controller/userController");

router.post("/users", createUser); // customer signup only
router.post("/login", loginUser);
router.post("/users/technicians", authMiddleware, roleMiddleware("admin"), createTechnician);
router.post("/users/admins", authMiddleware, roleMiddleware("admin"), createAdmin);
router.get("/users", authMiddleware, roleMiddleware("admin"), getUsers);
router.get("/users/:id", authMiddleware, roleMiddleware("admin"), getUserById);
router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), deleteUser);
router.put("/users/:id", authMiddleware, roleMiddleware("admin"), updateUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
