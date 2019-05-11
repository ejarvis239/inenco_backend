const Owner = require('../models/Owner.js');

const getOwner = (req, res, next) => {
  Owner.find({ username: req.params.username })
    .then(([owner]) => {
      if (owner.length === 0) throw { msg: 'user does not exist', status: 404 };
      else res.status(200).send({ owner });
    })
    .catch(next);
};

const getOwners = (req, res, next) => {
  Owner.find()
  .then(owners => {
    res.status(200).send({ owners })
  })
  .catch(next)
};

const addOwner = (req, res, next) => {
  const newOwner = Owner({
        ...req.body,
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
      });
      newOwner.save()
        .then((owner) => {
          res.status(201).send(owner);
        })
        .catch(next);
    };

module.exports = { getOwner, addOwner, getOwners };
