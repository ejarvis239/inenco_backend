const mongoose = require('mongoose');

const { Schema } = mongoose;

const SiteSchema = new Schema({
  address: {
    houseNumber: String,
    street: String,
    city: String,
    postcode: String,
    telephone: String,
  },
  manager: {
    type: String,
    required: true,
  },  
  gasMeters:  [
    {
      accountNumber: String,
      ID: String,
    }
  ],
  electricityMeters:  [
    {
      accountNumber: String,
      ID: String,
    }
  ],
  AMRenabled: {
    type: Boolean,
  },  
  floorspace: {
    floorspace: Number,
    units: String,
  },  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owners'
  },
});

module.exports = mongoose.model('sites', SiteSchema);
