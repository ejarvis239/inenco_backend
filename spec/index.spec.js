process.env.NODE_ENV = 'development';
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app.js');
const request = require('supertest')(app);
const seedDB = require('../seed/seed.js');
const data = require('../seed/testData/index.js');

describe('/api', () => {
  let owners, sites;
  beforeEach(function () {
    return seedDB(data)
      .then((docs) => {
        [owners, sites] = docs
      })
  });

  after(() => mongoose.disconnect());

  describe('/*', () => {
    it('GET invalid path returns status 404 and message Page not found', () => {
      return request
        .get('/hello')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Page not found');
        });
    });
  });
  describe('/sites', () => {
    describe('/api/sites', () => {
      it('GET site returns status 200 and object of site', () => {
        return request
          .get(`/api/sites`)
          .expect(200)
          .then((res) => {
            expect(res.body.sites[0]).to.include.keys(
              'address',
              'floorspace',
              'manager',
              'gasMeters',
              'electricityMeters',
              'AMRenabled',
              'owner',
            );
          });
      });
    });
    it('POST site returns status 201 and a new site', () => {
    return request
      .post('/api/sites')
      .send( {
        "address": {
          "houseNumber": "1",
          "street": "something street",
          "city": "liverpool",
          "postcode": "L1 1AB",
          "telephone": "07733781805"
        },
        "manager": "somebody",
        "gasMeters": [
          {
            "accountNumber": "123",
            "ID": "3"
          },
          {
            "accountNumber": "456",
            "ID": "4"
          }
        ],
        "electricityMeters": [
          {
            "accountNumber": "123",
            "ID": "3"
          },
          {
            "accountNumber": "456",
            "ID": "4"
          }
        ],
        "AMRenabled": true,
        "floorspace": {
          "floorspace": 213,
          "units": "square meters"
        },
        })
      .expect(201)
      .then(res => {
        expect(res.body).to.include.keys(
          'address',
          'floorspace',
          'manager',
          'gasMeters',
          'electricityMeters',
          'AMRenabled',
        );      
      });
  });
  it('POST returns a 400 status and error message when the new post is empty', () => {
    return request
      .post('/api/sites')
      .send({  })
      .expect(400)
      .then(res => { 
        expect(res.body.msg).to.equal('sites validation failed: manager: Path `manager` is required.');
      });
  });   
  it('POST returns a 400 status and error message when there is a missing required field in the new post', () => {
    return request
      .post('/api/sites')
      .send({AMRenabled: "yes"})
      .expect(400)
      .then(res => { 
        expect(res.body.msg).to.equal('sites validation failed: manager: Path `manager` is required.');
      });
  });   
});   
  describe('/api/sites/:owner_id}', () => {
    it('GET site returns status 200 and object of site', () => {
      return request
        .get(`/api/sites/${owners[1]._id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.site[0]).to.include.keys(
            'address',
            'floorspace',
            'manager',
            'gasMeters',
            'electricityMeters',
            'AMRenabled',
            'owner',
          );
        });
    });
  });
    it('POST creates a new site and assigns it to a user', () => {
      const newSite = {
        "address": {
          "houseNumber": "1",
          "street": "something street",
          "city": "liverpool",
          "postcode": "L1 1AB",
          "telephone": "07733781805"
        },
        "manager": "somebody",
        "gasMeters": [
          {
            "accountNumber": "123",
            "ID": "3"
          },
          {
            "accountNumber": "456",
            "ID": "4"
          }
        ],
        "electricityMeters": [
          {
            "accountNumber": "123",
            "ID": "3"
          },
          {
            "accountNumber": "456",
            "ID": "4"
          }
        ],
        "AMRenabled": true,
        "floorspace": {
          "floorspace": 213,
          "units": "square meters"
        },
    }
      return request
        .post(`/api/sites/${owners[1]._id}`)
        .send(newSite)
        .expect(201)
        .then(({ body }) => {
          expect(body.site).to.include.keys(
            'address',
            'floorspace',
            'manager',
            'gasMeters',
            'electricityMeters',
            'AMRenabled',
            'owner',
        )
    });
  });
  describe('/owners', () => {
    it('POST owner returns status 201 and a new owner', () => {
      const newOwner = {
      username: 'Blinky',
      email: 'blinkyboi@gmail.com',
      firstName: 'Blinky',
      lastName: 'the Fish',
    };
    return request
      .post('/api/owners')
      .send(newOwner)
      .expect(201)
      .then(({ body }) => {
        expect(body).to.include.keys(
          'username', 
          'firstName', 
          'lastName', 
          'email'
          );
        expect(body.username).to.equal(newOwner.username.toLowerCase());
      });
  });
});
    describe('/api/owners/:username', () => {
      it('GET owner by username returns status 200 and object of user data', () => {
        return request
          .get(`/api/owners/${owners[0].username}`)
          .expect(200)
          .then((res) => {
            expect(res.body.owner).to.include.keys(
              'username',
              'firstName',
              'lastName',
              'email',
            );
          });
        });
      });
    describe('/api/owners/:owner_id', () => {
      it('PATCH to update owner updates owner information', () => {
        return request
          .patch(`/api/owners/${owners[0]._id}`)
          .send({ updatedUsername: 'Mitchismean', updatedFirstName: 'Mitch', updatedLastName: 'Ismean', updatedEmail: "mitchismean@gmail.com"})
          .expect(200)
          .then(res => {
            expect(res.body.owner.username).to.equal("mitchismean")
          });
      });
    });
  describe('/api/sites/:site_id', () => {
    it('DELETE removes a site from an owner', () => {
      return request.delete(`/api/sites/${sites[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.msg).to.equal('Site successfully removed')
        });
      });
    });
  });