const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./Routes/categoryRoute");
const itemRoutes = require("./Routes/itemRoute");
const userRoutes = require("./Routes/userRoutes");
const cartRoutes = require("./Routes/cartRoute");
const reviewRoutes = require("./Routes/reviewRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
