
const express = require('express')
const path  = require('path')
const pug = require('pug');
const logger = require('./logger')
const config = require('config')
const courses = require('./routes/courses')
const coustomer = require('./routes/customers')
const movies = require('./routes/movies')
const rental = require('./routes/rental')
const users = require('./routes/users')
const auth = require('./routes/auth')



const app = express();
app.set('view engine', 'html')
app.use(express.json());
app.use(logger)
app.use(express.static('public'))

console.log(config.get('jwtPrivateKey')) 
 

console.log(`env is ${process.env.PORT}`)
console.log(`pass is ${process.env.vidly_jwtPrivateKey}`)
console.log(`pass is ${process.env.NODE_ENV}`)
console.log(config.get("name"))
//app.use(express.static('public'))

app.use("/api/genres", courses)
app.use("/api/coustomer", coustomer)
app.use("/api/movies", movies)
app.use("/api/rental", rental)
app.use("/api/users", users)
app.use("/api/auth", auth)



app.get('/', ( req,res ) => {

  res.sendFile(path.join(__dirname, "views/index.html"))

})

const port = 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

