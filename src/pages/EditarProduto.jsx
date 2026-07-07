import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function EditarProduto() {
    // 1. Capturamos o ID que vem da URL (ex: /app/estoque/2)
    const { id } = useParams();
    const { estoque, setEstoque } = useContext(AppContext);

    // 2. Buscamos o produto específico no array (lembrando de converter o ID da URL para número)
    const produto = estoque.find((item) => item.id === parseInt(id));

    const navegar = useNavigate();

    // Estados do Formulário
    const [tipo, setTipo] = useState(`${produto?.tipo || ""}`);
    const [nome, setNome] = useState(`${produto?.nome || ""}`);
    const [preco, setPreco] = useState(`${produto?.preco || ""}`);
    const [quantidade, setQuantidade] = useState(`${produto?.quantidade || ""}`);

    // Campos específicos
    const [tamanho, setTamanho] = useState(`${produto?.tamanho || "M"}`);
    const [genero, setGenero] = useState(`${produto?.genero || ""}`);

    // Validação reativa (MUST-05: Bloqueio do envio)
    const isValido = () => {
        if (!tipo || !nome || !preco || !quantidade) return false;
        if ((tipo === "Mídia física") && !genero) return false;
        if ((tipo === "Vestuário") && !tamanho) return false;
        
        return true;
    };

    const salvarProduto = (evento) => {
        evento.preventDefault();

        const produtoEditado = {
            id: produto.id, // 1. MANTÉM O ID ORIGINAL INTACTO
            tipo,
            nome,
            preco: parseFloat(preco),
            quantidade: parseInt(quantidade),
            
        };

        // 2. Injetamos os campos específicos apenas se a categoria for a correta
        if (tipo === "Mídia física") {
            produtoEditado.genero = genero;
        } else if (tipo === "Vestuário") {
            produtoEditado.tamanho = tamanho;
        }
        // Instrumentos e Acessórios não ganham campos extras.
        
        // 2. USA O MAP: Se o item da volta atual tiver o mesmo ID do que estamos editando, 
        // nós o substituímos pelo produtoEditado. Se não for, devolvemos o item original intacto.
        const estoqueAtualizado = estoque.map(item => 
            item.id === produto.id ? produtoEditado : item
        );

        setEstoque(estoqueAtualizado);
        navegar("/app/estoque"); 
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-white">Editar Item</h1>
                <p className="text-gray-400 mt-1">Atualize os detalhes do produto no inventário do Apolo.</p>
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
                        <label className="block text-gray-300 text-sm font-semibold mb-2">Preço</label>
                        <input
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="Ex: 49.90"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2">Quantidade</label>
                        <input
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="Ex: 10"
                        />
                    </div>
                </div>

                {/* Bloco 2: Tipo de Produto */}
                <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">Tipo de Produto</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                        <option value="">Selecione...</option>
                        <option value="Mídia física">💿 Mídia Física (CD/Vinil)</option>
                        <option value="Vestuário">👕 Vestuário (Camiseta)</option>
                        <option value="Instrumento musical">🎸 Instrumento Musical</option>
                        <option value="Acessório">🎛️ Acessório (Pedal, Cabo, etc.)</option>
                    </select>
                </div>

                {/* Bloco 3: Campos Dinâmicos */}
                {tipo === "Mídia física" && (
                    <div className="animate-fade-in p-4 bg-gray-900 rounded border border-gray-700">
                        <label className="block text-gray-300 text-sm font-semibold mb-2">Gênero Musical</label>
                        <input
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="Ex: Rock, Metal, Pop"
                        />
                    </div>
                )}

                {tipo === "Vestuário" && (
                    <div className="animate-fade-in p-4 bg-gray-900 rounded border border-gray-700">
                        <label className="block text-gray-300 text-sm font-semibold mb-2">Tamanho</label>
                        <select
                            value={tamanho}
                            onChange={(e) => setTamanho(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            <option value="">Selecione...</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                        </select>
                    </div>
                )}

                {/* Botão de Salvar */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!isValido()}
                        className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-lg shadow-emerald-500/20 ${!isValido() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
}