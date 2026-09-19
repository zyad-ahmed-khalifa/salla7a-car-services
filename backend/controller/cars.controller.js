const Car = require("../models/cars.models");

const getCarsById = async (req, res) => {
  try {
    const myCars = await Car.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", results: myCars.length, data: myCars });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Error finding cars", error: err.message });
  }
};

const postCars = async (req, res) => {
  try {
    const newCar = await Car.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ status: "success", data: newCar });
  } catch (err) {
    res.status(400).json({ status: "fail", message: "Failed to add car", error: err.message });
  }
};

const updateCars = async (req, res) => {
  try {
    const updatedCar = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedCar) return res.status(404).json({ status: "fail", message: "Car not found" });
    res.status(200).json({ status: "success", data: updatedCar });
  } catch (err) {
    res.status(400).json({ status: "fail", message: "Failed to update car", error: err.message });
  }
};

const deleteCars = async (req, res) => {
  try {
    const deletedCar = await Car.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedCar) return res.status(404).json({ status: "fail", message: "Car not found" });
    res.status(200).json({ status: "success", message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Failed to delete car", error: err.message });
  }
};

module.exports = { getCarsById, postCars, updateCars, deleteCars };
