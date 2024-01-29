const hashedSecret = require('../crypto/config')

const generateToken = (user) => jwt.sign({ user: user.id }, hashedSecret, { expiresIn: '1h' })

const verifyToken = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(401).send('<h1>Error de autenticación</h1><p>Token no generado</p><a href="/"><button>Inicio</button></a>')
    } else {
        jwt.verify(token, hashedSecret, (err, decoded) => {
            err
                ? res.status(401).send('<h1>Error de autenticación</h1><p>Token inválido</p><a href="/"><button>Inicio</button></a>')
                : (req.user = decoded.user)
        });
    }

    next();
}

module.exports = { generateToken, verifyToken }



// function generateToken(user) {
//     return jwt.sign({ user: user.id }, hashedSecret, { expiresIn: '1h' });
// }

// function verifyToken(req, res, next) {
//     const token = req.session.token;

//     if (!token) {
//         return res.status(401).json({ mensaje: 'Token no generado' });
//     } else {
//         jwt.verify(token, hashedSecret, (err, decoded) => {
//             err ? res.status(401).json({ mensaje: 'Token es inválido' }) : (req.user = decoded.user)
//         });
//     }

//     next();
// }