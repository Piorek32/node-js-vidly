const winston = require('winston')
const expres = require("express");
require('express-async-errors')
const router = require("express").Router();
const mongose = require("mongoose");
const asyncError = require('../middleware/asyncErrorHandling')
const { Genre, validate } = require('../models/genre')
const authToken = require('../middleware/token')
const isAdmin = require('../middleware/isAdmin')
const valiId = require('../middleware/validationObjectId')







router.get("/",  async(req, res, next) => {
 console.log("get")
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);    
});

router.post("/",authToken, async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genere = new Genre({
    name: req.body.name
  });
  const result = await genere.save();
  res.send(result);
});

router.put("/:id", valiId, async (req, res) => {
  let genre;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  try {
    genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true
      }
    );
  } catch (error) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  console.log("put");
  console.log(genre);

  res.send(genre);
});

router.delete("/:id", [authToken, isAdmin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("nie ma tkiego id");

  res.send(genre);
});

router.get("/:id", valiId, async (req, res) => {

  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("nie ma tkiego id");
  res.send(genre);
});



module.exports = router;
