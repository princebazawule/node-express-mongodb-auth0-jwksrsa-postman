// routes/index.js
const express = require('express')
const hal = require('hal')
const router = express.Router()

/* GET root */
router.get('/', (req, res, next) => {
  res.json(new hal.Resource({}, '/'))
})

module.exports = router