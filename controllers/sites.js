const Site = require('../models/Site.js');

const getSites = (req, res, next) => {
    Site.find()
    .populate('owner', '-__v')
    .lean()
    .then(sites => {
      res.status(200).send({ sites })
    })
    .catch(next)
};

const getSiteByOwner = (req, res, next) => {
  Site.find({ owner: req.params.owner_id })
      .populate('owner')
      .then((site) => {
      res.status(200).send({ site });
      })
      .catch(next);
};

const getSiteByID = (req, res, next) => {
  Site.find({ _id: req.params.site_id})
  .populate('owner')
    .then(site => {
      res.status(200).send({ site })
    })
    .catch(next)
}

const addSite = (req, res, next) => {
  const newSite = Site({
    ...req.body,
    address: req.body.address,
    manager: req.body.manager,
    gasMeters: req.body.gasMeters,
    electricityMeters: req.body.electricityMeters,
    AMRenabled: req.body.AMRenabled,
    floorspace: req.body.floorspace,
    owner: req.body.owner,
  });
  newSite.save()
    .then((site) => {
      res.status(201).send(site);
    })
    .catch(next);
};

const addSiteToOwner = (req, res, next) => {
    const { owner_id } = req.params;
    const gasMeters = req.body.gasMeters
    const newGasMeters = gasMeters.map((gasMeter) => {
      return { 
        ...gasMeter,
        accountNumber: gasMeter.accountNumber,
        ID: gasMeter.ID
        }})
    const electricityMeters = req.body.electricityMeters
    const newElectricityMeters = electricityMeters.map((electricityMeter) => {
      return {
        ...electricityMeter,
        accountNumber: electricityMeter.accountNumber,
        ID: electricityMeter.ID
      }
    })
    const newSite = ({
      ...req.body, 
      address: req.body.address,
      gasMeters: newGasMeters,
      electricityMeters: newElectricityMeters,
      AMRenabled: req.body.AMRenabled,
      manager: req.body.manager,
      floorspace: req.body.floorspace,
      address: req.body.address,
    })
    newSite.owner = owner_id;
    Site.create(newSite)
      .then((site) => {
        return Site.findById(site._id)
          .populate('owner')
          .lean()
      })
      .then((site) => {
        res.status(201).send({ site });
      })
      .catch(next);
  };

  const deleteSite = (req, res, next) => {
    const {site_id} = req.params
    Site.findByIdAndRemove({_id: site_id})
    .then(() => {
      res.status(200).send({ msg: "Site successfully removed" })
    })
    .catch(next)

}

module.exports = { getSites, getSiteByOwner, getSiteByID, addSite, addSiteToOwner, deleteSite };
