const users = require("../model/userModel");
const jwt = require('jsonwebtoken')


exports.registerController = async(req,res)=>{
    const {username, email, password} = req.body
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(401).json('User Already Exists')
        }
        else{
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.loginController = async(req,res)=>{
    const {email, password} = req.body
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.SECRET)
            res.status(200).json({existingUser, token})
        }
        else{
            res.status(406).json('Incorrect email ID or password')
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}