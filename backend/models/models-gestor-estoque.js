const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config( { path: '.env.local'})

const postgres = require('postgres')
const sql = postgres(`postgres://postgres:${process.env.PASSWORD_SQL}@localhost:5432/app_gestor_estoque`)




const modelsGestorEstoque = {

    verficarUsuario: async ( user ) => {        
        const resultSQL = await sql`SELECT * FROM users WHERE nome = ${user};`        
        return resultSQL;
    },

    dashboardModel: async (req, res) => {
        const result = await sql`SELECT * FROM produtos;`
        const diversidade = await sql`SELECT COUNT(id) FROM produtos;`
        const somaDeItens = await sql`SELECT SUM(quantidade) AS total FROM produtos;`
        const itensRecentes = await sql`SELECT * FROM produtos WHERE criado >= NOW() - INTERVAL '10 days';`
        const itensAcabando = await sql`SELECT * FROM produtos WHERE quantidade < 11;`
        
        return { result, diversidade, somaDeItens, itensRecentes, itensAcabando }
    },

    produtosModel: async () => {
        const result =  await sql`SELECT * FROM produtos;`
        return result;
    },

    novoProdutoModel: async ( nome, preco, quantidade, categoria) => {
        return await sql`INSERT INTO produtos(nome, preco, quantidade, categoria) VALUES (${nome}, ${preco}, ${quantidade}, ${categoria}) returning*`
    },

    deleteProdutoModel: async (id) => {
        return await sql`DELETE FROM produtos WHERE id = ${id};`
    },

    atualizarProdotoModel: async ( id, nome, preco, categoria, quantidade) => {
        return await sql`UPDATE produtos SET nome = ${nome}, preco = ${preco}, categoria = ${categoria}, alterado = ${new Date()}, quantidade = ${quantidade} WHERE id = ${id} RETURNING*`
    },

    
    loginAdmin: async ( user ) => {
        const resultSQL = await sql`SELECT * FROM admins WHERE nome=${user}`
        return resultSQL;
    },


    buscarUsuariosModel: async (req, res) => {
        const users = await sql`SELECT id, nome, cargo FROM users;`
        return users;        
    },
    deletarUsuarioModel: async (id) => {
       return await sql`DELETE FROM users WHERE id = ${id}`
    },


    verificarUsuario: async ( nome ) => {
        const allUsers = await sql`SELECT * FROM users WHERE nome = ${nome}`
        return allUsers;
    },
    cadastrarUsuario: async (nome, senhaHash, cargo) => {
        const result = await sql`INSERT INTO users(nome, senha, cargo) VALUES (${nome}, ${senhaHash}, ${cargo});`
        return result;
    }
}

module.exports = modelsGestorEstoque;