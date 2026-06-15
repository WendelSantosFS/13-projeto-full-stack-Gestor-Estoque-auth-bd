const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    
    const token = req.cookies.token_seguro;

    if ( !token ) return res.status(401).json({ erro: 'Acesso negado. Faça login.'})
    
    try {
        const dadosDecodificados = jwt.verify(token, process.env.TOKEN_PASSWORD)
        req.usuarioLogado = dadosDecodificados;
        next()
    } catch (error) {
        return res.status(403).json({erro: 'Token inválido ou expirado!'})
    }
}



module.exports = authMiddleware