const Joi = require("@hapi/joi");
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config')

const usersSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50
    },
    email : {
        type: String,
        unique: true,
        require: true,
        minlength : 5,
        maxlength : 256

    },
    password : {
        type : String,
        require : true,
        minlength: 7,
        maxlength: 1024
    },
    isAdmin : Boolean 
    
});
usersSchema.methods.userToken = function () {
    const token =  jwt.sign({_id : this._id }, config.get('jwtPrivateKey'))
    return token;
}

const User =  mongoose.model('users' , usersSchema)





function validateUser(user) {
    const schema = Joi.object({
        name : Joi.string().required().min(2).max(256),
        email : Joi.string().required().min(2).max(256).email(),
        password : Joi.string().required()
    })

    return schema.validate(user)
}



exports.User = User;
exports.validate = validateUser;

