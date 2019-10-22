const mongose = require("mongoose");
const Joi = require("@hapi/joi");
const { genresShema } = require("./genre");

const movieSchema = new mongose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genresShema,
    require: true
  },
  numberInStock: {
    type: Number,
    require: true,
    min : 0,
    max : 255

  },

  dailyRentalRate: {
    type: Number,
    require: true,
    min : 0,
    max : 255
  }
});


const Movie = mongose.model('Movies' , movieSchema)



function validateMovie(movie) {
    const schema = Joi.object({
      title: Joi.string().min(3).max().required(),
      genreId : Joi.string().required(),
      numberInStock: Joi.string().min(0).required(),
      dailyRentalRate: Joi.string().min(0).required(),
    });
  
    return schema.validate(movie);
  }

exports.Movie = Movie;
exports.validate = validateMovie;