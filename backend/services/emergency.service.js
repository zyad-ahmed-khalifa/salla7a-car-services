const emergencyModel = require("../models/emergencyRequest.model.js");

const createRequest = async (inputs) => emergencyModel.create(inputs);

const populateEmergency = (query) => query.populate("userID", "name email phone").populate("vehicleID").populate("technicianInfo.technicianID", "name email phone");

const getRequestById = async (id) => populateEmergency(emergencyModel.findById(id));

const getMyRequests = async (userId) => populateEmergency(emergencyModel.find({ userID: userId }).sort({ requestedAt: -1 }));

const getAllRequests = async () => populateEmergency(emergencyModel.find().sort({ requestedAt: -1 }));

const getTechnicianRequests = async (technicianId) => populateEmergency(emergencyModel.find({ "technicianInfo.technicianID": technicianId }).sort({ updatedAt: -1 }));

const getAvailableRequests = async () => populateEmergency(emergencyModel.find({ status: "pending", "technicianInfo.technicianID": null }).sort({ requestedAt: 1 }));

const acceptRequest = async (id, technicianId) => populateEmergency(emergencyModel.findOneAndUpdate(
  { _id: id, status: "pending", "technicianInfo.technicianID": null },
  {
    $set: {
      "technicianInfo.technicianID": technicianId,
      "technicianInfo.status": "busy",
      "technicianInfo.assignedAt": new Date(),
      status: "accepted",
      acceptedAt: new Date(),
    },
  },
  { new: true, runValidators: true }
));

const deleteRequest = async (id) => emergencyModel.deleteOne({ _id: id });

const editRequest = async (id, inputs, user) => {
  const filter = { _id: id };
  let updateData;

  if (user.role === "customer") {
    filter.userID = user.id;
    const allowedFields = ["vehicleID", "vehicleType", "problemType", "description", "priority", "location"];
    updateData = Object.fromEntries(
      allowedFields.filter((field) => Object.prototype.hasOwnProperty.call(inputs, field)).map((field) => [field, inputs[field]])
    );
  } else if (user.role === "admin") {
    updateData = inputs;
  } else if (user.role === "technician") {
    filter["technicianInfo.technicianID"] = user.id;
    const allowedFields = ["description", "location"];
    updateData = Object.fromEntries(
      allowedFields.filter((field) => Object.prototype.hasOwnProperty.call(inputs, field)).map((field) => [field, inputs[field]])
    );
  } else {
    return null;
  }

  if (Object.keys(updateData).length === 0) return null;

  return emergencyModel.findOneAndUpdate(
    filter,
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

const updateStatus = async (id, status, technicianId) => {
  const allowedStatuses = ["accepted", "on_the_way", "arrived", "in_service", "completed"];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid emergency status");
  }

  const update = { status };
  if (status === "completed") {
    update.completedAt = new Date();
    update["technicianInfo.status"] = "available";
  }

  return populateEmergency(emergencyModel.findOneAndUpdate(
    { _id: id, "technicianInfo.technicianID": technicianId },
    { $set: update },
    { new: true, runValidators: true }
  ));
};

module.exports = {
  createRequest,
  getRequestById,
  getMyRequests,
  getAllRequests,
  getAvailableRequests,
  getTechnicianRequests,
  acceptRequest,
  deleteRequest,
  editRequest,
  updateStatus,
};
