import { useContext, useEffect } from 'react'
import styles from './styles.module.css'
import { Link, useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import Links from '../../components/Links'


import ProdutoContext from '../../Functions/ProdutoContext'



export default function Itens () {
    
    const { produtos, setProdutos} = useContext(ProdutoContext)

    const navigate = useNavigate()
    useEffect( () => {
        async function rotaProtegida () {
            const result = await fetch('http://localhost:3000/app', {
                credentials: "include"
            })
            const data = await result.json()

            if (data.erro) { navigate('/') }
        }
        rotaProtegida()

        async function realoadItens () {
            if (produtos !== undefined) {
                const response = await fetch('http://localhost:3000/itens', { credentials: 'include' })
                const data = await response.json()
                setProdutos(data)
            }
        }
        realoadItens()

    }, [navigate])

    
    const location = useLocation().pathname
    const bordaLink = location == '/app/itens' ? styles.bordaLink : ''


    const deleteProduto = async (id) => {
        const response = await fetch('http://localhost:3000/delete', {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { id } )
        })
        const listaProdutos = produtos.filter( (produto) => produto.id !== id)
        setProdutos(listaProdutos)
    }




    return (
        <>
            <h2>Itens no Estoque</h2>

            <div className={`${styles.divMenu} flex gap-5`}>

                <Links
                    path={'/app/itens'}
                    text={'Todos os itens'}
                    className={`${styles.linkMenu} ${bordaLink}`}
                />
                <Links
                    path={'/app/novoItem'}
                    text={'Novo item'}
                    className={`${styles.linkMenu}`}
                />

            </div>

            <div className='flex flex-col gap-2'>
                {
                    produtos.map(  (item) => (
                        <div key={item.id} className='flex justify-between gap-5'>
                            <div className='w-full'>
                                <p>{item.nome}</p>
                            </div>

                            <div className='w-full text-center'>
                                <p>R${item.preco}</p>
                            </div>

                            <div className='w-full text-center'>
                                <p>{item.quantidade}</p>  
                            </div>

                            <div className='flex gap-3'>
                                <Links 
                                    text={'Atualizar'}
                                    path={`/app/atualizar/${item.id}`}
                                    className="btn"
                                />
                                <Links
                                    text={'Deletar'}
                                    onClick={ () => deleteProduto(item.id)}
                                    className="btn"
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}