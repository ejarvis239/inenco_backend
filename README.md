inenco - Backend 

A backend API that allows owners to manage site information.

A live version can be viewed at: https://inenco.herokuapp.com/

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

Prerequisites
Before starting, you should ensure the following are installed:

Node v8.12
MongoDB v4.0

For this project, you will also require the following dependencies:

"dependencies": {
    "body-parser": "^1.18.3",
    "express": "^4.16.3",
    "mongoose": "^5.2.17"
  },

"devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^5.2.0",
    "nodemon": "^1.18.4",
    "supertest": "^3.3.0"

Installing
Fork and clone this repository onto your own local machine.

Install the required node dependencies:

$ npm i
Create a config file for the project:
$ mkdir config
$ touch config.js

Your config file should look similar to this. 

const NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  test: { DB_URL: "mongodb://localhost:27017/<test _database_name>" },
  development: { DB_URL: "mongodb://localhost:27017/<database_name>" }
};

module.exports = config[NODE_ENV];

Before seeding the database you first need to make sure that mongo is open and running:
$ mongod

To seed the development database, you can use the following::
$ npm run seed:dev

Running the tests
You can run the provided tests with the following script:

$ npm test
The test database will automatically re-seed after every test, so you don't need to worry about doing this manually.

Api endpoints

The following endpoints are available to users.

GET / -- returns the home page.
GET /api/owners/:username -- returns a specific owner
POST /api/owners/ -- adds a new owner, requires a JSON object containing a username, first name, last name, and email
GET /api//sites/:owner_id -- returns a specific owners site
POST /api/sites/:owner_id -- adds a site for an owner
DELETE /api/sites/:site_id -- deletes a specific site