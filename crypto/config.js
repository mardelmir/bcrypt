const crypto = require('node:crypto') // Al ser un módulo nativo de node hay que ponerlo según la documentación
const bcrypt = require('bcrypt')

const secret = crypto.randomBytes(64).toString('hex'); // 64 x 2 = 128 caracteres (por ser hexadecimal)
const hashedSecret = bcrypt.hashSync(secret, 10);

module.exports = hashedSecret 