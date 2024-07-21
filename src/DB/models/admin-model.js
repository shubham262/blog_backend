const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
    unqiue: true,
  }
});

module.exports = mongoose.model("Admin", adminSchema);
