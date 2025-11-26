const mongo = require("mongoose");
require('dotenv').config({path:`.env`})

async function connectToDatabase () {
    try {
        await mongo.connect(process.env.ATLAS_URI)
        console.log("Connected to Database")
    } catch (err) {
        console.log("Could not connect to DB " , err)
    }
}

connectToDatabase();
