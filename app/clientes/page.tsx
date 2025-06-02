"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const customerSegments = [
  { name: "Premium", value: 400 },
  { name: "Regular", value: 300 },
  { name: "Ocasional", value: 200 },
];

const retentionData = [
  { month: "Jan", rate: 95 },
  { month: "Feb", rate: 93 },
  { month: "Mar", rate: 96 },
  { month: "Apr", rate: 94 },
  { month: "May", rate: 97 },
  { month: "Jun", rate: 95 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

export default function ClientesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Comportamento do Cliente</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Segmentação de Clientes</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Taxa de Retenção</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="hsl(var(--chart-1))" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Clientes Ativos</h3>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="p-4">Cliente</th>
                <th className="p-4">Segmento</th>
                <th className="p-4">Última Compra</th>
                <th className="p-4">Valor Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">Ana Paula</td>
                <td className="p-4">Premium</td>
                <td className="p-4">2024-03-15</td>
                <td className="p-4">R$ 2.500,00</td>
                <td className="p-4"><span className="text-green-500">Ativo</span></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Roberto Santos</td>
                <td className="p-4">Regular</td>
                <td className="p-4">2024-03-10</td>
                <td className="p-4">R$ 1.200,00</td>
                <td className="p-4"><span className="text-green-500">Ativo</span></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Carla Silva</td>
                <td className="p-4">Ocasional</td>
                <td className="p-4">2024-02-28</td>
                <td className="p-4">R$ 450,00</td>
                <td className="p-4"><span className="text-yellow-500">Inativo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}