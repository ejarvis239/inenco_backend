const mongoose = require('mongoose');
const { Owner, Site } = require('../models/index.js');
const { formatSiteData } = require('../utils/index.js');

const seedDB = ({ ownersData, sitesData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Owner.insertMany(ownersData),
      ]); 
    })
    .then(([ownerDocs]) => {
      return Promise.all([
        ownerDocs,
        Site.insertMany(formatSiteData(sitesData, ownerDocs)),
      ]);
    })
};

module.exports = seedDB;
