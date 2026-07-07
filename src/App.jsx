import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './pages/layout'
import Estoque from './pages/Estoque'
import NovoProduto from './pages/NovoProduto'
import DetalhesProduto from './pages/DetalhesProdutos'
import EditarProduto from './pages/EditarProduto'
import RotaProtegida from './components/RotaProtegida'

function App() {

  return(
    <AppProvider>
      <BrowserRouter>
        {/* Routes é a área onde as trocas de tela vão acontecer */}
        <Routes>
          {/* Rota raiz: Redireciona para o login */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Rota 1: Tela de Login */}
          <Route path="/login" element={<Login />} />
          
          {/* ROTA PAI: O layout*/}
          <Route 
            path="/app" 
            element={
              <RotaProtegida>
                <Layout />
              </RotaProtegida> 
            } 
          >
            {/* ROTAS FILHAS: Ficam dentro do <Outlet /> do Layout */}
            <Route path="dashboard" element={<Dashboard />} />
            {/* Rota de estoque */}
            <Route path="estoque" element={<Estoque />} />
            {/* Rota de cadastro de novo produto */}
            <Route path="estoque/novo" element={<NovoProduto />} />
            {/* Rota de detalhes do produto */}
            <Route path="estoque/:id" element={<DetalhesProduto />} />
            {/* Rota de edição do produto */}
            <Route path="estoque/:id/editar" element={<EditarProduto />} />
          </Route>
          
          {/* Rota 3: Fallback (Redireciona qualquer Rota não encontrada para o Login) */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
