
const rotasAtivas = ["", "/", "/admin", "/admin/acessos", "/app"]


const authMiddleware = (req, res, next) => {
    console.log('Usuário lido por MIDDLEWARE: ', req.body.user)

    next()
}

module.exports = authMiddleware