"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, HeadphonesIcon, CreditCard, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useEffect, useState } from "react";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
];

const customerData = [
  { name: "Novos", value: 400 },
  { name: "Recorrentes", value: 300 },
  { name: "Inativos", value: 100 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  
  // Resolve o problema de hidratação para gráficos
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="grid gap-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendas Totais</p>
                <h3 className="text-xl md:text-2xl font-bold">{formatCurrency(45231)}</h3>
                <p className="text-xs text-green-500">+12.5% este mês</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clientes Ativos</p>
                <h3 className="text-xl md:text-2xl font-bold">1.234</h3>
                <p className="text-xs text-green-500">+3.2% este mês</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Chamados Abertos</p>
                <h3 className="text-xl md:text-2xl font-bold">23</h3>
                <p className="text-xs text-red-500">+5 novos hoje</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Receita Recorrente</p>
                <h3 className="text-xl md:text-2xl font-bold">{formatCurrency(12450)}</h3>
                <p className="text-xs text-green-500">+8.3% este mês</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Crescimento de Vendas</h3>
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
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-1))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Distribuição de Clientes</h3>
            <div className="h-[250px] md:h-[300px]">
              {!isClient ? (
                <div className="h-full flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [value, "Clientes"]}
                      contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        {/* Tabs Section */}
        <Card className="p-4 md:p-6">
          <Tabs defaultValue="vendas">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vendas">Vendas</TabsTrigger>
              <TabsTrigger value="clientes">Clientes</TabsTrigger>
              <TabsTrigger value="suporte">Suporte</TabsTrigger>
            </TabsList>
            <TabsContent value="vendas" className="mt-4">
              <div className="rounded-lg border overflow-auto">
                <div className="p-4">
                  <h4 className="text-sm font-medium">Últimas Vendas</h4>
                  <div className="mt-2">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-sm text-muted-foreground">
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Produto</th>
                            <th className="p-2">Valor</th>
                            <th className="p-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-2">João Silva</td>
                            <td className="p-2">Plano Premium</td>
                            <td className="p-2">{formatCurrency(299)}</td>
                            <td className="p-2"><span className="text-green-500">Concluído</span></td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-2">Maria Santos</td>
                            <td className="p-2">Plano Básico</td>
                            <td className="p-2">{formatCurrency(99)}</td>
                            <td className="p-2"><span className="text-yellow-500">Pendente</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="clientes" className="mt-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Clientes Recentes</h4>
                <div className="grid gap-4">
                  <Card className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Ana Maria</h5>
                        <p className="text-sm text-muted-foreground">Cliente desde 20/04/2023</p>
                      </div>
                      <div className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs">
                        Ativo
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Pedro Alves</h5>
                        <p className="text-sm text-muted-foreground">Cliente desde 15/03/2023</p>
                      </div>
                      <div className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs">
                        Ativo
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="suporte" className="mt-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Chamados Ativos</h4>
                <div className="grid gap-4">
                  <Card className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Problema com login</h5>
                        <p className="text-sm text-muted-foreground">Aberto por José Pereira</p>
                      </div>
                      <div className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded text-xs">
                        Em andamento
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Dúvida sobre faturamento</h5>
                        <p className="text-sm text-muted-foreground">Aberto por Carla Souza</p>
                      </div>
                      <div className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded text-xs">
                        Urgente
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}