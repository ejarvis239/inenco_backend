const ownerRouter = require('express').Router();
const {getOwner, addOwner, getOwners} = require('../controllers/owners')

ownerRouter.route('/:username')
    .get(getOwner)

ownerRouter.route('/')
    .post(addOwner)
    .get(getOwners)
  
module.exports = ownerRouter;
