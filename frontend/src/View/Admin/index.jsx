import { useState } from "react";
import "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form";



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
            body: JSON.stringify( { user, password} )
        })

        console.log(result)
        const newResult = await result.json()
        console.log('\n\n Retorno NEWRESULT: \n', newResult, '\n\n', newResult.SQL)


        if (newResult.compare) {
            navigate('/admin/acessos')
        }

    }

    return<Form 
        user={user}
        setUser={setUser}
        password={password}
        setPassword={setPassword}

        submitAdmin={submitAdmin}
    />

}





export default Admin;