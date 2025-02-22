const mongoose = require("mongoose");

// Your MongoDB URI should include the cluster URL and optional database name
const mongoDB_URI = "";
// Connect to MongoDB
mongoose
  .connect(mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
