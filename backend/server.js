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
let dotenv = require('dotenv')
dotenv.config( { path: '.env.local'})


// Middlaware - Auth
const authMiddleware = require('./middleware/auth-middleware')


// Config   String Postgres SQL
const sql = pg(`postgres://postgres:${process.env.PASSWORD_SQL}@localhost:5432/app_gestor_estoque`)



const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(cookieParser())




app.post('/login', async (req, res) => {
    const { user, password } = req.body // Como estao os nomes no Front-end

    const resultUser = await sql`SELECT * FROM users WHERE nome = ${user}`
    const { id, senha, nome, cargo } = resultUser[0]

    const compareSenha = await bcrypt.compare(password, senha)

    if ( compareSenha ) {
      const dados = {
        id,
        nome,
        cargo,
      }

      const token = jwt.sign(dados, process.env.TOKEN_PASSWORD, {
        expiresIn: '1h'
      })

      res.cookie('token_seguro', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 3600000
      })

      res.json( { "message": true }) 
    } 
    else {
      res.json( { message: "user errado!"})
    }

    
})
app.get('/app', authMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo ao sistema: ', nome: req.usuarioLogado.nome})
})


app.post('/admin', async (req, res) => {

  const { user, password } = req.body

  const resultSQL = await sql`SELECT * FROM admins WHERE nome=${user}`
  console.log('RESULT SQL = ', resultSQL)
  const { senha } = await resultSQL[0]
  console.log('SENHA resultSQL= ', senha)



  const comparePassword = await bcrypt.compare(password, senha)
  console.log('CONSOLE.LOG() COMPARE: ', comparePassword)



  if (comparePassword) {
    res.status(200).json( { compare: true})
  }

  res.json({ message: 'Ok!', SQL: resultSQL})
})
app.get('/admin/acessos', authMiddleware, async (req, res) => { // SEM NADA
  res.json('ROTA ATUAL: /admin/acessos')
})














const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor iniciado! http://localhost:3000`))