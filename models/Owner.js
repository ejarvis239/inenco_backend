const mongoose = require('mongoose');
const { Schema } = mongoose;

const OwnerSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  }
});

module.exports = mongoose.model('owners', OwnerSchema);