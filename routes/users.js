const express = require('express')
const router = express.Router()

const users = require('../data/users')
const { generateToken, verifyToken } = require('../middlewares/authMiddleware')


router.get('/', (req, res) => {
    const loginForm = `
            <h1>Inicio</h1>
            <form action="/login" method="post" style="line-height: 2em">
                <label for="username">Usuario :</label>
                <input type="text" id="username" name="username" required><br>

                <label for="password">Contraseña :</label>
                <input type="password" id="password" name="password" required><br>

                <p><button type="submit">Iniciar sesión</button></p>
            </form>`;

    const loggedInForm = `
            <h2><a href="/dashboard" style="text-decoration: none">Dashboard</a></h2><br>
            <form action="/logout" method="post">
                <button type="submit">Cerrar sesión</button>
            </form>`

    !req.session.token ? res.send(loginForm) : res.send(loggedInForm)
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username == username && user.password == password)

    if (user) {
        const token = generateToken(user);
        req.session.token = token;
        res.redirect('/dashboard');
    } else {
        res.status(401).send('<h1>Error de autenticación</h1><p>Credenciales incorrectas</p><a href="/"><button>Inicio</button></a>')
    }
})

router.get('/dashboard', verifyToken, (req, res) => {
    const userId = req.user;
    console.log(req.user)
    const user = users.find((user) => user.id === userId);
    const dasboard = `
        <h1>¡Bienvenido ${user.name}!</h1>
            <p><b>ID:</b> ${user.id}</p>
            <p><b>Username:</b> ${user.username}</p>

            <p><a href="/"><button>Inicio</button></a></p>

            <form action="/logout" method="post">
                <button type="submit">Cerrar sesión</button>
            </form>`

    user
        ? res.send(dasboard)
        : res.status(401).send('<h1>Error de autenticación</h1><p>Usuario no encontrado</p><a href="/"><button>Inicio</button></a>');
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.use((req, res) => { res.status(404).send(`<h1>Página no encontrada</h1><a href="/"><button>Inicio</button></a>`) })

module.exports = router