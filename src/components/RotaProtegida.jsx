import { Navigate } from "react-router-dom"

export default function RotaProtegida({children}) {
    // 1. Puxando o token do localStorage
    const token = localStorage.getItem("meu_jwt_token");
    
    // 2. Se não tiver token, redireciona para a página de login
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    return children;
}