const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const request = require('request')

module.exports = {
  check: jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  }),

  profile: (req, res, callback) => {
    var options = {
      url: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      headers: {
        'Authorization': req.header('Authorization')
      }
    }

    request(options, callback)
  }
}