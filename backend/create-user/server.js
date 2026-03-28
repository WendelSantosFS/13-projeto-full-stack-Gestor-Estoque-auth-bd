import express from 'express'
import db from 'postgres'
import bcrypt from 'bcrypt'

import cors from 'cors'


const app = express()

app.use(cors({
    origin: "http://127.0.0.1:5500"
}))

app.use(express.json())




app.post('/createUser', async (req, res) => {

    const { user1, password1, userSQL1, passwordSQL1 } = req.body
    console.log(user1, password1, userSQL1, passwordSQL1)


    const sql = await db(`postgres://${userSQL1}:${passwordSQL1}@localhost:5432/app_gestor_estoque`)
    const result = await sql`INSERT INTO user_adm (usuario, senha) VALUES (${user1}, ${password1}) returning *`


    console.log(result)
 
    res.json('User criado!')
})












const PORT = 3001
app.listen( PORT, () => {
    console.log(`Criador de USER iniciado!  http://localhost:3001`)
})