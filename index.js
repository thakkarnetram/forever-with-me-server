const express = require("express");
const body_parser = require("body-parser")
const cors = require("cors")
const mongo = require('./src/utils/mongoConnection')
const authRouter = require('./src/routers/authRouter')
const memoryRouter = require('./src/routers/memoryRouter')
const journalRouter = require("./src/routers/journalRouter")

const app = express();
app.use(body_parser.json())
app.use(cors())

// routers
app.use('/',authRouter)
app.use('/',memoryRouter)
app.use('/',journalRouter)

const PORT = process.env.PORT || 8082
app.listen(PORT,()=>{
    console.log(`Server is running on PORT -> ${PORT}`)
})
