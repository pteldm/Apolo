import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import DashboardCard from "../components/DashboardCard"

export default function Dashboard() {
    // 1. Puxando os dados da nossa nuvem global
    const { estoque } = useContext(AppContext);

    // 2. Fazendo os cálculos dinâmicos com JavaScript puro
  
    // Somando a quantidade de todos os itens usando o reduce
    const totalItens = estoque.reduce((soma, item) => soma + item.quantidade, 0);
  
    // Calculando o capital investido (preço * quantidade)
    const capitalInvestido = estoque.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  
    // Filtrando apenas itens com menos de 3 unidades (MUST-02 do Apolo)[cite: 1]
    const estoqueCritico = estoque.filter((item) => item.quantidade < 3);
    
    return (
        <div className="space-y-8 animate-fade-in">
        
        {/* Cabeçalho da Página */}
        <header>
            <h1 className="text-3xl font-bold text-white">Visão Geral</h1>
            <p className="text-gray-400 mt-1">Acompanhe os números do seu estoque e da cena musical.</p>
        </header>

        {/* Grid Superior: Cards de Métricas (MUST-02 do Apolo) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <DashboardCard 
            titulo="Total em Estoque" 
            valor={`${totalItens} itens`} 
            corDestaque="bg-purple-500"
            />

            <DashboardCard 
            titulo="Capital Investido" 
            valor={capitalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
            corDestaque="bg-emerald-500"
            corTexto="text-emerald-400"
            />

            <DashboardCard 
            titulo="Estoque Crítico" 
            valor={`${estoqueCritico.length} itens`} 
            subtitulo="Abaixo de 3 unidades"
            corDestaque="bg-red-500"
            corTexto="text-red-400"
            />
            
        </div>

        </div>
  );
}