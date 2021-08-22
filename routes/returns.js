const Joi = require('joi');
const validateObjectId = require('../middleware/validateObjectId');
const authorization = require('../middleware/auth');
const validate = require('../middleware/validate');
const admin = require('../middleware/admin');
// const { Return , validate } = require('../models/returns');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', [authorization, validate(validateReturn)], async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('The rental not found');

    if (rental.dateReturned) return res.status(400).send('Return already Processed');

    rental.return();
    await rental.save();

    await Movie.updateOne({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    })
    

    return res.status(200).send(rental);
    // res.status(401).send('Unauthorized');
});

function validateReturn(req) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;