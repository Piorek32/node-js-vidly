const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../models/user')
const checkToken = async (req, res, next) => {

    const token = req.header('x-auth-token')
    if (!token) res.status(401).send("access denied. No token provided")



    try {
    const decoded   = jwt.verify(token, config.get('jwtPrivateKey'));
    const user = await User.findById(decoded._id)

    req.user = decoded;
    next()     
    } catch (error) {
        res.status(400).send('invalid token')
    }
  
 }


module.exports = checkToken;