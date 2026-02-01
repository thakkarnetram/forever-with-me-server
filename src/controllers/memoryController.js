const Memory = require("../models/memory");

/* Creates a user memory in the database
 * */
exports.createMemory = async (req,res) => {
    try {
        const {text,imageUrl,memoryDate,reminderDate,specialNote} = req.body;
        if(!text || !text.trim()) {
            return res.status(400).json({
                message:"What would you like to remember?"
            })
        }
        const memory = await Memory.create({
            text:text.trim(),
            imageUrl,
            memoryDate,
            reminderDate,
            specialNote,
            createdBy:req.user._id
        })
        return res.status(200).json({
            message:"Saved. It stays here",
            memory,
        })
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

/* Gets all the user memories from the database
* */
exports.getMemories = async (req,res) => {
    try {
        const memories = await Memory.find({
            createdBy:req.user._id
        })
            .sort({createdAt:1})
        return res.status(200).json({memories})
    } catch (err) {
        return res.status(500).json({
            message:"Couldn't load memories "
        })
    }
}

/* Gets user memory by memory id
* */
exports.getMemoryById = async (req,res) => {
    try {
        const memory = await Memory.findOne({
            _id:req.params.id,
            createdBy:req.user._id,
        })
        if(!memory) {
            return res.status(404).json({
                message:"This memory isn't here"
            })
        }
        return res.status(200).json({memory})
    } catch (err) {
        return res.status(500).json({
            message:"Couldn't open this memory."
        })
    }
}

/* Deletes the user memory by id
* */
exports.deleteMemory = async (req,res) => {
    try {
        const memory = await Memory.findOneAndDelete({
            _id:req.params.id,
            createdBy:req.user._id
        })
        if(!memory) {
            return res.status(404).json({
                message:"This memory isn't here"
            })
        }
        return res.status(200).json({
            message:"The memory was removed"
        })
    } catch (err) {
        return res.status(500).json({
            message:"Couldn't remove memory"
        })
    }
}
