
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiExclude = require('chai-exclude');

chai.use(chaiExclude);
const app = require('../../../../../../bin/www');
const methods = require('../../../../../../lib/data/methods');


process.nextTick(() => {
  app.callback = run;
});

chai.use(chaiHttp);
const { expect } = chai;


const newPeople = [];
const tempPeople = [];

describe('/PUT/:id ', () => {
  beforeEach((done) => {
    console.log('entered');
    const classes = {
      role_name: 'Name',
      role_slug: 'Slug',
      role_description: 'Description',
    };

    methods.Media.mediaRolesMethods.addMediaRoles(classes)
      .then((model) => {
        newPeople.push(model.dataValues);

        const ret = newPeople.map((datum) => {
          const dat = datum;
          delete dat.created_at;
          delete dat.updated_at;
          return dat;
        });
        console.log(ret);
        tempPeople.push(ret[0]);
        done();
      })
      .catch(err => console.log(err));
  });

  it('it should UPDATE mediaroles given the id', (done) => {
    methods.Academics.streamTypesMethods.getAllMediaRoles()
      .then((res) => {
        let id = {};
        id = res[0].dataValues.id;
        const Types = {
          roleName: 'Name',
          roleSlug: 'Slug',
          roleDescription: 'Description',
        };

        chai.request(app)
          .put(`/private/media/media_roles/${id}`)
          .send(Types)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated media roles');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  afterEach((done) => {
    methods.Media.mediaMethods.deleteAllMediaRoles().then(() => {
      console.log('done');
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
});