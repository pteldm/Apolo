import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function NovoProduto() {
  const { estoque, setEstoque } = useContext(AppContext);
  const navegar = useNavigate();

  // Estados do Formulário
  const [tipo, setTipo] = useState(""); // "CD" ou "Camiseta"
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  
  // Campos específicos
  const [tamanho, setTamanho] = useState("M");
  const [genero, setGenero] = useState("");

  // Validação reativa (MUST-05: Bloqueio do envio)
  const isValido = () => {
    if (!tipo || !nome || !preco || !quantidade) return false;
    if (tipo === "CD" && !genero) return false;
    if (tipo === "Camiseta" && !tamanho) return false;
    return true;
  };

  const salvarProduto = (evento) => {
    evento.preventDefault();
    
    const novoProduto = {
      id: Date.now(),
      tipo,
      nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
      ...(tipo === "CD" ? { genero } : { tamanho })
    };

    setEstoque([...estoque, novoProduto]);
    navegar("/app/estoque"); // Retorna para a lista após salvar
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-white">Cadastrar Novo Item</h1>
        <p className="text-gray-400 mt-1">Adicione produtos ao inventário do Apolo.</p>
      </header>

      <form onSubmit={salvarProduto} className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 space-y-6">
        
        {/* Bloco 1: Informações Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm font-semibold mb-2">Nome do Produto</label>
            <input 
              value={nome} 
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none" 
              placeholder="Ex: Camiseta Iron Maiden ou CD Master of Puppets" 
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Preço (R$)</label>
            <input 
              type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Quantidade Inicial</label>
            <input 
              type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none" 
            />
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* Bloco 2: Seleção de Categoria e Renderização Condicional (MUST-05)*/}
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">Categoria do Produto</label>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none mb-4"
          >
            <option value="">Selecione...</option>
            <option value="CD">💿 Mídia Física (CD/Vinil)</option>
            <option value="Vestuário">👕 Vestuário</option>
            <option value="Instrumento">🎸 Instrumento Musical</option>
            <option value="Acessório">🎛️ Acessório</option>
          </select>

          {/* Campos dinâmicos para CD */}
          {tipo === "CD" && (
            <div className="animate-fade-in p-4 bg-gray-900 rounded border border-gray-700">
              <label className="block text-gray-300 text-sm font-semibold mb-2">Gênero Musical</label>
              <input 
                value={genero} onChange={(e) => setGenero(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 outline-none" 
                placeholder="Ex: Thrash Metal, Rock Clássico" 
              />
            </div>
          )}

          {/* Campos dinâmicos para Camiseta */}
          {tipo === "Vestuário" && (
            <div className="animate-fade-in p-4 bg-gray-900 rounded border border-gray-700">
              <label className="block text-gray-300 text-sm font-semibold mb-2">Tamanho</label>
              <select 
                value={tamanho} onChange={(e) => setTamanho(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 outline-none"
              >
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>
          )}
        </div>

        {/* Botão de Envio */}
        <button 
          type="submit" 
          disabled={!isValido()} // O botão só habilita se tudo estiver preenchido[cite: 1]
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-colors"
        >
          Cadastrar no Sistema
        </button>
      </form>
    </div>
  );
}