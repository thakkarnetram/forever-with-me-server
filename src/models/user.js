const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
})

const user = mongoose.model("User",userSchema)
module.exports = user
