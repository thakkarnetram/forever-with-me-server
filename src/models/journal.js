const mongoose = require("mongoose")
const {encrypt, decrypt} = require("../utils/crypto");

const journalSchema = new mongoose.Schema({
    text:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},  { timestamps: true })

// this triggers on every create request of a new entry
journalSchema.pre("save",function (next) {
    if(this.isModified("text") && this.text) {
        this.text = encrypt(this.text)
    }
    next()
})

// triggers everytime we send a journal obj in return
journalSchema.methods.toJSON = function () {
    const obj = this.toObject()
    if(obj.text) {
        obj.text = decrypt(obj.text)
    }
    return obj
}

const journal = mongoose.model("Journal",journalSchema);
module.exports = journal;
