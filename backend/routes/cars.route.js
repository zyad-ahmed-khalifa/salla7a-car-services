const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/role");
const carsRouter = express.Router();
const { getCarsById, postCars, updateCars, deleteCars } = require("../controller/cars.controller");

carsRouter.get("/:id", authMiddleware, roleMiddleware("customer"), getCarsById);
carsRouter.post("/", authMiddleware, roleMiddleware("customer"), postCars);
carsRouter.put("/:id", authMiddleware, roleMiddleware("customer"), updateCars);
carsRouter.delete("/:id", authMiddleware, roleMiddleware("customer"), deleteCars);

module.exports = { carsRouter };
