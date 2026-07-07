import { Link, Outlet, useNavigate } from "react-router-dom"

export default function Layout() {
    const navegar = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("meu_jwt_token")
        navegar("/login")
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white font-sans">
            
            {/* SIDEBAR (Barra Lateral) */}
            <aside className="w-64 bg-gray-800 flex flex-col shadow-2xl">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-purple-500">Apolo </h2>
                    <p className="text-xs text-gray-400 mt-1">Gestão Integrada</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {/* Usamos o <Link> do react-router no lugar da tag <a> tradicional */}
                    <Link to="/app/dashboard" className="block px-4 py-3 rounded hover:bg-gray-700 transition">
                        📊 Dashboard
                    </Link>
                    <Link to="/app/estoque" className="block px-4 py-3 rounded hover:bg-gray-700 transition">
                        🎸 Estoque
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-700">
                <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded transition">
                    🚪 Sair do Sistema
                </button>
                </div>
            </aside>

            {/* ÁREA PRINCIPAL (Onde o conteúdo das páginas aparece) */}
            <main className="flex-1 overflow-y-auto p-8">
                
                {/* O Outlet é mágico: ele mostra o Dashboard, o Estoque ou o Portfólio dependendo da URL! */}
                <Outlet /> 

            </main>
      
        </div>
    )
}