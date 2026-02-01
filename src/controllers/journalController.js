const Journal = require("../models/journal")

/* Creates a user journal entry in the database
* */
exports.createJournal = async (req,res) => {
    try {
        const {text} = req.body;
        if(!text) {
            return res.status(400).json({
                message:"Journal entry cannot be empty"
            })
        }
        const journal = await Journal.create({
            text:text.trim(),
            createdBy:req.user._id,
        })
        return res.status(200).json({
            message:"Journal saved",
            journal
        })
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }
}

/* Get all user journal entries from database
* */
exports.getJournals = async (req,res) => {
    try {
        const journals = await Journal.find({
            createdBy:req.user._id,
        })
            .sort({createdAt:-1});
        return res.status(200).json({journals})
    } catch (err) {
        return res.status(500).json({
            message:"Couldn't load journals"
        })
    }
}

/* Get user journal entry by id from database
* */
exports.getJournalById = async (req,res) => {
    try {
        const journal = await Journal.findOne({
            _id:req.params.id,
            createdBy:req.user._id
        })
        if(!journal) {
            return res.status(404).json({
                message:"Journal not found"
            })
        }
        return res.status(200).json({journal})
    } catch (err) {
        return res.status(500).json({
            message:"Couldn't load journal"
        })
    }
}

/* Delete user journal entry from the database
* */
exports.deleteJournalById = async (req,res) => {
    try {
        const journal = await Journal.findOneAndDelete({
            _id:req.params._id,
            createdBy:req.user._id,
        })
        if(!journal){
            return res.status(400).json({
                message:"Journal not found"
            })
        }
        return res.status(200).json({
            message:"Journal deleted"
        })
    } catch (err) {
        return res.status(500).json({
            message:"Couldn't delete journal"
        })
    }
}
