const config = require('config')
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken')



router.post("/", async (req, res) => {
   
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ error : error.details[0].message});
  
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error : "Invali email or password"});
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) return res.status(400).send("Invali email or password");
    //  const token =  jwt.sign({_id : user._id }, config.get('jwtPrivateKey'))
    const token = user.userToken()
    res.header('x-auth-token', token).send({ 
        user : _.pick(user, ["name", "email"]),
    token : token
    });
  });



  
function validateUser(user) {
    const schema = Joi.object({
        email : Joi.string().required().min(2).max(256).email(),
        password : Joi.string().required()
    })

    return schema.validate(user)
}


module.exports = router;