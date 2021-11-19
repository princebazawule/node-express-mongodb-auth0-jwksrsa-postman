const express = require('express')
const router = express.Router()
const haikuController = require('../controllers/haiku.controller')
const auth = require('../common/auth')

// get all haikus
router.get('/', haikuController.list)

// get single haiku
router.get('/:id', haikuController.show)

// add new haiku
router.post('/', auth.check, haikuController.create)

// update haiku
router.put('/:id', auth.check, haikuController.update)

// delete haiku
router.delete('/:id', auth.check, haikuController.remove)

module.exports = router
