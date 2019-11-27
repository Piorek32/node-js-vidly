

const express = require('express')
const path  = require('path')
const pug = require('pug');
const logger = require('./logger')
const config = require('config')
const app = express();
require('./starup/routs')(app)
require('./starup/db')();
require('./starup/logging')();
require('./starup/config')();








// const promi = Promise.reject(new Error('promies rejection'));
// promi
// .then(res => console.log(res))
// .catch(err => console.log(err))

// winston.add(new winston.transports.File({ filename : 'logfile.log' }));
// winston.add(new winston.transports.MongoDB({ db : 'mongodb://localhost/vidlly' }));


app.set('view engine', 'html')
app.use(express.json());
app.use(logger)
app.use(express.static('public'))
app.use('/uploads',express.static('uploads'))

// console.log(` config ${config.get('jwtPrivateKey')}`) 



//throw new Error("err startup")
// console.log(`port is ${process.env.PORT}`)
// console.log(`secret is ${process.env.vidly_jwtPrivateKey}`)
// console.log(`pass is ${process.env.NODE_ENV}`)
// console.log(config.get("name"))





app.get('/', ( req,res ) => {
  res.sendFile(path.join(__dirname, "views/index.html"))

})
const port =  8080 || process.env.PORT
const server =  app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;  
