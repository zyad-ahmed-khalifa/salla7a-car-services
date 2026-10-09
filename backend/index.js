require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { myMiddlewares } = require("./middlewares/spareParts.middlewares.js");
const { connectDB } = require("./config/bd.config.js");
const { sparePartsRouter } = require("./routes/spareParts.route.js");
const { ordersRouter } = require("./routes/orders.route.js");
const { emergencyRouter } = require("./routes/emergencyRequest.route.js");
const { carsRouter } = require("./routes/cars.route.js");
const userRoutes = require("./routes/userroutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(myMiddlewares);

connectDB();

app.use("/spareParts", sparePartsRouter);
app.use("/orders", ordersRouter);
app.use("/emergency", emergencyRouter);
app.use("/cars", carsRouter);
app.use(userRoutes);

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
