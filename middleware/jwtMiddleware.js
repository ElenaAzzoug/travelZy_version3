const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function generateToken(id, isAdmin) {
  return jwt.sign(
    {
      id: id,
      isAdmin: isAdmin,
    },
    secret
  )
}

module.exports = generateToken