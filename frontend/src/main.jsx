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

        <Route path='/login'  element={ <App /> } />
        
        <Route path='/admin' element={ <Admin />}></Route>
        <Route path='/admin/acessos' element={ <Acessos /> }></Route>


        <Route path='/' element={ <Layout />}>
          <Route index element={ <Dashboard /> }/>
        </Route>

      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
