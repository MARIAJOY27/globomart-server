const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1]
        const jwtResponse = jwt.verify(token,process.env.SECRET)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
        
    } catch (error) {
        console.log(error);
        res.status(401).json('Authentication failed')
    }
}

module.exports = jwtMiddleware