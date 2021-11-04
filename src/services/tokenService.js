const jwt = require('jsonwebtoken')
const config = require(__dirname + '/../config/config').development;

exports.generateToken = authenticatedUser => {
    const { id, email, roleId } = authenticatedUser
   return jwt.sign({
        id,
        email,
        roleId,
    }, config.secret,
    {expiresIn: '1 day'})
}
exports.decryptToken = token => {
    return jwt.verify(token, config.secret)
}