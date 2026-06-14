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
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())




app.post('/', async (req, res) => {
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
app.get('/app', authMiddleware, async (req, res) => {

  const result = await sql`SELECT * FROM produtos;`

  const diversidadeItens = new Set( result.map( (produto) => produto.nome)).size
  const somaDeItens = result.reduce( (acumulador, produto) => {
      return acumulador + produto.quantidade
  }, 0)

  let itensRecentes = []
  result.forEach( (item) => { 
    const data = new Date()
    data.setDate( new Date().getDate() - 10)

    if ( item.criado > data) { itensRecentes.unshift(item) }
  })

  let itensAcabando = []
  result.forEach( (item) => {
    if ( item.quantidade < 11 ) {
      itensAcabando.push(item)
    }
  })
  

  res.json({ obj: {
    diversidade: diversidadeItens,
    totalItens: somaDeItens,
    recentesItens: itensRecentes,
    recentesQuantidade: itensRecentes.length,

    acabandoItens: itensAcabando,
    acabandoQuantidade: itensAcabando.length
  },  todosProdutos: result })
})

app.get('/itens', authMiddleware, async (req, res) => {
  const result = await sql`SELECT * FROM produtos;`

  res.json(result)
})

app.post('/app/criarProduto', authMiddleware, async (req, res) => {
  const { nome, numberQuantidade, numberPreco, categoria } = req.body

  try {
    const insert = await sql`INSERT INTO produtos (nome, preco, categoria, quantidade) VALUES (${nome}, ${numberPreco}, ${categoria}, ${numberQuantidade} )`
    res.json( { message: 'Produto cadastrado!'})
  } catch( err ) {
    console.log(err.message)
  }

  
})


app.delete('/delete', authMiddleware, async (req, res) => {
  const { id } = req.body

  try {
    const result = await sql`DELETE FROM produtos WHERE id = ${id} RETURNING*`
    res.json( { produtoDeletado: result[0] })
  } catch( err ) {
    res.json( { err })
  }
  
})

app.put('/atualizar', authMiddleware, async (req, res) => {
// if not foto   RETURN null
  let { id, nome, numberPreco, foto, categoria, numberQuantidade } = req.body

  try {
    if ( !foto ) { foto = null}
    const result = await sql`UPDATE produtos SET nome = ${nome}, preco = ${numberPreco}, foto = ${foto}, categoria = ${categoria}, alterado = ${new Date()}, quantidade = ${numberQuantidade} WHERE id = ${id}`
    res.json('Atualizado com sucesso!')
  } catch (err) {
    console.log('campos: ', nome, numberPreco, foto, categoria, numberQuantidade)
    console.log(err)
    res.json(err.mesage)
  }
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