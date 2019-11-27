 const winston = require('winston')
 
 function error (error, req,res,next) {
    winston.error(error.message, error)
    res.status(500).send("something failed")
}

module.exports = error