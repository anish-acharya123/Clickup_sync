const express = require("express");
const connectDb = require("./configs/db");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

//middle ware
app.use(cookieParser());

// Initialize the session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//connect to db
connectDb();

//routes
app.use("/auth", require("./routes/authRoutes"));

//user
app.use("/user", require("./routes/userRoutes"));



// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
