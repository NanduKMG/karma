const express = require('express');

const router = express.Router();
const methods = require('data/methods');

/**
 * @api {get} /private/people/slug GetAllSlugs
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetAllSlugs
 * @apiGroup People
 *
 * @apiSuccess {String} status Status of the reponse
 * @apiSuccess {Object} slug The newly created slug
 * @apiSuccess {Number} id The id of the slug
 * @apiSuccess {String} slug_name Name of the slug
 * @apiSuccess {Date} createdAt createdAt
 * @apiSuccess {Date} updatedAt updatedAt
 *
 * @apiParam {String} slugName Name of the slug
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "status": "success",
    "slug": [
        {
            "id": 1,
            "slug_name": "address",
            "createdAt": "2018-06-29T05:05:08.000Z",
            "updatedAt": "2018-06-29T05:05:08.000Z"
        },
        {
            "id": 2,
            "slug_name": "1212",
            "createdAt": "2018-06-29T05:05:23.000Z",
            "updatedAt": "2018-06-29T05:05:23.000Z"
        },
        {
            "id": 3,
            "slug_name": "email",
            "createdAt": "2018-07-03T04:34:54.000Z",
            "updatedAt": "2018-07-03T04:34:54.000Z"
        },
        {
            "id": 4,
            "slug_name": "telephone",
            "createdAt": "2018-07-03T05:19:16.000Z",
            "updatedAt": "2018-07-03T05:19:16.000Z"
        }
    ]
}
 */

router.get('/slug', (req, res) => {
  methods.people.getSlugs()
    .then((slug) => {
      res.json({
        status: 'success',
        slug,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});


/**
 * @api {post} /private/people AddPeople
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddPeople
 * @apiGroup People
 *
 * @apiSuccess {id} id People ID of the user
 * @apiSuccess {String} first_name First Name of the user
 * @apiSuccess {String} middle_name Middle Name of the user
 * @apiSuccess {String} last_name Last Name of the user
 * @apiSuccess {Char} gender Gender
 * @apiSuccess {Date} date_of_birth Date of birth of the user
 * @apiSuccess {String} nationality Nationality of the user
 * @apiSuccess {Date} createdAt createdAt
 * @apiSuccess {Date} updatedAt updatedAt
 *
 * @apiParam {String} firstName First Name of the user
 * @apiParam {String} middleName Middle Name of the user
 * @apiParam {String} lastName Last Name of the user
 * @apiParam {Char} gender Gender
 * @apiParam {Date} dateOfBirth Date of birth of the user
 * @apiParam {String} nationality Nationality of the user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 7,
 *       "first_name": "John",
 *       "middle_name": "",
 *       "last_name": "Doe",
 *       "gender": "M",
 *       "date_of_birth": "1997-09-19",
 *       "nationality": "Indian",
 *       "updatedAt": "2018-06-04T05:05:37.992Z",
 *       "createdAt": "2018-06-04T05:05:37.992Z"
 *     }
 */

router.post('/', (req, res) => {
  const info = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'firstName')
    && Object.prototype.hasOwnProperty.call(req.body, 'lastName')
    && Object.prototype.hasOwnProperty.call(req.body, 'middleName')
    && Object.prototype.hasOwnProperty.call(req.body, 'gender')
    && Object.prototype.hasOwnProperty.call(req.body, 'dateOfBirth')
    && Object.prototype.hasOwnProperty.call(req.body, 'nationality')) {
    // TODO: Add another check after resolution of issue #14
    // req.body.hasOwnProperty('email') && req.body
    // .hasOwnProperty('phoneNumber')) {
    info.first_name = req.body.firstName;
    info.middle_name = req.body.middleName;
    info.last_name = req.body.lastName;
    info.gender = req.body.gender;
    info.date_of_birth = req.body.dateOfBirth;
    info.nationality = req.body.nationality;
    info.email = req.body.email;
    info.phone_number = req.body.phoneNumber;
    methods.people.addPeople(info)
      .then((model) => {
        res.json(model);
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          error: err.message,
        });
      });
  } else {
    res.status(500).json({
      status: 'error',
      error: 'One or more of the parameters are incorrect!',
    });
  }
});

/**
 * @api {get} /private/people/:id GetPeopleById
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetPeopleById
 * @apiGroup People
 *
 * @apiSuccess {id} id People ID of the user
 * @apiSuccess {Stirng} firstName First Name of the user
 * @apiSuccess {String} middleName Middle Name of the user
 * @apiSuccess {String} lastName Last Name of the user
 * @apiSuccess {Char} gender Gender
 * @apiSuccess {Date} dateOfBirth Date of birth of the user
 * @apiSuccess {String} nationality Nationality of the user
 * @apiSuccess {Date} createdAt createdAt
 * @apiSuccess {Date} updatedAt updatedAt
 *
 * @apiParam {Number} id peopleID of the user
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *     {
 *      "data": {
 *          "id": 7,
 *          "first_name": "John",
 *          "middle_name": "",
 *          "last_name": "Doe",
 *          "gender": "M",
 *          "date_of_birth": "1987-01-01",
 *          "nationality": "Indian",
 *          "createdAt": "2018-06-04T08:56:51.000Z",
 *          "updatedAt": "2018-06-04T08:56:51.000Z"
 *      }
 *     }
 */

router.get('/:id', (req, res) => {
  const { id } = req.params;

  methods.people.findPeopleById(id)
    .then((people) => {
      res.json({
        data: people.dataValues,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});

/**
 * @api {put} /private/people/:slugName AddInformaionSlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddInformaionSlug
 * @apiGroup People
 *
 * @apiSuccess {Stirng} success success
 * @apiSuccess {Object} slug Newly created slug
 * @apiSuccess {id} id
 * @apiSuccess {String} slug_name Name of the slug
 * @apiSuccess {Date} createdAt createdAt
 * @apiSuccess {Date} updatedAt updatedAt
 *
 * @apiParam {String} slugName Name of the slug
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *     {
 *      "status": "success",
 *      "slug": {
 *        "id": 3,
 *        "slug_name": "telephone",
 *        "updatedAt": "2018-06-08T01:33:42.134Z",
 *        "createdAt": "2018-06-08T01:33:42.134Z"
 *     }
 */

router.put('/:slugName', (req, res) => {
  const { slugName } = req.params;

  methods.people.insertSlug(slugName)
    .then((slug) => {
      res.json({
        status: 'success',
        slug,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});

/**
 * @api {put} /private/people/:peopleId/:slugName AddInformationUsingSlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddInformationUsingSlug
 * @apiGroup People
 * @apiDescription To add information corresponding to a slug for people
 *
 * @apiSuccess {String} status Status of the reponse
 * @apiSuccess {Object} slug The newly created slug
 * @apiSuccess {Number} id The id of the slug
 * @apiSuccess {String} slug_name Name of the slug
 * @apiSuccess {Date} createdAt createdAt
 * @apiSuccess {Date} updatedAt updatedAt
 *
 * @apiParam {Integer} peopleId people ID of the user
 * @apiParam {String} slugName Name of the slug
 * @apiParam {String} value Value of the slug
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "information": "Email inserted!"
 *    }
 *
 */

router.put('/:peopleId/:slugName', (req, res) => {
  const { slugName } = req.params;
  const { peopleId } = req.params;

  const slugValue = req.body.value;
  methods.people.putInformationUsingSlug(peopleId, slugName, slugValue)
    .then((info) => {
      res.json({
        status: 'success',
        information: info,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});

/**
 * @api {get} /private/people/:peopleId/:slugName GetInformationUsingSlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetInformationUsingSlug
 * @apiGroup People
 * @apiDescription To get data corresponding to a slug for people
 *
 * @apiSuccess {id} id People ID of the user
 * @apiSuccess {Stirng} firstName First Name of the user
 * @apiSuccess {String} middleName Middle Name of the user
 * @apiSuccess {String} lastName Last Name of the user
 * @apiSuccess {Char} gender Gender
 * @apiSuccess {Date} dateOfBirth Date of birth of the user
 * @apiSuccess {String} nationality Nationality of the user
 * @apiSuccess {Date} createdAt createdAt
 * @apiSuccess {Date} updatedAt updatedAt
 *
 * @apiParam {String} slugName Name of the slug
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "status": "success",
 *   "information": {
 *       "id": 1,
 *       "people_id": 1,
 *       "slug_id": 3,
 *       "data": [
 *           "john@cet.ac.in",
 *           "john@gmail.com"
 *       ],
 *       "createdAt": "2018-07-03T04:34:58.000Z",
 *       "updatedAt": "2018-07-03T04:34:58.000Z"
 *   }
 * }
 *
 */

router.get('/:peopleId/:slugName', (req, res) => {
  const { slugName } = req.params;
  const { peopleId } = req.params;

  methods.people.getInformationUsingSlug(peopleId, slugName)
    .then((info) => {
      res.json({
        status: 'success',
        information: info,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});

module.exports = router;
