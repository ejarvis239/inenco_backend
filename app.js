const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./router/apiRouter');
const { handle404s, handle400s, handle500s } = require('./errors')
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json(), express.static('public'))
const DB_URL = process.env.DB_URL || require('./config/index.js')
app.set("view engine", "ejs");

app.get("/", (req, res, next) =>
  res.sendFile(`${__dirname}/views/index.html`)
);

mongoose.connect(DB_URL)
  .catch(console.log)

app.get('/', express.static('public'))

app.use('/api', apiRouter);

app.use('/*', (req, res) => {
res.status(404).send({msg: 'Page not found'});
});

app.use(handle404s);

app.use(handle400s);

app.use(handle500s);

module.exports = app;
