import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Dashboard from "./View/Dashboard"
import Layout from './View/Layout/index.jsx';
import Admin from "./View/Admin"
import Acessos from './View/Acessos/index.jsx';
import Itens from './View/Itens/index.jsx';
import NovoItem from './View/NovoItem/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
      <Routes>

        <Route path='/' index element={ <App /> } />   // Rota de LOGIN
        
        <Route path='/admin' element={ <Admin />}>  // rota do Administrador
          <Route path='acessos' element={ <Acessos /> }></Route>   // ROTA: /admin/acessos
        </Route>              


        <Route path='/app' element={ <Layout />}>   // Layout do APP
          <Route index element={ <Dashboard /> }/>  // APP

          <Route path='itens' element={ <Itens />} />
          <Route path='novoItem' element={ <NovoItem /> }/>
        </Route>
        


        <Route path='*' element={ <App /> } />    // Serve para REDIRECIONAR o user caso ele coloque pesquise uma ROTA inexistente 

      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
