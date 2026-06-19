/* Se o navegador começar a BLOQUEAR as requisições, usar o CORS
npm i cors

const cors = require("cors")
app.use(cors({
  origin: "http://localhost:5173"
}))
*/

const cors = require('cors')
const bcrypt = require('bcrypt')
const pg = require('postgres')
const jwt = require('jsonwebtoken')

const express = require('express')
const cookieParser = require('cookie-parser')

// import dotenv from "dotenv"
// let dotenv = require('dotenv')
// dotenv.config( { path: '.env.local'})


// Middlaware - Auth
const authMiddleware = require('./middleware/auth-middleware')
const crontrollerGestorEstoque = require('./controllers/gestorEstoque-Controller')


// Config   String Postgres SQL
const sql = pg(`postgres://postgres:${process.env.PASSWORD_SQL}@localhost:5432/app_gestor_estoque`)




const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())



app.post('/', crontrollerGestorEstoque.login )
app.get('/app', authMiddleware, crontrollerGestorEstoque.dashboardProdutos)
app.get('/itens', authMiddleware, crontrollerGestorEstoque.buscarItens)
app.post('/app/criarProduto', authMiddleware, crontrollerGestorEstoque.criarProduto)
app.delete('/delete', authMiddleware, crontrollerGestorEstoque.deletarProduto)
app.put('/atualizar', authMiddleware, crontrollerGestorEstoque.atualizarProduto)


app.post('/admin', crontrollerGestorEstoque.adminLogin)
app.get('/acessos', authMiddleware, crontrollerGestorEstoque.buscarUsuarios)
app.delete('/admin/delete', authMiddleware, crontrollerGestorEstoque.deletarUsuario)
app.post('/admin/create', authMiddleware, crontrollerGestorEstoque.criarUsuario)


app.post('/logout',  (req, res) => {
  res.clearCookie('token_seguro')
  res.json('logout feito!')
})








const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor iniciado! http://localhost:3000`))