const mongose = require("mongoose");
const Joi = require("@hapi/joi");

const genresShema = mongose.Schema({
    name: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 50
    }
  });
  
  const Genre = new mongose.model("Genre", genresShema);



  function validateGenre(genre) {
    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .required()
    });
  
    return schema.validate(genre);
  }


exports.Genre = Genre;
exports.genresShema = genresShema;
exports.validate = validateGenre;

