const { ordersModel } = require("../models/orders.models.js");
const { sparePartsModel } = require("../models/spareParts.models.js");

const getOrders = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { userId: req.user.id };
    const data = await ordersModel.find(filter).populate("userId", "name email phone address").populate("items.partId").sort({ createdAt: -1 });
    res.json({ message: "orders fetched successfully", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error while fetching orders" });
  }
};

const addOrders = async (req, res) => {
  try {
    const { items, phoneNumber, address, paymentMethod = "Cash", shippingCost = 0 } = req.body;
    if (!Array.isArray(items) || items.length === 0) return res.status(400).send("Order must contain at least one item");
    if (!phoneNumber || !address?.city || !address?.area || address?.buildingNumber === undefined || address?.floor === undefined || address?.apartmentNumber === undefined) {
      return res.status(400).send("Complete phone and shipping address are required");
    }

    const ids = items.map((item) => item.partId);
    const parts = await sparePartsModel.find({ _id: { $in: ids } });
    const partMap = new Map(parts.map((p) => [String(p._id), p]));

    let subtotal = 0;
    const normalizedItems = [];
    for (const item of items) {
      const part = partMap.get(String(item.partId));
      const quantity = Number(item.quantity);
      if (!part) return res.status(404).send(`Spare part ${item.partId} not found`);
      if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).send("Invalid quantity");
      if (part.stock < quantity) return res.status(400).send(`${part.name} does not have enough stock`);
      normalizedItems.push({ partId: part._id, quantity, price: part.price });
      subtotal += part.price * quantity;
    }

    const shipping = Number(shippingCost) >= 0 ? Number(shippingCost) : 0;
    const now = new Date();
    const order = await ordersModel.create({
      userId: req.user.id,
      items: normalizedItems,
      total: subtotal,
      shippingCost: shipping,
      totalPrice: subtotal + shipping,
      phoneNumber,
      address,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Pending",
      createdAt: now,
      updatedAt: now
    });

    await Promise.all(normalizedItems.map((item) => sparePartsModel.findByIdAndUpdate(item.partId, { $inc: { stock: -item.quantity } })));
    res.status(201).json({ message: "order created successfully", data: order });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "failed to add order", err: err.message });
  }
};

const updateOrders = async (req, res) => {
  try {
    const data = await ordersModel.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true, runValidators: true });
    if (!data) return res.status(404).send("Order not found");
    res.json({ message: "order updated successfully", data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "failed to update order", err: err.message });
  }
};

const deleteOrders = async (req, res) => {
  try {
    const data = await ordersModel.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).send("Order not found");
    res.json({ message: "order deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "failed to delete order", err: err.message });
  }
};

module.exports = { getOrders, addOrders, updateOrders, deleteOrders };
