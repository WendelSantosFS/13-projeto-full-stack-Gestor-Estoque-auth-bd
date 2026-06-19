const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config( { path: '.env.local'})

const postgres = require('postgres')
const sql = postgres(`postgres://postgres:${process.env.PASSWORD_SQL}@localhost:5432/app_gestor_estoque`)




const modelsGestorEstoque = {

    logarUsuario: async (req, res, user, password ) => {
        console.log('Entrou no Models, LOGAR User')
        
        const result = await sql`SELECT * FROM users WHERE nome = ${user};`
        
        if (result.length === 0) {
            return res.status(404).json('Nenhum usuário encontrado!')
        }
        const { id, senha, nome, cargo } = result[0]
        console.log(id, senha, nome, cargo)

        const compareSenha = await bcrypt.compare(password, senha)
        if (!compareSenha) { 
            return new Error('Senha errada!')
        }

        try {
            const dados = { id, nome, cargo }

            const token = jwt.sign(dados, process.env.TOKEN_PASSWORD, {
                expiresIn: '1h'
            })

            res.cookie('token_seguro', token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 3600000
            })

            res.json( { message: true })
        } catch (err) {
            res.status(400).json( { erro: err } )
        }
    },

    produtosModel: async (req, res) => {
        const result = await sql`SELECT * FROM produtos;`
        const diversidade = await sql`SELECT COUNT(id) FROM produtos;`
        const somaDeItens = await sql`SELECT SUM(quantidade) AS total FROM produtos;`
        const itensRecentes = await sql`SELECT * FROM produtos WHERE criado >= NOW() - INTERVAL '10 days';`
        const itensAcabando = await sql`SELECT * FROM produtos WHERE quantidade < 11;`
        

        res.json({ obj: {
            diversidade: diversidade[0].count,
            totalItens: somaDeItens[0].total,
            recentesItens: itensRecentes,
            recentesQuantidade: itensRecentes.length,

            acabandoItens: itensAcabando,
            acabandoQuantidade: itensAcabando.length
        },  todosProdutos: result })
    },

    itensModel: async (req, res) => {
        try {
            const result = await sql`SELECT * FROM produtos;`
        } catch (err) {
            res.json(err)
        }
    },

    novoProdutoModel: async ( nome, preco, quantidade, categoria) => {
        await sql`INSERT INTO produtos(nome, preco, quantidade, categoria) VALUES (${nome}, ${preco}, ${quantidade}, ${categoria}) returning*`
    },

    deleteProdutoModel: async (id) => {
        await sql`DELETE FROM produtos WHERE id = ${id};`
    },

    atualizarProdotoModel: async (req, res, id, nome, preco, categoria, quantidade) => {
        await sql`UPDATE produtos SET nome = ${nome}, preco = ${preco}, categoria = ${categoria}, alterado = ${new Date()}, quantidade = ${quantidade} WHERE id = ${id} RETURNING*`
    },

    
    loginAdmin: async (req, res, user, password) => {

        const resultSQL = await sql`SELECT * FROM admins WHERE nome=${user}`
        if (resultSQL.length < 1) return res.status(400).json('Usuário ou senha Invalidos.')
    

        const { id, nome, senha, cargo } = resultSQL[0]

        const comparePassword = await bcrypt.compare(password, senha)

        if ( comparePassword ) {
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

            res.json( { message: true } ) 
        } else {
            res.status(400).json( { message: "user errado!"})
        }
    },


    buscarUsuariosModel: async (req, res) => {
        const users = await sql`SELECT id, nome, cargo FROM users;`
        if (users.length < 1) return res.status(400).json('Nenhum usuário encontrado!')
        
        res.json(users)
    },
    deletarUsuarioModel: async (id) => {
        await sql`DELETE FROM users WHERE id = ${id}`
    },

    criarUsuarioModel: async (req, res, nome, senha, cargo) => {

        const allUsers = await sql`SELECT * FROM users WHERE nome = ${nome}`
        if (allUsers[0]) { return res.status(400).json('Usuário já existe!') }
        

        const senhaHash = await bcrypt.hash(senha, 10)
        const result = await sql`INSERT INTO users(nome, senha, cargo) VALUES (${nome}, ${senhaHash}, ${cargo});`
    }
}

module.exports = modelsGestorEstoque;