import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// Função auxiliar para obter o ícone
const obterIconeProduto = (tipo) => {
  if (tipo === "Mídia física") {
    return "💿";
  } else if (tipo === "Vestuário") {
    return "👕";
  } else if (tipo === "Instrumento musical") {
    return "🎸";
  } else {
    return "🎛️";
  }
};

export default function DetalhesProduto() {
  // 1. Capturamos o ID que vem da URL (ex: /app/estoque/2)
  const { id } = useParams();
  const { estoque, setEstoque } = useContext(AppContext);

  // 2. Buscamos o produto específico no array (lembrando de converter o ID da URL para número)
  const produto = estoque.find((item) => item.id === parseInt(id));

  // 3. Tratamento de erro caso o usuário digite um ID que não existe
  if (!produto) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl text-white font-bold">Produto não encontrado!</h2>
        <Link to="/app/estoque" className="text-purple-400 mt-4 inline-block hover:underline">
          Voltar para o estoque
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Detalhes do Produto</h1>
          <p className="text-gray-400 mt-1">Especificações técnicas e status.</p>
        </div>
        <Link
          to="/app/estoque"
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
        >
          ← Voltar para o estoque
        </Link>
      </header>

      {/* Layout em duas colunas como no wireframe do documento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-xl">

        {/*Bloco de "Imagem" do produto* (esquerda)*/}
        <div className="col-span-1 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-700 min-h-62.5">
          <span className="text-6xl">
            {obterIconeProduto(produto.tipo)}
          </span>
        </div>

        {/* Bloco Descritivo (Direita)*/}
        <div className="col-span-2 flex flex-col h-full">
          <div>
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              {produto.tipo}
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">{produto.nome}</h2>
            <p className="text-3xl font-bold text-emerald-400 mt-2">
              {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>

          <hr className="border-gray-700 my-4" />

          {/* Dados Dinâmicos dependendo da categoria*/}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm font-semibold">Quantidade em Estoque</p>
              <p className={`text-lg font-bold ${produto.quantidade < 3 ? 'text-red-400' : 'text-white'}`}>
                {produto.quantidade} unidades
              </p>
            </div>

            {produto.tipo === "CD" && produto.genero && (
              <div>
                <p className="text-gray-400 text-sm font-semibold">Gênero Musical</p>
                <p className="text-lg font-bold text-white">{produto.genero}</p>
              </div>
            )}

            {produto.tipo === "Vestuário" && produto.tamanho && (
              <div>
                <p className="text-gray-400 text-sm font-semibold">Tamanho</p>
                <p className="text-lg font-bold text-white">{produto.tamanho}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 flex justify-end w-full gap-6">
        <Link
            to={`/app/estoque/${produto.id}/editar`}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-md transition-colors flex items-center gap-2 shadow-lg shadow-purple-500/20"
        >
          Editar Produto
        </Link>
        <button 
          onClick={() => setEstoque(estoque.filter(item => item.id !== produto.id))} 
          className="text-white font-bold hover:bg-red-600 bg-red-500 rounded-md px-6 py-2 transition-colors flex items-center gap-2 shadow-lg shadow-red-500/20">
          Excluir Produto
        </button>
      </div>
    </div>
  );
}