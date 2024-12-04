const express = require("express");
const connectDb = require("./configs/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//connect to db
connectDb();

//routes
app.use("/auth", require("./routes/authRoutes"));

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
