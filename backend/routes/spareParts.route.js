const express = require("express");
const sparePartsRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/role");
const {
  getSpareParts,
  getSparePartById,
  addSpareParets,
  updateSpareParts,
  deleteSpareParts
} = require("../controller/spareParts.controller.js");

sparePartsRouter.get("/", getSpareParts);
sparePartsRouter.get("/:id", getSparePartById);
sparePartsRouter.post("/", authMiddleware, roleMiddleware("admin"), addSpareParets);
sparePartsRouter.put("/:id", authMiddleware, roleMiddleware("admin"), updateSpareParts);
sparePartsRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteSpareParts);

module.exports = { sparePartsRouter };
