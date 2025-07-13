const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const urlRoutes = require("./routes/url.route");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", urlRoutes);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${process.env.MONGO_URI}`);
});

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(3000, () =>
//       console.log("Server running on http://localhost:3000")
//     );
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));
