// app.js
const express = require('express')
const cors = require("cors")
const morgan = require('morgan')
const err = require('./app/common/err')

const indexRouter = require('./app/routes/index')

// create express app
const app = express()

// logging
app.use(morgan("dev"))

// use cors
let corsOptions = {
  origin: "http://localhost:8081",
}
app.use(cors(corsOptions))

// parse requests content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse requests of content-type: application/json
app.use(express.json())

// mongodb connection
const db = require("./app/models")
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!")
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err)
    process.exit()
  })

// routes
app.use('/', indexRouter)
app.use('/haiku', require('./app/routes/haiku.routes'))

// middleware
app.use(err.handler)

// initial route
app.get('/api', (req, res) => {
    res.status(200).send("welcome to the haiku app")
})

module.exports = app
