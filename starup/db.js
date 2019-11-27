const mongose = require("mongoose");
const winston = require('winston')
const config = require("config")

module.exports = function() {
  const db = config.get("db")
    mongose
  .connect(db)
  .then(() => console.log(`mondodb conect ${db}`))
  
}