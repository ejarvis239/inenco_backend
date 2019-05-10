const siteRouter = require('express').Router();
const {getSites, getSite, addSite, addSiteToOwner, deleteSite} = require('../controllers/sites')

siteRouter.route('/')
    .get(getSites)
    .post(addSite)

siteRouter.route('/:owner_id')
    .get(getSite)
    .post(addSiteToOwner)

siteRouter.route('/:site_id')
    .delete(deleteSite);
  
module.exports = siteRouter;
