const jwt = require('jsonwebtoken')
const hashedSecret = require('../crypto/config')

const generateToken = (user) => jwt.sign({ user: user.id }, hashedSecret, { expiresIn: '1h' })

const verifyToken = (req, res, next) => {
    const token = req.session.token;
    
    !token
        ? res.status(401).send('<h1>Error de autenticación</h1><p>Token no generado</p><a href="/"><button>Inicio</button></a>')
        : jwt.verify(token, hashedSecret, (err, decoded) => {
            err
                ? res.status(401).send('<h1>Error de autenticación</h1><p>Token inválido</p><a href="/"><button>Inicio</button></a>')
                : (req.user = decoded.user)
        })

    next();
}

module.exports = { generateToken, verifyToken }