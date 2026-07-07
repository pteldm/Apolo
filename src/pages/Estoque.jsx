import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import EstoqueLinha from "../components/EstoqueLinha";

export default function Estoque() {
  const { estoque, setEstoque } = useContext(AppContext);

  const [pesquisa, setPesquisa] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("")

  const produtosFiltrados = estoque.filter((produto) => {
      const nomeCorresponde = produto.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase());

      const categoriaCorresponde = categoriaFiltro === "" || produto.tipo === categoriaFiltro

    return nomeCorresponde && categoriaCorresponde
  })

  // A função que resolve o MUST-06 do Apolo
  const alterarQuantidade = (id, delta) => {
    const novoEstoque = estoque.map((item) => {
      if (item.id === id) {
        const novaQuantidade = item.quantidade + delta;
        
        return { ...item, quantidade: Math.max(0, novaQuantidade) };
      }

      return item;
    });

    // Enviamos a lista nova para a "nuvem" do Contexto
    setEstoque(novoEstoque);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <header>
        <div>
          <h1 className="text-3xl font-bold text-white">Gerenciamento de Estoque</h1>
          <p className="text-gray-400 mt-1">Controle rápido de produtos.</p>
        </div>
      </header>
        {/* Barra de Ferramentas: Filtros de pesquisa */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
          
          {/* Lado Esquerdo: Inputs de Busca */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 max-w-2xl">
            
          {/* Input de Texto */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Pesquisar por nome do produto..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="w-full pl-4 pr-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Dropdown de Categorias */}
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Todas as Categorias</option>
            <option value="Mídia física">💿 Mídias Físicas</option>
            <option value="Vestuário">👕 Vestuário</option>
            <option value="Instrumento musical">🎸 Instrumentos</option>
            <option value="Acessório">🎛️ Acessórios</option>
          </select>
        </div>

          {/* O botão de adicionar que leva para o formulário */}
          <Link
            to="/app/estoque/novo" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
          >
            <span className="text-xl ">+</span> Adicionar Produto
          </Link>
    </div>

      

      {/* A Tabela de Produtos (MUST-03) */}
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Produto</th>
              <th className="p-4 font-semibold">Categoria</th>
              <th className="p-4 font-semibold text-center">Quantidade</th>
              <th className="p-4 font-semibold text-right">Preço Un.</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <EstoqueLinha 
                  key={produto.id} 
                  item={produto} 
                  onAlterar={alterarQuantidade}
                />
              ))
            ) : (
              // Mensagem elegante caso a busca não encontre nada
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  Nenhum produto encontrado para os filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}