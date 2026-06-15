import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Links from '../../components/Links';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';

function Acessos() {

    const [users, setUsers] = useState([])
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')


    const navigate = useNavigate()
    useEffect( () => {
        async function acessGet () {
            const resultFetch = await fetch('http://localhost:3000/acessos', { credentials: 'include'})
            const data = await resultFetch.json()
            
            if (data.erro) return navigate('/admin')

            setUsers(data)
        }
        acessGet()
    }, [navigate])


    async function deleteUser (id) {
        await fetch('http://localhost:3000/admin/delete', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { id })
        })

        const newUsers = users.filter( user => user.id !== id)
        setUsers(newUsers)
    }

    async function reloadUser () {
        const response = await fetch('http://localhost:3000/acessos', {credentials: 'include'})
        const data = await response.json()
        setUsers(data)
    }

    async function addUser () {
        await fetch('http://localhost:3000/admin/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { nome, senha })
        })
        setNome('')
        setSenha('')
        reloadUser()
    }

    async function sairApp () {
        await fetch('http://localhost:3000/logout', { 
            method: 'POST',
            credentials: 'include'
        })
        navigate('/admin')
    }

    return(
        <div className='flex flex-col items-center gap-5'>
            <h3 className={styles.h3Admin}>Painel do ADMIN</h3>
            <Link 
                onClick={ () => sairApp()}
                className={styles.btnSairApp}
            >Sair</Link>


            <div className='flex gap-5 flex-wrap items-center justify-center'>
                <div className={`${styles.cards}`}>
                    <h3>Usuário cadastrados: </h3>

                    <div className='flex flex-col gap-3'>
                        { users.map( (user) => (
                            <div key={user.id} className={`flex align-center ${styles.divRenderView}`}>
                                <p className='flex items-center flex-1'>{user.nome}</p>
                                
                                <button 
                                    className={styles.btnDeleteUser}
                                    onClick={ () => deleteUser(user.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`${styles.cards}`}>
                    <h3>Cadastrar Usuário: </h3>

                    <div className='flex flex-col items-center gap-3'>
                        <Input 
                            type={'text'}
                            placeholder={'Nome: '}
                            required
                            className={`${styles.inputUser} w-full`}

                            value={nome}
                            onChange={ (ev) => setNome(ev.target.value)}
                        />
                        <Input 
                            type={'password'}
                            placeholder={'Senha: '}
                            required
                            className={`${styles.inputUser} w-full`}

                            value={senha}
                            onChange={ (ev) => setSenha(ev.target.value)}
                        />

                        <button 
                            className={styles.btnSaveUser}
                            onClick={() => addUser()}
                        >
                            Salvar Usuário
                        </button>
                    </div>
                    

                </div>
            </div>
            


        </div>
    )
}







export default Acessos;