import { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";



function Admin () {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate('')



    async function submitAdmin (ev) {
        ev.preventDefault()

        console.log(`User buscado! \n ${user}\n, ${password}\n Front-END`)


        // Para melhores práticas de PROGRAMAÇÃO, fazer uma função que recebe (url, user, password) e retorna true or false para LOGIN
        const result = await fetch('http://localhost:3000/admin', {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { user, password})
        })

        console.log(result)
        const newResult = await result.json()
        console.log('\n\n Retorno NEWRESULT: \n', newResult, '\n\n', newResult.SQL)


        if (newResult.compare) {
            navigate('/admin/acessos')
        }

    }

    return(
        <div className="">
        
            <form className={`flex flex-col justify-center items-center gap-2 ${styles.formAdmin}`} onSubmit={submitAdmin} autoComplete="off">
                
                <input type="text" 
                    placeholder="User"
                    required
                    value={user}
                    onChange={ (ev) => setUser(ev.target.value)}
                name="userAdmin" id="userAdmin"
                />

                <input type="password" 
                    placeholder="Password"
                    value={password}
                    required
                    onChange={ (ev) => setPassword(ev.target.value)}
                name="passwordAdmin" id="passwordAdmin" />

                <input type="submit" value="Entrar"/>
            </form>

        </div>
    )

}





export default Admin;