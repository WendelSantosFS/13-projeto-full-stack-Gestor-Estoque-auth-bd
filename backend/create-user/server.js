const express = require('express')
const db = require('postgres')
const bcrypt = require('bcrypt')
const cors = require('cors')

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
        localHost1, 
        funcao1,
        table
    } = req.body

    const senhaCripto = await bcrypt.hash(password1, 10)



    const connectionString = `postgres://${userSQL1}:${passwordSQL1}@localhost:${localHost1}/${nomeBd1}`
    const sql = db(connectionString)

    const userExists = await sql`SELECT * FROM ${sql(table)} WHERE nome = ${user1}`




    if ( userExists.length > 0 ) { 
        console.log('Usuário já existe')
        res.status(500).json({ message: 'Usuário já EXISTE' })
        await sql.end()
    } 
    else {

        const result = await sql`INSERT INTO ${sql(table)} (nome, senha, cargo) VALUES (${user1}, ${senhaCripto}, ${funcao1}) returning*`

        res.json('User criado!')
        await sql.end()
    }
 
})












const PORT = 3000
app.listen( PORT, () => {
    console.log(`Criador de USER iniciado!  http://localhost:3000`)
})