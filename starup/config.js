
const config = require('config')
module.exports = function () {
    console.log(`port is ${process.env.PORT}`);
    console.log(`secret is ${process.env.vidly_jwtPrivateKey}`);

    console.log(config.get("name"));
    
if (!process.env.vidly_jwtPrivateKey) {
    console.log("SECRET IS NOT SET")
    process.exit(1)
    
  }
}