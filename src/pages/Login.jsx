import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Login() {
  // 1. Nossos estados controlados para capturar a digitação
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState(null)

  // Instanciando o hook de navegação
  const navegar = useNavigate()

  // 2. Função que simula o clique do botão "Entrar"
  const handleLogin = (evento) => {
    // Previne que a página recarregue ao enviar o formulário
    evento.preventDefault()
    setErro(null)

    // 1. AS NOSSAS CREDENCIAIS SECRETAS (Hardcoded)
    const EMAIL_CORRETO = "admin@apolo.com";
    const SENHA_CORRETA = "clavedesol123"

    if (email === EMAIL_CORRETO && senha === SENHA_CORRETA) {
      // Criamos um token fictício
      const tokenFalso = "bW9jay1qd3QtdG9rZW4tZm9yLWFwb2xvLTIwMjY=";
      
      // INJETAMOS A CHAVE NO NAVEGADOR
      localStorage.setItem("meu_jwt_token", tokenFalso);
      navegar("/app/dashboard")
    } else {
      // 3. Se o login falhar, exibe uma mensagem de erro
      setErro("E-mail ou senha incorretos. Tente novamente.")
    }
    
  };

  return (
    // Fundo da tela inteira (min-h-screen), centralizando o conteúdo com Flexbox
    <div className="min-h-screen flex items-center justify-center bg-gray-900 font-sans">
      
      {/* O "Card" do formulário */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Apolo</h1>
          <p className="text-gray-400">Plataforma de Gestão</p>
        </div>

        {/* Caixa de Erro */}
        {erro && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded mb-4 text-sm text-center">
            {erro}
          </div>
        )}

        {/* O Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Campo de E-mail */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="contato@selomusical.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Campo de Senha */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Botão de Entrar */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition-colors mt-4 shadow-lg shadow-purple-500/30"
          >
            Entrar no Sistema
          </button>

        </form>

      </div>
    </div>
  );
}