const winston = require('winston')

require('winston-mongodb')
module.exports = function() {
    // zapis nie obsgiwanych bledow nie zwiazanych z routami 
process.on("uncaughtException", (ex)=> {
  console.log(ex.message, ex)
    console.log("errrorrrrrrr proces on")
    winston.error(ex.message, ex)
    process.exit(1)
  })
  //zapis nie obsgiwanych bduw zwiazanych z promies rejection
  
  process.on("unhandledRejection", (ex)=> {
    console.log(" we got unhandleRejection")
    winston.error(ex.message, ex)
    process.exit(1)
  })
  //zapis do osobnego pliku
  winston.exceptions.handle( new winston.transports.File({filename : "uncaughtException.log"}))


 winston.add(new winston.transports.File({ filename : 'logfile.log' }));
 winston.add(new winston.transports.MongoDB({ db : 'mongodb://localhost/vidlly' }));
  
}