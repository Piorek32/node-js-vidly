
const { User } = require('../models/user')



const isAdmin =  async (req, res, next) => {
    console.log('isadmin')
   const user  = await User.findById(req.user._id)
   if(!user.isAdmin) return res.status(400).send('not alowed')

   next()
  
 }


module.exports = isAdmin;