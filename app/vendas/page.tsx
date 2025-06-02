"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/breadcrumb";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useEffect, useState } from "react";

const salesData = [
  { month: "Jan", sales: 4000, target: 3000 },
  { month: "Feb", sales: 3000, target: 3000 },
  { month: "Mar", sales: 5000, target: 3500 },
  { month: "Apr", sales: 4500, target: 4000 },
  { month: "May", sales: 6000, target: 4000 },
  { month: "Jun", sales: 5500, target: 4500 },
];

const salesByProduct = [
  { name: "Plano Basic", value: 4000 },
  { name: "Plano Pro", value: 3000 },
  { name: "Plano Enterprise", value: 2000 },
  { name: "Serviços", value: 1500 },
];

const recentSales = [
  { 
    id: 1, 
    customer: "João Silva", 
    product: "Plano Enterprise", 
    value: 999, 
    date: new Date(2024, 2, 20), 
    status: "concluído" 
  },
  { 
    id: 2, 
    customer: "Maria Santos", 
    product: "Plano Pro", 
    value: 499, 
    date: new Date(2024, 2, 19), 
    status: "pendente" 
  },
  { 
    id: 3, 
    customer: "Carlos Oliveira", 
    product: "Plano Basic", 
    value: 199, 
    date: new Date(2024, 2, 18), 
    status: "concluído" 
  },
];

export default function VendasPage() {
  const [isClient, setIsClient] = useState(false);
  
  // Resolve o problema de hidratação para gráficos
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb />
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Vendas & Conversões</h1>
        <div className="flex gap-2">
          <select className="bg-background border rounded-md px-3 py-1 text-sm">
            <option value="este-mes">Este mês</option>
            <option value="mes-passado">Mês passado</option>
            <option value="trimestre">Trimestre</option>
            <option value="ano">Ano</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Desempenho de Vendas vs Meta</h3>
          <div className="h-[250px] md:h-[300px]">
            {!isClient ? (
              <div className="h-full flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `R$ ${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${formatCurrency(Number(value))}`, "Vendas"]}
                    contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="hsl(var(--chart-1))" name="Vendas" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="hsl(var(--chart-2))" strokeDasharray="5 5" name="Meta" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Vendas por Produto</h3>
          <div className="h-[250px] md:h-[300px]">
            {!isClient ? (
              <div className="h-full flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByProduct}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `R$ ${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${formatCurrency(Number(value))}`, "Valor"]}
                    contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Últimas Vendas</h3>
          <button className="text-sm text-primary hover:underline">Ver todas</button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="p-4">Cliente</th>
                <th className="p-4">Produto</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Data</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-b">
                  <td className="p-4">{sale.customer}</td>
                  <td className="p-4">{sale.product}</td>
                  <td className="p-4">{formatCurrency(sale.value)}</td>
                  <td className="p-4">{formatDate(sale.date)}</td>
                  <td className="p-4">
                    <span className={
                      sale.status === "concluído" 
                        ? "text-green-500" 
                        : sale.status === "pendente"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }>
                      {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}