import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Dashboard from "./View/Dashboard"
import Layout from './View/Layout/index.jsx';
import Admin from "./View/Admin"
import Acessos from './View/Acessos';
import Itens from './View/Itens/index.jsx';
import NovoItem from './View/NovoItem/index.jsx';
import AtualizarProduto from "./View/Atualizar"

import ProdutoProvider from './Functions/ProdutoProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <ProdutoProvider>
      <Routes>

        
        <Route path='/admin' element={ <Admin />}></Route>          
        <Route path='/acessos' index element={ <Acessos /> }></Route> // ROTA: /admin/acessos


        <Route path='/' index element={ <App /> } />   // Rota de LOGIN
        
        <Route path='/app' element={ <Layout />}>   // Layout do APP
          <Route index element={ <Dashboard /> }/>  // APP

          <Route path='itens' element={ <Itens />} />
          <Route path='novoItem' element={ <NovoItem /> }/>

          <Route path='atualizar/:produtoId' element={ <AtualizarProduto />}/>
        </Route>        


        <Route path='*' element={ <App /> } />    // Serve para REDIRECIONAR o user caso ele coloque pesquise uma ROTA inexistente 

      </Routes>

      </ProdutoProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
