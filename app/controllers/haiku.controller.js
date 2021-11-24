const db = require("../models")
const Haiku = db.Haiku
const auth = require('../common/auth')

// setup pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 10
  const offset = page ? page * limit : 0

  return { limit, offset }
}

  // haiku findAll
  exports.findAll = (req, res) => {
    const { page, size, author, _order } = req.query
    let condition = author ? { author: { $regex: new RegExp(author), $options: "i" } } : {}
    const { limit, offset } = getPagination(page, size)

    Haiku.paginate(condition, { offset, limit, sort:{ "createdAt": _order} })
      .then((data) => {
        res.send(
          {
            totalItems: data.totalDocs,
            haikus: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
          }
        )
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error getting Haiku.",
        })
      })
  },

  // haiku findOne
  exports.findOne = (req, res) => {
    const id = req.params.id
    Haiku.findById({_id: id}, (err, haiku) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting haiku.',
          error: err
        })
      }
      if (!haiku) {
        return res.status(404).json({
          message: 'No such haiku'
        })
      }

      res.status(200).send(haiku)
    })
  },

  // crate haiku
  exports.createOne = (req, res) => {
    auth.profile(req, res, (err, result, profile) => {
      if (err || result.statusCode !== 200) throw Error('Can\'t get profile.')

      profile = JSON.parse(profile)

      const haiku = new Haiku({
        line1 : req.body.line1,
        line2 : req.body.line2,
        line3 : req.body.line3,
        author : profile.email
      })

      haiku.save((err, haiku) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when creating haiku',
            error: err
          })
        }

        return res.status(201).json(haiku)
      })
    })
  },

  // haiku update
  exports.updateOne = (req, res) => {
    auth.profile(req, res, (err, result, profile) => {
      if (err || result.statusCode !== 200) throw Error('Can\'t get profile.')

      profile = JSON.parse(profile)

      const id = req.params.id
      Haiku.findOne({_id: id, author: profile.email}, (err, haiku) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when getting haiku',
            error: err
          })
        }
        if (!haiku) {
          return res.status(404).json({
            message: 'No such haiku'
          })
        }

        haiku.line1 = req.body.line1 ? req.body.line1 : haiku.line1
        haiku.line2 = req.body.line2 ? req.body.line2 : haiku.line2
        haiku.line3 = req.body.line3 ? req.body.line3 : haiku.line3

        haiku.save((err, haiku) => {
          if (err) {
            return res.status(500).json({
              message: 'Error when updating haiku.',
              error: err
            })
          }

          return res.json(haiku)
        })
      })
    })
  },

  // haiku deleteOne
  exports.deleteOne = (req, res) => {
    auth.profile(req, res, (err, result, profile) => {
      if (err || result.statusCode !== 200) throw Error('Can\'t get profile.')

      profile = JSON.parse(profile)

      const id = req.params.id
      Haiku.findOne({_id: id, author: profile.email}, (err, haiku) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when getting haiku',
            error: err
          })
        }
        if (!haiku) {
          return res.status(404).json({
            message: 'No such haiku'
          })
        }

        Haiku.remove({_id: id, author: profile.email}, (err) => {
          if (err) {
            return res.status(500).json({
              message: 'Error when deleting the haiku.',
              error: err
            })
          }
          return res.status(204).json()
        })
      })
    })
  }
