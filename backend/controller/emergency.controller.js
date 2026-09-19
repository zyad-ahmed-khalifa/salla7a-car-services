const emergencyService = require("../services/emergency.service.js");

const createRequestController = async (req, res) => {
  try {
    const request = await emergencyService.createRequest({
      ...req.body,
      userID: req.user.id,
    });
    return res.status(201).json({ message: "Emergency request created successfully", data: request });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to create emergency request", error: error.message });
  }
};

const getMyRequestsController = async (req, res) => {
  try {
    const requests = await emergencyService.getMyRequests(req.user.id);
    return res.status(200).json({ message: "done", data: requests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get emergency requests", error: error.message });
  }
};

const getRequestByIdController = async (req, res) => {
  try {
    const request = await emergencyService.getRequestById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    return res.status(200).json({ message: "done", data: request });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid request id", error: error.message });
  }
};

const getAllRequestsController = async (req, res) => {
  try {
    const requests = await emergencyService.getAllRequests();
    return res.status(200).json({ message: "done", data: requests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get emergency requests", error: error.message });
  }
};

const getTechnicianRequestsController = async (req, res) => {
  try {
    const requests = await emergencyService.getTechnicianRequests(req.user.id);
    return res.status(200).json({ message: "done", data: requests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get technician requests", error: error.message });
  }
};

const getAvailableRequestsController = async (req, res) => {
  try {
    const requests = await emergencyService.getAvailableRequests();
    return res.status(200).json({ message: "done", data: requests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get available requests", error: error.message });
  }
};

const acceptRequestController = async (req, res) => {
  try {
    const request = await emergencyService.acceptRequest(req.params.id, req.user.id);
    if (!request) return res.status(404).json({ message: "Request not found or already accepted" });
    return res.status(200).json({ message: "Emergency request accepted", data: request });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to accept request", error: error.message });
  }
};

const deleteRequestController = async (req, res) => {
  try {
    const request = await emergencyService.deleteRequest(req.params.id);
    if (!request.deletedCount) return res.status(404).json({ message: "Request not found" });
    return res.status(200).json({ message: "Emergency request deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to delete request", error: error.message });
  }
};

const editRequestController = async (req, res) => {
  try {
    const request = await emergencyService.editRequest(req.params.id, req.body, req.user);
    if (!request) return res.status(404).json({ message: "Request not found" });
    return res.status(200).json({ message: "Emergency request updated successfully", data: request });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to update request", error: error.message });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const request = await emergencyService.updateStatus(req.params.id, req.body.status, req.user.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    return res.status(200).json({ message: "Status updated successfully", data: request });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to update status", error: error.message });
  }
};

module.exports = {
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
};
