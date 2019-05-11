const siteRouter = require('express').Router();
const {getSites, getSiteByOwner, getSiteByID, addSite, addSiteToOwner, deleteSite} = require('../controllers/sites')

siteRouter.route('/')
    .get(getSites)
    .post(addSite)

siteRouter.route('/:owner_id')
    .get(getSiteByOwner)
    .post(addSiteToOwner)

siteRouter.route('/:site_id')
    .delete(deleteSite)
    .get(getSiteByID)
  
module.exports = siteRouter;
