import styles from "./style.module.css"

import Links from "../../components/Links";
import Input from "../../components/Input";
import { useContext, useState, useEffect } from "react";
import ProdutoContext from "../../Functions/ProdutoContext";
import { useNavigate, useParams } from "react-router-dom";


function NovoItem () {
    
    const { produtos, setProdutos} = useContext(ProdutoContext)
    const navigate = useNavigate()

    const produtoId = useParams().produtoId

    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState(0)
    const [preco, setPreco] = useState('')
    const [categoria, setCategoria] = useState('')

    let nomeProduto = produtos.find( (p) => p.id == +produtoId).nome


    useEffect( () => {
        function getProduto () {
            const produtoFilter = produtos.find( (p) => p.id == +produtoId)

            setNome(produtoFilter.nome)
            setQuantidade(+produtoFilter.quantidade)
            setPreco(produtoFilter.preco)
            setCategoria(produtoFilter.categoria)
        }
        getProduto()

    }, [])
    


    async function handleUpdateProduto (ev) {
        ev.preventDefault()
        
        const numberPreco = parseFloat(preco)
        const numberQuantidade = parseInt(quantidade)
        const id = parseInt(produtoId)

        const url = 'http://localhost:3000/atualizar'
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({id, nome, numberQuantidade, numberPreco, categoria})
        })
        
        navigate('/app/itens')
        
    }


    return(
        <div>
            <h2>Atualizar o Produto: {nomeProduto}</h2>

            <div className={`${styles.inputsCriarProduto} flex flex-col gap-5 justify-center`}>

                <div className="flex gap-5 justify-center flex-wrap">
                    
                    <form onSubmit={handleUpdateProduto} className={`flex gap-5 flex-wrap justify-center ${styles.formCadastrarProduto}`}>
                        <Input 
                            type={'text'}
                            placeholder={'nome do PRODUTO'}
                            className={styles.input}
                            id={'nome'}
                            name={'nome'}

                            value={nome}
                            onChange={ (ev) => setNome(ev.target.value)}
                        />
                        <Input 
                            type={'number'}
                            placeholder={'Quantidade'}
                            className={styles.input}
                            min={0}
                            id={'quantidade'}
                            name={'quantidade'}

                            value={quantidade}
                            onChange={ (ev) => setQuantidade(ev.target.value) }
                        />
                        <Input 
                            type={'number'}
                            placeholder={'Preço do Produto: '}
                            className={styles.input}
                            min={0}
                            id={'preco'}
                            name={'preco'}

                            step="0.01"
                            value={preco}
                            onChange={ (ev) => setPreco(ev.target.value) }
                        />
                        
                        <Input 
                            type={'text'}
                            placeholder={'Categoria: '}
                            className={styles.input}
                            id={'categoria'}
                            name={'categoria'}

                            value={categoria}
                            onChange={ (ev) => setCategoria(ev.target.value) }
                        />

                        <input type="submit" className="btnStyleDefault" value={'Atualizar !'}/>
                    </form>
                </div>
               

                

            </div>
        </div>
    )
}





export default NovoItem;