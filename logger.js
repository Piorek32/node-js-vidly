

const logger = (req, res, next) => {
    console.log("login")
    next()
}


module.exports = logger;