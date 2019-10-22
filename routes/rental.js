const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movies");
const { Customer } = require("../models/customer");
const mongoose = require('mongoose');
const Fawn = require('fawn')

Fawn.init(mongoose)

router.get("/", async (req, res) => {
  const movies = await Rental.find().sort({});
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");
  const movie = await Movie.findById(req.body.movieId);
  console.log(movie)
  if (!movie) return res.status().send("movie not found");

  if (movie.numberInStock === 0)
    return res.status(400).send("movie out of stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      customer: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
    
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();

    res.send(rental);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
