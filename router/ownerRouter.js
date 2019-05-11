const ownerRouter = require('express').Router();
const {getOwner, addOwner} = require('../controllers/owners')

ownerRouter.route('/:username')
    .get(getOwner)
    .get(getOwners)

ownerRouter.route('/')
    .post(addOwner)
  
module.exports = ownerRouter;
