const mongoose = require('mongoose')

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
})

const memory = mongoose.model("Memory",memorySchema)
module.exports=memory;
