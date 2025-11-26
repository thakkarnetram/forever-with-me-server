const mongoose = require("mongoose")

const journalSchema = new mongoose.Schema({
    text:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    journalId:{
        type:String
    }
})

const journal = mongoose.model("Journal",journalSchema);
export default journal;
