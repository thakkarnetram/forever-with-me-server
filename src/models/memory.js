const mongoose = require('mongoose')
const {encrypt} = require("../utils/crypto");
const {decrypt} = require("../utils/crypto");

const memorySchema =  new mongoose.Schema({
    text: {
        type:String
    },
    imageUrl:{
        type:String
    },
    memoryDate:{
      type:Date,
    },
    reminderDate:{
        type:Date
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    specialNote:{
        type:String
    }
},  { timestamps: true })

// trigger on new obj entry
memorySchema.pre("save",function (next) {
    // here text refers to the above defined data
    if(this.isModified("text") && this.text) {
        this.text = encrypt(this.text)
    }
    if(this.isModified("specialNote") && this.specialNote) {
        this.specialNote = encrypt(this.specialNote)
    }
    next()
})

// triggers when we return json
memorySchema.methods.toJSON = function () {
    const obj = this.toObject()
    if(obj.text) {
        obj.text = decrypt(obj.text)
    }
    if(obj.specialNote) {
        obj.specialNote = decrypt(obj.specialNote)
    }
    return obj
}

const memory = mongoose.model("Memory",memorySchema)
module.exports=memory;
