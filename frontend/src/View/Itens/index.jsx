import { useEffect } from 'react'
import styles from './styles.module.css'
import { Link, useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import Links from '../../components/Links'




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
    // const [arrayProducts, setArrayProducts] = useState([])


    // const removeProduct = async () => {

    // }


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

            <div></div>
        </>
    )
}