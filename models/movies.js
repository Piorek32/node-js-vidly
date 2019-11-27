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
  },
  images : {
    type : String,
    required: true,
  }
});


const Movie = mongose.model('Movies' , movieSchema)



function validateMovie(movie) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(256).required(),
      genreId : Joi.string().required(),
      numberInStock: Joi.string().min(0).required(),
      dailyRentalRate: Joi.string().min(0).required(),
    });
  
    return schema.validate(movie);
  }

exports.Movie = Movie;
exports.validate = validateMovie;



// {
   
//   "title": "Rambo",
//   "genre":  "5db95655e006d878ac8d0199",
    
  
//   "numberInStock": "5",
//   "numberInStock": "5",
  
// }