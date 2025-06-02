"use client";

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const ticketsByCategory = [
  { category: "Técnico", quantidade: 45 },
  { category: "Financeiro", quantidade: 30 },
  { category: "Dúvidas", quantidade: 25 },
  { category: "Sugestões", quantidade: 15 },
];

const responseTimeData = [
  { day: "Seg", time: 25 },
  { day: "Ter", time: 20 },
  { day: "Qua", time: 30 },
  { day: "Qui", time: 22 },
  { day: "Sex", time: 28 },
];

export default function SuportePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suporte & Feedback</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Chamados por Categoria</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketsByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tempo Médio de Resposta (min)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="time" stroke="hsl(var(--chart-2))" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Chamados Recentes</h3>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="p-4">ID</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Assunto</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Status</th>
                <th className="p-4">Prioridade</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">#1234</td>
                <td className="p-4">Pedro Alves</td>
                <td className="p-4">Problema com login</td>
                <td className="p-4">Técnico</td>
                <td className="p-4"><span className="text-yellow-500">Em Andamento</span></td>
                <td className="p-4"><span className="text-red-500">Alta</span></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">#1233</td>
                <td className="p-4">Mariana Costa</td>
                <td className="p-4">Dúvida sobre fatura</td>
                <td className="p-4">Financeiro</td>
                <td className="p-4"><span className="text-green-500">Resolvido</span></td>
                <td className="p-4"><span className="text-yellow-500">Média</span></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">#1232</td>
                <td className="p-4">Lucas Mendes</td>
                <td className="p-4">Sugestão de feature</td>
                <td className="p-4">Sugestões</td>
                <td className="p-4"><span className="text-blue-500">Novo</span></td>
                <td className="p-4"><span className="text-green-500">Baixa</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}