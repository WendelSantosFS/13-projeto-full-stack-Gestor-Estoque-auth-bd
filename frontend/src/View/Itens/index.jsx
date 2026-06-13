import { useContext, useEffect } from 'react'
import styles from './styles.module.css'
import { Link, useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import Links from '../../components/Links'


import ProdutoContext from '../../Functions/ProdutoContext'



export default function Itens () {

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

    }, [navigate])

    
    const location = useLocation().pathname
    const bordaLink = location == '/app/itens' ? styles.bordaLink : ''



    const { produtos, setProdutos} = useContext(ProdutoContext)

    async function realoadItens () {
        const response = await fetch('http://localhost:3000/itens', { credentials: 'include' })
        const data = await response.json()
        setProdutos(data)
    }
    realoadItens()



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

            <div>
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
                                    path={`/itens/${item.id}`}
                                    className="btn"
                                />
                                <Links
                                    text={'Deletar'}
                                    path={`/deletar/${item.id}`}
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