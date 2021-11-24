module.exports = (app) => {
    const haiku = require('../controllers/haiku.controller')
    const auth = require('../common/auth')
    
    const router = require("express").Router()

    // get all haikus
    router.get('/', haiku.findAll)

    // get single haiku
    router.get('/:id', haiku.findOne)

    // add new haiku
    router.post('/', auth.check, haiku.createOne)

    // update haiku
    router.put('/:id', auth.check, haiku.updateOne)

    // delete haiku
    router.delete('/:id', auth.check, haiku.deleteOne)

    app.use("/haiku", router)
}
