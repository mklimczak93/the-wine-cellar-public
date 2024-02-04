const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => {
    //verify auth through req headers
    const { authorization } = req.headers;
   
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required.'})
    };
    //splitting array by space to receive only token (removing 'bearer')
    const token = authorization.split(' ')[1]
    //veryfing token
    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
    
        req.user = await User.findOne({ _id }).select('_id')
        next()
    
      } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
      }
};

module.exports = requireAuth;

