import { useState } from 'react'
import './App.css';
import { useNavigate } from 'react-router-dom';
import Form from './components/form';



function App() {

  const navigate = useNavigate()

  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()

    setUser('')
    setPassword('')

    if (user.length < 1 || password.length < 1) {
      console.log("User ou password está vazio!")
    } else {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( { user, password })
      })
      const data = await response.json()
      console.log(data)

      

      const message = data.message
      if ( message ) {
        navigate("/app")
      }
    }
  }

  return (
    <main>
      
      <div className='flex flex-col items-center justify-center gap-5 h-screen'>
        <h1 className='textoPrincipal'>Gestor de Estoque</h1>

        
        <Form
          user={user}
          setUser={setUser}
          password={password}
          setPassword={setPassword}

          submitAdmin={handleSubmit}
        />

      </div>
        
        


    </main>
  )
}

export default App
