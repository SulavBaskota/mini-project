import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  userrole: String,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
