const { decryptToken } = require("../services/tokenService")

const tokenExists = (req, res, next) => {
     const token = req.header("Authorization")?.split(" ")[1]
    if (token) {
        req.data = decryptToken(token)
        next()
    } else res.status(400).json("Missing token")
}

module.exports = {
    tokenExists
}