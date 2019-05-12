const ownerRouter = require('express').Router();
const {getOwner, addOwner, getOwners, updateOwner} = require('../controllers/owners')

ownerRouter.route('/:username')
    .get(getOwner)

ownerRouter.route('/:user_id')
    .patch(updateOwner)

ownerRouter.route('/')
    .post(addOwner)
    .get(getOwners)
  
module.exports = ownerRouter;
