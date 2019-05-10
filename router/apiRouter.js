const apiRouter = require('express').Router();
const siteRouter = require('./siteRouter')
const ownerRouter = require('./ownerRouter')

apiRouter.get("/", (req, res, next) => res.sendFile(`${__dirname}/views/index.html`)
);

apiRouter.use('/sites', siteRouter)
apiRouter.use('/owners', ownerRouter)

module.exports = apiRouter;
