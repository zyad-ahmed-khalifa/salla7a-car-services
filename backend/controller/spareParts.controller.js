const { sparePartsModel } = require("../models/spareParts.models.js");

const getSpareParts = async (req, res) => {
  try {
    const data = await sparePartsModel.find().sort({ createdAt: -1 });
    res.json({ message: "spare parts fetched successfully", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error occurred while fetching spare parts" });
  }
};

const getSparePartById = async (req, res) => {
  try {
    const data = await sparePartsModel.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Spare part not found" });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid spare part id" });
  }
};

const addSpareParets = async (req, res) => {
  try {
    const data = await sparePartsModel.create(req.body);
    res.status(201).json({ message: "spare part added successfully", data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error occurred when adding data", err: err.message });
  }
};

const updateSpareParts = async (req, res) => {
  try {
    const data = await sparePartsModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ message: "Spare part not found" });
    res.json({ message: "spare part updated successfully", data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "failed to update spare part", err: err.message });
  }
};

const deleteSpareParts = async (req, res) => {
  try {
    const data = await sparePartsModel.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Spare part not found" });
    res.json({ message: "spare part deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "failed to delete spare part", err: err.message });
  }
};

module.exports = { getSpareParts, getSparePartById, addSpareParets, updateSpareParts, deleteSpareParts };
