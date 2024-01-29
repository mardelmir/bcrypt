const crypto = require('crypto')
const bcrypt = require('bcrypt')

const secret = crypto.randomBytes(64).toString('hex'); // OK
const hashedSecret = bcrypt.hashSync(secret, 10);

// Usar bcrypt para añadir salt a las contraseñas de los usuarios

module.exports = hashedSecret 