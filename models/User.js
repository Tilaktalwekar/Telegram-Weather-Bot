const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  city: { type: String },
  subscribed: { type: Boolean, default: true },
  blocked: { type: Boolean, default: false },

});

module.exports = mongoose.model("User", userSchema);
