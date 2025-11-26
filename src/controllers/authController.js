const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const signToken = email => {
    return jwt.sign({
        email,
    },process.env.SECRET_KEY)
}

exports.signup = async (req,res) => {
    try {
        const {email,name,password,invitedBy} = req.body;
        const hash =  await bcrypt.hash(password,10)
        const user = User.create({
            email,
            name,
            password:hash,
            invitedBy
        })
        await user.save()
        return res.status(201).json({
            user
        })
    } catch (err) {
        return res.status(501).json({message:err})
    }
}

exports.login = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message:"Email and password is required"})
        }
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message:"User not found"})
        }
        const matchPassword = await bcrypt.compare(password,user.password)
        if(matchPassword) {
            const token = signToken(email)
            return res.status(200).json({
                message:"Login Successful",
                token
            })
        } else {
            return res.status(401).json({message: "Invalid password"});
        }
    } catch (err) {
        return res.status(501).json({message:err})
    }
}
