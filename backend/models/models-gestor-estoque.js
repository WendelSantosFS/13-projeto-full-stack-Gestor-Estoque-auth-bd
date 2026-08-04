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

    dashboardModel: async ( userId ) => {
        const result = await sql`SELECT * FROM produtos WHERE user_id = ${userId};` //  
        const diversidade = await sql`SELECT COUNT(id) FROM produtos WHERE user_id = ${userId};`
        const somaDeItens = await sql`SELECT SUM(quantidade) AS total FROM produtos WHERE user_id = ${userId};`
        const itensRecentes = await sql`SELECT * FROM produtos WHERE criado >= NOW() - INTERVAL '10 days' and user_id = ${userId};`
        const itensAcabando = await sql`SELECT * FROM produtos WHERE quantidade < 11 and user_id = ${userId};`
        
        return { result, diversidade, somaDeItens, itensRecentes, itensAcabando }
    },

    produtosModel: async ( userId ) => {
        const result =  await sql`SELECT * FROM produtos WHERE user_id = ${userId};`
        return result;
    },

    novoProdutoModel: async ( nome, preco, quantidade, categoria, user_id ) => {
        return await sql`INSERT INTO produtos(nome, preco, quantidade, categoria, user_id) VALUES (${nome}, ${preco}, ${quantidade}, ${categoria}, ${user_id}) returning*`
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


    buscarUsuariosModel: async () => {
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