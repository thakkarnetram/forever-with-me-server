const User = require("../models/user")
const Otp = require("../models/otp")
const jwt = require("jsonwebtoken");
const {sendOtp} = require("../utils/emailSender");
const util = require("node:util");

const signToken = userId => {
    return jwt.sign({
        userId,
    },process.env.SECRET_KEY)
}

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.startAuth = async (req,res) => {
    try {
        const {email} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email) {
            return res.status(400).json({message:"Email is required"})
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({message:"Enter valid email"})
        }
        const otp = generateOtp();
        await Otp.create({
            email,
            otp,
            isUsed:false,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        })
        await sendOtp(email,otp)
        return res.status(200).json({ok:true})
    } catch (err) {
        return res.status(500).json({message:err})
    }
}

exports.verifyOtp = async (req,res) => {
    try {
        const {email,otp} = req.body;
        if(!email || !otp) {
            return res.status(400).json({ message: "Missing details" });
        }
        const record = await Otp.findOne({email,otp});
        if (!record || record.expiresAt < Date.now()) {
            return res.status(401).json({ message: "That doesn’t seem right. Try again." });
        }
        await Otp.deleteMany({ email });
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email });
        }
        const token = signToken(user._id);
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({message:err})
    }
}

exports.protectRouter = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        let jwtToken;
        if(!token){
            return res.status(400).json({message:"Authorization Missing"})
        }
        if(token&&token.startsWith("Bearer ")) {
            jwtToken = token.split(" ")[1];
        }
        const decodedToken = await util.promisify(jwt.verify)(
            jwtToken,
            process.env.SECRET_KEY
        )
        const user = await User.findOne({_id:decodedToken.userId});
        if(!user) {
            return res.status(404).json({message:"User not found"})
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}
