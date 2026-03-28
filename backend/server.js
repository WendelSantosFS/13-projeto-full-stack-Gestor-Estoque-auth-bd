/* Se o navegador começar a BLOQUEAR as requisições, usar o CORS

npm i cors

const cors = require("cors")
app.use(cors({
  origin: "http://localhost:5173"
}))

*/

import cors from "cors"
import express from "express"


import dotenv from "dotenv"
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














const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor iniciado! http://localhost:3000`))