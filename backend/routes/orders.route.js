const express = require("express");
const ordersRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/role");
const { getOrders, addOrders, updateOrders, deleteOrders } = require("../controller/orders.controller");

ordersRouter.get("/", authMiddleware, getOrders);
ordersRouter.post("/", authMiddleware, roleMiddleware("customer"), addOrders);
ordersRouter.put("/:id", authMiddleware, roleMiddleware("admin"), updateOrders);
ordersRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteOrders);

module.exports = { ordersRouter };
