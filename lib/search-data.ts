export type SearchResult = {
  id: string;
  title: string;
  category: string;
  url: string;
  icon?: string;
};

export const searchData: SearchResult[] = [
  // Vendas
  { id: "1", title: "Relatório de Vendas", category: "vendas", url: "/vendas", icon: "📊" },
  { id: "2", title: "Metas Mensais", category: "vendas", url: "/vendas", icon: "🎯" },
  { id: "3", title: "Pipeline de Vendas", category: "vendas", url: "/vendas", icon: "📈" },
  
  // Clientes
  { id: "4", title: "Lista de Clientes", category: "clientes", url: "/clientes", icon: "👥" },
  { id: "5", title: "Segmentação", category: "clientes", url: "/clientes", icon: "🎯" },
  { id: "6", title: "Retenção", category: "clientes", url: "/clientes", icon: "🔄" },
  
  // Suporte
  { id: "7", title: "Chamados Abertos", category: "suporte", url: "/suporte", icon: "🎧" },
  { id: "8", title: "Feedback", category: "suporte", url: "/suporte", icon: "💬" },
  { id: "9", title: "SLA", category: "suporte", url: "/suporte", icon: "⏱️" },
  
  // Financeiro
  { id: "10", title: "Receita Mensal", category: "financeiro", url: "/financeiro", icon: "💰" },
  { id: "11", title: "Despesas", category: "financeiro", url: "/financeiro", icon: "📉" },
  { id: "12", title: "Projeções", category: "financeiro", url: "/financeiro", icon: "📊" },
];