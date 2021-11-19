module.exports = {
    handler: (err, req, res, next) => {
      if (!err) return next()
  
      if (err.status) {
        return res.status(err.status).send({ message: err.message })
      }
  
      res.status(500).send({ message: 'I have no idea what happened' })
    }
  }