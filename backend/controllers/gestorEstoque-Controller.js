const modelsGestorEstoque = require("../models/models-gestor-estoque")

const dotenv = require('dotenv')
dotenv.config( { path: '.env.local'})



const crontrollerGestorEstoque = {

    login: (req, res) => {
        const { user, password } = req.body

        if (user.length < 1 || password.length < 1) {
            res.status(500).json('Algum dos campos está vazio!')
        }

        try {
            modelsGestorEstoque.logarUsuario(req, res, user, password)
        } catch (err) {
            console.log('erro no CONTROLLER')
            res.status(400).json( { erro: err })
        }
    },
    buscarProdutos: (req, res) => {
        try {
            modelsGestorEstoque.produtosModel(req, res)
        } catch (err) {
            res.status(400).json(err)
        }
    },

    buscarItens: (req, res) => { modelsGestorEstoque.itensModel(req, res) },

    criarProduto: (req, res) => {
        const { nome, numberPreco, numberQuantidade, categoria } = req.body

        if (nome.length < 1 || numberPreco == 0 || numberQuantidade < 0 || categoria.length < 1) return res.status(400).json({erro: 'Objeto incompleto'})

        try {
            modelsGestorEstoque.novoProdutoModel(nome, numberPreco, numberQuantidade, categoria)
            res.json('Produto criado com Sucesso!')
        } catch (err) {
            res.status(400).json(err)
        }
    },

    deletarProduto: (req, res) => {
        const { id } = req.body
        if (!id) return res.status(400).json('ID inexistente!')
            
        try {
            modelsGestorEstoque.deleteProdutoModel(id)
            res.json('Excluído com sucessO!')
        } catch (err) { 
            res.status(400).json(err.message) 
        }
    },

    atualizarProduto: (req, res) => {
        const { id, nome, preco, categoria, quantidade} = req.body

        try {
            modelsGestorEstoque.atualizarProdotoModel(req, res, id, nome, preco, categoria, quantidade)
            res.status(201).json('Atualizado com sucesso!')
        } catch (err) { res.status(400).json(err.message)}
    },

    adminLogin: (req, res) => {
        const { user, password } = req.body

        try {
            modelsGestorEstoque.loginAdmin(req, res, user, password)
        } catch (err) { res.status(400).json(err.message)}
    },


    buscarUsuarios: (req, res) => {
        try {
            modelsGestorEstoque.buscarUsuariosModel(req, res)
        } catch (err) { res.status(400).json(err.message)}
    },
    deletarUsuario: (req, res) => {
        const { id } = req.body
        if (!id) return res.status(400).json('Nenhum ID foi passado como parâmetro!')

        try {
            modelsGestorEstoque.deletarUsuarioModel(id)
            res.json('Excluído com sucesso!')
        } catch (err) { res.status(400).json(err.message)}
    },
    criarUsuario: (req, res) => {
        const { nome, senha } = req.body
        if (!nome || !senha) return res.status(400).json('Algum dos campos veio VAZIO!')

        if (nome.length < 1 || senha.length < 1) return res.status(400).json('Usuário ou senha está vazio!')
        
        try {
            modelsGestorEstoque.criarUsuarioModel(req, res, nome, senha, cargo = 'user')
        } catch (err) { res.status(400).json(err.message) }

    }
}

module.exports = crontrollerGestorEstoque;