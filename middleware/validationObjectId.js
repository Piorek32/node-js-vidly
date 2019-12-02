const mongose = require('mongoose')

module.exports = function (req,res, next) {
    console.log(mongose.Types.ObjectId.isValid(req.params.id))
    if (!mongose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send('invalid Id from midel ')
    }
    next()

}