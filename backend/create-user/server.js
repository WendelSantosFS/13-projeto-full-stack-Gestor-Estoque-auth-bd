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

    const { 
        user1, 
        password1, 
        userSQL1, 
        passwordSQL1,
        nomeBd1, 
        chave,   // KEY para Criptografia
        localHost1, 
        funcao1              
    } = req.body

    
    const senhaCripto = await bcrypt.hash(password1, 10)



    const sql = await db(`postgres://${userSQL1}:${passwordSQL1}@localhost:${localHost1}/${nomeBd1}`)

    const nomeExisteSQL = await sql`SELECT * from user_adm WHERE nome = ${user1}`
    console.log('CONSULTA leve:   888 ', nomeExisteSQL)

    if ( nomeExisteSQL.length > 0 ) { 
        
        
        console.log('Usuário já existe')

    } else {

        const result = await sql`INSERT INTO user_adm (nome, senha, cargo) VALUES (${user1}, ${senhaCripto}, ${funcao1}) returning*`
        // CARGO == FUNCAO

        
        console.log(result)


        res.json('User criado!')
    }
 
})












const PORT = 3001
app.listen( PORT, () => {
    console.log(`Criador de USER iniciado!  http://localhost:3001`)
})