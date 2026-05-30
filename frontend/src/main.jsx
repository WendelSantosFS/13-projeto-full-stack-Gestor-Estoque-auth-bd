import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Dashboard from "./View/Dashboard"
import Layout from './View/Layout/index.jsx';
import Admin from "./View/Admin"
import Acessos from './View/Acessos/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
      <Routes>

        <Route path='/login' index element={ <App /> } />   // Rota de LOGIN
        
        <Route path='/admin' element={ <Admin />}></Route>              // rota do Administrador
        <Route path='/admin/acessos' element={ <Acessos /> }></Route>


        <Route path='/app' element={ <Layout />}>   // Layout do APP
          <Route index element={ <Dashboard /> }/>  // APP
        </Route>

      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
