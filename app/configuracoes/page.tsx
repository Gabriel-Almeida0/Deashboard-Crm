"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from "@/hooks/use-notifications";
import { Breadcrumb } from "@/components/breadcrumb";

export default function ConfiguracoesPage() {
  const { addNotification } = useNotifications();

  // Estados para formulários
  const [perfilForm, setPerfilForm] = useState({
    nome: "Usuário Teste",
    email: "usuario@teste.com",
    cargo: "Administrador"
  });

  const [senhaForm, setSenhaForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: ""
  });

  const [notificacoes, setNotificacoes] = useState({
    email: true,
    web: true,
    vendas: true,
    suporte: true,
    sistema: true
  });

  // Manipuladores de formulário
  const handlePerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerfilForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSenhaForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificacaoChange = (name: string, checked: boolean) => {
    setNotificacoes((prev) => ({ ...prev, [name]: checked }));
  };

  // Manipuladores de envio
  const handlePerfilSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification(
      "Perfil atualizado",
      "Suas informações de perfil foram atualizadas com sucesso",
      "success"
    );
  };

  const handleSenhaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaForm.novaSenha !== senhaForm.confirmarSenha) {
      addNotification(
        "Erro ao atualizar senha",
        "As senhas informadas não coincidem",
        "error"
      );
      return;
    }
    
    if (senhaForm.novaSenha.length < 8) {
      addNotification(
        "Erro ao atualizar senha",
        "A senha deve ter pelo menos 8 caracteres",
        "error"
      );
      return;
    }
    
    addNotification(
      "Senha atualizada",
      "Sua senha foi atualizada com sucesso",
      "success"
    );
    
    setSenhaForm({
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: ""
    });
  };

  const handleNotificacoesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification(
      "Preferências atualizadas",
      "Suas preferências de notificação foram atualizadas",
      "success"
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Configurações</h1>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList className="mb-6">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="senha">Senha</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="aparencia">Aparência</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e profissionais
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePerfilSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={perfilForm.nome}
                    onChange={handlePerfilChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={perfilForm.email}
                    onChange={handlePerfilChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    name="cargo"
                    value={perfilForm.cargo}
                    onChange={handlePerfilChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Salvar Alterações</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="senha">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Atualize sua senha para manter sua conta segura
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSenhaSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="senhaAtual">Senha Atual</Label>
                  <Input
                    id="senhaAtual"
                    name="senhaAtual"
                    type="password"
                    value={senhaForm.senhaAtual}
                    onChange={handleSenhaChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novaSenha">Nova Senha</Label>
                  <Input
                    id="novaSenha"
                    name="novaSenha"
                    type="password"
                    value={senhaForm.novaSenha}
                    onChange={handleSenhaChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    value={senhaForm.confirmarSenha}
                    onChange={handleSenhaChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Atualizar Senha</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Escolha como e quando deseja receber notificações
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleNotificacoesSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Canais de Notificação</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotif">Notificações por Email</Label>
                    <Switch
                      id="emailNotif"
                      checked={notificacoes.email}
                      onCheckedChange={(checked) => handleNotificacaoChange("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="webNotif">Notificações no Navegador</Label>
                    <Switch
                      id="webNotif"
                      checked={notificacoes.web}
                      onCheckedChange={(checked) => handleNotificacaoChange("web", checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-sm font-medium">Tipos de Notificação</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vendasNotif">Alertas de Vendas</Label>
                    <Switch
                      id="vendasNotif"
                      checked={notificacoes.vendas}
                      onCheckedChange={(checked) => handleNotificacaoChange("vendas", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="suporteNotif">Atualizações de Suporte</Label>
                    <Switch
                      id="suporteNotif"
                      checked={notificacoes.suporte}
                      onCheckedChange={(checked) => handleNotificacaoChange("suporte", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sistemaNotif">Notificações de Sistema</Label>
                    <Switch
                      id="sistemaNotif"
                      checked={notificacoes.sistema}
                      onCheckedChange={(checked) => handleNotificacaoChange("sistema", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Salvar Preferências</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="aparencia">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Tema</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="cursor-pointer border-2 border-primary rounded-md overflow-hidden">
                    <div className="bg-background h-20 flex items-center justify-center">
                      <span className="text-foreground">Claro</span>
                    </div>
                  </div>
                  <div className="cursor-pointer border-2 border-gray-200 rounded-md overflow-hidden">
                    <div className="bg-black h-20 flex items-center justify-center">
                      <span className="text-white">Escuro</span>
                    </div>
                  </div>
                  <div className="cursor-pointer border-2 border-gray-200 rounded-md overflow-hidden">
                    <div className="bg-gradient-to-b from-background to-black h-20 flex items-center justify-center">
                      <span className="text-foreground">Sistema</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button" variant="outline">Restaurar Padrões</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}