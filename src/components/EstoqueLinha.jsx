import { Link } from "react-router-dom"

export default function EstoqueLinha({ item, onAlterar }) {
    // 1. Criamos um mapeador visual para cada tipo de produto que temos no sistema
    const obterVisualCategoria = (tipo) => {
        const estilos = {
        "Mídia física": { cor: "bg-blue-500/20 text-blue-400 border border-blue-500/30", icone: "💿" },
        "Vestuário": { cor: "bg-purple-500/20 text-purple-400 border border-purple-500/30", icone: "👕" },
        "Instrumento musical": { cor: "bg-amber-500/20 text-amber-400 border border-amber-500/30", icone: "🎸" },
        "Acessório": { cor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30", icone: "🎛️" }
        };
        
        // Se o tipo existir no nosso dicionário, usa ele. Se for algo novo, cai no cinza padrão.
        return estilos[tipo] || { cor: "bg-gray-700 text-gray-300 border border-gray-600", icone: "📦" };
    };

    // 2. Extraímos o visual correto baseado no item atual da linha
    const visual = obterVisualCategoria(item.tipo);
    
    return (
        <tr className="hover:bg-gray-750 transition-colors">
            {/* Coluna 1: Nome com link para os detalhes */}
            <td className="p-4">
                <Link to={`/app/estoque/${item.id}`} 
                className="font-bold text-white hover:text-purple-400 hover:underline transition-colors-ease-in-out"
                > 
                    {item.nome}
                </Link>
            </td>

            {/* 3. Aplicamos as cores e o ícone dinamicamente no Span */}
            <td className="p-4 text-sm">
                <span className={`px-3 py-1 rounded-full font-semibold flex items-center w-fit gap-2 ${visual.cor}`}>
                <span>{visual.icone}</span>
                {item.tipo}
                </span>
            </td>

            {/*Coluna 3: Controles de quantidade */}
            <td className="p-4">
                <div className="flex items-center justify-center space-x-3">
                    <button 
                        onClick={() => onAlterar(item.id, -1)}
                        disabled={item.quantidade === 0}
                        className="w-8 h-8 rounded bg-gray-700 hover:bg-red-600 text-white font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            -
                    </button>

                    <span className="w-8 text-center font-bold text-white text-lg">
                        {item.quantidade}
                    </span>

                    <button
                        onClick={() => onAlterar(item.id, 1)}
                        className="w-8 h-8 rounded bg-gray-700 hover:bg-green-600 text-white font-bold flex items-center justify-center transition"
                        >
                            +
                    </button>
                </div>
            </td>
            
            {/* Coluna 4: Preço Formatado */}
            <td className="p-4 text-right text-emerald-400 font-semibold">
                {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
        
        </tr>
    )
}