const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  clickupToken: { type: String },
  githubToken: { type: String },
  githubName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
