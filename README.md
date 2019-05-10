Scranner - Backend 

A backend API that allows users to post recipes, and store ingredients in a shopping list.

A live version can be viewed at: https://scranner123.herokuapp.com/

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purpo

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

GET /api -- returns the home page.

GET /api/users/:username -- returns a specific user.
POST /api/users/:username -- adds a new user, requires a JSON object containing a username, firstName, lastName, and email.
PATCH /api/users/:username -- updates an existing users details.

GET /api/recipes/:user_id -- returns a specific user's id.
POST /api/recipes/:user_id -- adds a recipe for a user, requires a name, user, servings and ingredients.
DELETE /api/recipes//:recipe_id -- deletes a specific recipe.

GET /api/shopping-lists/:user_id -- returns a specific user's shopping list
DELETE /api/shopping-lists/:user_id -- empties a given user's shopping list.
PATCH /api/shopping-lists/:user_id/:recipe_id -- adds or removed a given recipe from the shopping list. Requires an update query or either 'add' or 'remove'