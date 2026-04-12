/* Se o navegador começar a BLOQUEAR as requisições, usar o CORS

npm i cors

const cors = require("cors")
app.use(cors({
  origin: "http://localhost:5173"
}))

*/

// import cors from "cors"
// import express from "express"
// import bcript from "bcrypt";
// import pg from "postgres"


const cors = require('cors')
const express = require('express')
const bcrypt = require('bcrypt')
const pg = require('postgres')



// import dotenv from "dotenv"
let dotenv = require('dotenv')
dotenv.config( { path: '.env.local'})


const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}))


app.use(express.json())


app.post('/login', (req, res) => {
    const { user, password } = req.body // Como estao os nomes no Front-end

    if ( user == process.env.USER_ADMIN && password == process.env.PASSWORD_ADMIN) {
      console.log('senha e user confirmados!')
      res.json( { message: true })
    } else {
      res.json( { message: "user errado!"})
    }

    
})



app.post('/admin', async (req, res) => {

  const { user, password } = req.body

  console.log(user, password)



  const sql = await pg(`postgres://postgres:${process.env.PASSWORD_SQL}@localhost:5432/app_gestor_estoque`)

  const resultSQL = await sql`SELECT * FROM user_adm WHERE nome=${user}`
  const { senha } = await resultSQL[0]



  const comparePassword = await bcrypt.compare(password, senha)




  if (comparePassword) {
    res.status(200).json( { compare: true})
  }

  res.json({ message: 'Ok!', SQL: resultSQL})

})















const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor iniciado! http://localhost:3000`))