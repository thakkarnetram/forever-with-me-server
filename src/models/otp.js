const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email:{
      type:String,
      require:true
    },
    otp:{
        type:String,
        require:true
    },
    isUsed : {
        type:Boolean
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model("otp",otpSchema);
module.exports = OTP;
