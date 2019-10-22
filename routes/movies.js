const express = require('express')
const router = express.Router()
const { Movie, validate } = require("../models/movies")
const { Genre } = require('../models/genre')


router.get('/', async (req, res) => {
    const movies = await Movie.find()
        .sort({name : 1 })
        res.send(movies)
})


router.post('/', async (req, res) => {
    console.log(req.body)
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    let movie = new Movie({ 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    
    res.send(movie);
  });

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.send(error.details[0].message)
    const genre = Genre.findById(req.body.genreId)
    if (!genre)  return res.status(404).send('Invalid Genre')
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        numberInStock : req.params.numberInStock,
        dailyRentalRate : req.params.dailyRentalRate,
    }, {new : true})

    res.send(movie)

})


router.delete('/:id', async (req, res) => {
  const movie  = await  MovieModel.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).send("invalid Id")
    res.send(movie)

})


router.get('/:id', async (req,res) => {
    const movie  = await Movie.findById(req.param.id)
    if (!movie) return res.status(404).send("invalid Id")
    res.send(movie)

})


module.exports = router;





