const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/listings').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('listings')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});


// This section will help you get a list of all the records.
recordRoutes.route('/genre').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('genre')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});



// This section will help you create a new record.
recordRoutes.route('/listing').post(function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('listings')
    .insertOne(req.body, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result}`);
        res.status(201).send();
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/listing').put(function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('listings')
    .updateOne(
      { _id: ObjectId =>(req.params.id) },
      { $set: {"title":req.body.title,
      "genre": req.body.genre,
      "numberInStock":req.body.numberInStock,
      "dpRate":req.body.dpRate,
      "wholeSaleRate":req.body.wholeSaleRate,
      "retailRate":req.body.retailRate}},
      req.body, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result}`);
        res.status(204).send();
      }
    });
});


// This section will help you delete a record.
recordRoutes.route('/listings/delete/:id').delete((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: ObjectId =>(req.params.id) };
  dbConnect
    .collection('listings')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery._id}!`);
      } else {
        console.log('1 document deleted');
      }
    });
});

module.exports = recordRoutes;
