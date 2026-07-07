import { createContext, useState, useEffect } from "react";
import { dadosEstoqueInicial } from "../data/mockData";

export const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Ao iniciar, tentamos buscar dados salvos no navegador.
  // Se não houver nada salvo, usamos o mockData inicial.
  const [estoque, setEstoque] = useState(() => {
    const estoqueSalvo = localStorage.getItem("apolo_estoque");
    return estoqueSalvo ? JSON.parse(estoqueSalvo) : dadosEstoqueInicial;
  });

  // 2. Sempre que a variável 'estoque' sofrer qualquer alteração,
  // nós salvamos a nova versão convertida em texto (JSON) no navegador.
  useEffect(() => {
    localStorage.setItem("apolo_estoque", JSON.stringify(estoque));
  }, [estoque]);

  return (
    <AppContext.Provider value={{ estoque, setEstoque }}>
      {children}
    </AppContext.Provider>
  );
}