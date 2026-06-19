const modelsGestorEstoque = require("../models/models-gestor-estoque")

const dotenv = require('dotenv')
dotenv.config( { path: '.env.local'})

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const crontrollerGestorEstoque = {

    login: async (req, res) => {
        const { user, password } = req.body

        if (user.length < 1 || password.length < 1) {
            res.status(400).json('Algum dos campos está vazio!')
        }

        try {
            const resultSQL = await modelsGestorEstoque.verficarUsuario(user)
            const { id, nome, cargo, senha } = resultSQL[0]


            const compareSenha = await bcrypt.compare(password, senha)
            if (!compareSenha) return res.status(400).json('Não foi possível comparar as senhas!')

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
            res.status(400).json( { erro: 'Erro ao efetuar o LOGIN' } )
        }

    },
    dashboardProdutos: async (req, res) => {
        try {
            const { result, diversidade, somaDeItens, itensRecentes, itensAcabando } = await modelsGestorEstoque.dashboardModel()

             res.json({ obj: {
                diversidade: diversidade[0].count,
                totalItens: somaDeItens[0].total,
                recentesItens: itensRecentes,
                recentesQuantidade: itensRecentes.length,

                acabandoItens: itensAcabando,
                acabandoQuantidade: itensAcabando.length
            },  todosProdutos: result })
        } catch (err) {
            res.status(400).json(err)
        }
    },

    buscarItens: async (req, res) => { 
        try {
            const result = await modelsGestorEstoque.produtosModel()
            res.json(result)
        } catch (err) { res.status(400).json('Não foi possível obter os produtos!') }
        
    },

    criarProduto: async (req, res) => {
        const { nome, numberPreco, numberQuantidade, categoria } = req.body

        if (nome.length < 1 || numberPreco == 0 || numberQuantidade < 0 || categoria.length < 1) return res.status(400).json({erro: 'Objeto incompleto'})

        try {
            await modelsGestorEstoque.novoProdutoModel(nome, numberPreco, numberQuantidade, categoria)
            res.json('Produto criado com Sucesso!')
        } catch (err) {
            res.status(400).json('Erro ao criar Produto!')
        }
    },

    deletarProduto: async (req, res) => {
        const { id } = req.body
        if (!id) return res.status(400).json('ID inexistente!')
            
        try {
            await modelsGestorEstoque.deleteProdutoModel(id)
            res.json('Excluído com sucessO!')
        } catch (err) { 
            res.status(400).json('Erro ao deletar!') 
        }
    },

    atualizarProduto: (req, res) => {
        const { id, nome, preco, categoria, quantidade} = req.body

        try {
            modelsGestorEstoque.atualizarProdotoModel( id, nome, preco, categoria, quantidade)
            res.status(201).json('Atualizado com sucesso!')
        } catch (err) { res.status(400).json('Erro ao atualizar!')}
    },

    adminLogin: async (req, res) => {
        const { user, password } = req.body

        try {
            const resultSQL = await modelsGestorEstoque.loginAdmin(user)
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
            }
        } catch (err) { res.status(400).json(err.message)}
    },


    buscarUsuarios: async (req, res) => {
        try {
            const resultSQL = await modelsGestorEstoque.buscarUsuariosModel(req, res)
            res.json(resultSQL)
        } catch (err) { res.status(400).json('Erro ao BUSCAR usuários!')}
    },
    deletarUsuario: async (req, res) => {
        const { id } = req.body
        if (!id) return res.status(400).json('Nenhum ID foi passado como parâmetro!')

        try {
            await modelsGestorEstoque.deletarUsuarioModel(id)
            res.json('Excluído com sucesso!')
        } catch (err) { res.status(400).json('Erro ao tentar Excluir o usuário!')}
    },
    criarUsuario: async (req, res) => {
        const { nome, senha } = req.body
        if (!nome || !senha) return res.status(400).json('Algum dos campos veio VAZIO!')

        if (nome.length < 1 || senha.length < 1) return res.status(400).json('Usuário ou senha está vazio!')
        
        try {
            const allUsers = await modelsGestorEstoque.verficarUsuario( nome )
            if (allUsers[0]) { return res.status(400).json('Usuário já existe!') }
            
            const senhaHash = await bcrypt.hash(senha, 10)
            const cadastrarUser = await modelsGestorEstoque.cadastrarUsuario(nome, senhaHash, cargo = 'user')
            
            res.json('Usuário criado com sucesso!')
        } catch (err) { res.status(400).json('Erro ao CRIAR um usuário!') }

    }
}

module.exports = crontrollerGestorEstoque;