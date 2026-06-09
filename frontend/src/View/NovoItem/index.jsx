import { useLocation } from "react-router-dom";
import styles from "./style.module.css"

import Links from "../../components/Links";
import Input from "../../components/Input";
import { useState } from "react";


function NovoItem () {

    const location = useLocation().pathname
    const bordaLink = location == '/app/novoItem' ? styles.bordaLink : ''
    
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState(0)
    const [preco, setPreco] = useState('')
    const [categoria, setCategoria] = useState('')


    async function handleSubmitProduto (ev) {
        ev.preventDefault()
        
        const numberPreco = parseFloat(preco)
        const numberQuantidade = parseInt(quantidade)

        const url = 'http://localhost:3000/app/criarProduto'
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({nome, numberQuantidade, numberPreco, categoria})
        })
        const data = await response.json()
        console.log(data)

        setNome('')
        setQuantidade(0)
        setPreco('')
        setCategoria('')
    }



    return(
        <div>
            <h2>Novo item</h2>
            
            <div className={`${styles.divMenu} flex gap-5`}>
                <Links
                    path={'/app/itens'}
                    text={'Todos os itens'}
                    className={`${styles.linkMenu}`}
                />
                <Links
                    path={'/app/novoItem'}
                    text={'Novo item'}
                    className={`${styles.linkMenu} ${bordaLink}`}
                />  
            </div>

            <div className={`${styles.inputsCriarProduto} flex flex-col gap-5 justify-center`}>

                <div className="flex gap-5 justify-center flex-wrap">
                    
                    <form onSubmit={handleSubmitProduto} className={`flex gap-5 flex-wrap justify-center ${styles.formCadastrarProduto}`}>
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

                        <input type="submit" className="btnStyleDefault" value={'Cadastrar Produto!'}/>
                    </form>
                </div>
               

                

            </div>
        </div>
    )
}





export default NovoItem;


/*
  <textarea 
        className={`${styles.textArea} `} 
        placeholder="Descrição do Produto" 
        id={'descricao'}
        name={'descricao'}

        rows={5}
        value={descricao}
        onChange={ (ev) => setDescricao(ev.target.value)}
    />
*/