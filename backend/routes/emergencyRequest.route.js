const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/role");
const {
  createRequestController,
  getMyRequestsController,
  getRequestByIdController,
  getAllRequestsController,
  getAvailableRequestsController,
  getTechnicianRequestsController,
  acceptRequestController,
  deleteRequestController,
  editRequestController,
  updateStatusController,
} = require("../controller/emergency.controller.js");

const router = express.Router();

// Customer
router.post("/create", authMiddleware, roleMiddleware("customer"), createRequestController);
router.get("/get/my", authMiddleware, roleMiddleware("customer"), getMyRequestsController);

// Technician
router.get("/technician/my", authMiddleware, roleMiddleware("technician"), getTechnicianRequestsController);
router.get("/available", authMiddleware, roleMiddleware("technician"), getAvailableRequestsController);
router.put("/accept/:id", authMiddleware, roleMiddleware("technician"), acceptRequestController);
router.put("/status/:id", authMiddleware, roleMiddleware("technician"), updateStatusController);

// Admin
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllRequestsController);
router.delete("/delete/:id", authMiddleware, roleMiddleware("admin"), deleteRequestController);

// Authenticated request lookup/edit
router.get("/get/:id", authMiddleware, getRequestByIdController);
router.put("/edit/:id", authMiddleware, editRequestController);

module.exports = { emergencyRouter: router };
