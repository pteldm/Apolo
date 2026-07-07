export default function DashboardCard({ titulo, valor, subtitulo, corDestaque = "bg-purple-500", corTexto = "text-white"}) {
    return (
        <div className={"bg-gray-800 p-6 pl-8 rounded-lg border border-gray-700 shadow-lg relative"}>
            {/* Barra lateral colorida */}
            <div className={`absolute top-0 left-0 w-2 h-full ${corDestaque}`}></div>
                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${corTexto}`}>
                    {titulo}
                </h3>

                <p className={`text-3xl font-bold ${corTexto}`}>
                    {valor}
                </p>

                {/* Só renderiza o subtítulo se ele for passado como prop */}
                {
                    subtitulo && (<p className="text-xs text-gray-500 mt-1">{subtitulo}</p>)
                }
        </div>
    )    
}