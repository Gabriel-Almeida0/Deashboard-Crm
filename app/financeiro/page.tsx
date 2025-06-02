"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 50000, expenses: 30000 },
  { month: "Feb", revenue: 45000, expenses: 28000 },
  { month: "Mar", revenue: 60000, expenses: 35000 },
  { month: "Apr", revenue: 55000, expenses: 32000 },
  { month: "May", revenue: 70000, expenses: 40000 },
  { month: "Jun", revenue: 65000, expenses: 38000 },
];

const revenueByProduct = [
  { name: "Plano Basic", value: 25000 },
  { name: "Plano Pro", value: 35000 },
  { name: "Plano Enterprise", value: 45000 },
  { name: "Serviços", value: 15000 },
];

export default function FinanceiroPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financeiro & Receita</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Receita vs Despesas</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" name="Receita" />
                <Line type="monotone" dataKey="expenses" stroke="hsl(var(--chart-2))" name="Despesas" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Receita por Produto</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByProduct}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Últimas Transações</h3>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="p-4">ID</th>
                <th className="p-4">Data</th>
                <th className="p-4">Descrição</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">#4567</td>
                <td className="p-4">2024-03-20</td>
                <td className="p-4">Assinatura Plano Enterprise</td>
                <td className="p-4">Receita</td>
                <td className="p-4">R$ 999,00</td>
                <td className="p-4"><span className="text-green-500">Confirmado</span></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">#4566</td>
                <td className="p-4">2024-03-19</td>
                <td className="p-4">Serviços de Marketing</td>
                <td className="p-4">Despesa</td>
                <td className="p-4">R$ 2.500,00</td>
                <td className="p-4"><span className="text-red-500">Pago</span></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">#4565</td>
                <td className="p-4">2024-03-18</td>
                <td className="p-4">Assinatura Plano Pro</td>
                <td className="p-4">Receita</td>
                <td className="p-4">R$ 499,00</td>
                <td className="p-4"><span className="text-green-500">Confirmado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}