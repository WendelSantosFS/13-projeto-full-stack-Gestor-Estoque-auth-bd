import { useState } from 'react'
import './App.css';
import { useNavigate } from 'react-router-dom';



function App() {

  const navigate = useNavigate()

  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (user.length < 1 || password.length < 1) {
      console.log("User ou password está vazio!")
    } else {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
          user, password
        }
      )
      })

      const data = await response.json()

      if (data.message == true) {
        navigate("/")
      }
    }
  }


  return (
    <main className='flex justify-center mb-2'>
      
      <div className='divPrincipal flex flex-col gap-5'>
        <h1 className='textoPrincipal'>Gestor de Estoque</h1>

        
        <form className='flex flex-col gap-1 justify-center' onSubmit={handleSubmit} autoComplete='off'>
          <div className='flex flex-col'>
            <label htmlFor="user">Usuário: </label>
            <input type="text" name="user" id="user" value={user} onChange={ (ev) => { setUser(ev.target.value)} }/><br />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password">Senha: </label>
            <input type="password" name="password" id="password" value={password} onChange={ (ev) => setPassword(ev.target.value)}/>
          </div>
          
          <input type="submit" value="Enviar" />

        </form>

      </div>
        
        


    </main>
  )
}

export default App
