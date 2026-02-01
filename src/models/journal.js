const mongoose = require("mongoose")

const journalSchema = new mongoose.Schema({
    text:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},  { timestamps: true })

const journal = mongoose.model("Journal",journalSchema);
module.exports = journal;
