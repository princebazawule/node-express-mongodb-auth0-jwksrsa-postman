require('dotenv').config()

const app = require('./app')
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})
