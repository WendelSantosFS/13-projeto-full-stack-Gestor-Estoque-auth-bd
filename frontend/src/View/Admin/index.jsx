import { useState } from "react";
import "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form";



function Admin () {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()



    async function submitAdmin (ev) {
        ev.preventDefault()

        const result = await fetch('http://localhost:3000/admin', {
            credentials: 'include',
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { user, password} )
        })

        const { message } = await result.json()

        if ( message === true) {
            navigate('/acessos')
        }

    }

    return(
        <div className="flex flex-col justify-center items-center h-screen gap-5">
            <h2>Tela de Administrador</h2>
            <Form 
                user={user}
                setUser={setUser}
                password={password}
                setPassword={setPassword}

                submitAdmin={submitAdmin}
            />
        </div>
    )
    
   

}





export default Admin;