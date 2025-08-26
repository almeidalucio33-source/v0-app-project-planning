"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, User, Plus, Edit, Trash2, Camera, Upload, Shield, Key, RefreshCw } from "lucide-react"
import Link from "next/link"

const usersData = [
  {
    id: "1",
    name: "Bruno Fernando",
    email: "bruno@aeromanager.com",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    role: "Administrador",
    corac: "123456",
    licenses: ["INVA", "IA"],
    photo: null,
    permissions: {
      editInspections: true,
      viewAllMenus: true,
      createUsers: true,
      changePasswords: true,
      viewAircraft: true,
      viewComponents: true,
      viewDocuments: true,
      viewHealth: true,
    },
    forcePasswordChange: false,
    forceSignatureChange: false,
    isActive: true,
  },
  {
    id: "2",
    name: "Maria Silva",
    email: "maria@aeromanager.com",
    phone: "(11) 88888-8888",
    cpf: "987.654.321-00",
    role: "Técnico",
    corac: "654321",
    licenses: ["INVA"],
    photo: null,
    permissions: {
      editInspections: true,
      viewAllMenus: false,
      createUsers: false,
      changePasswords: false,
      viewAircraft: true,
      viewComponents: true,
      viewDocuments: false,
      viewHealth: true,
    },
    forcePasswordChange: true,
    forceSignatureChange: false,
    isActive: true,
  },
]

const permissionLabels = {
  editInspections: "Editar Inspeções",
  viewAllMenus: "Visualizar Todos os Menus",
  createUsers: "Criar Novos Usuários",
  changePasswords: "Trocar Senhas de Usuários",
  viewAircraft: "Visualizar Aeronaves",
  viewComponents: "Visualizar Componentes",
  viewDocuments: "Visualizar Documentos",
  viewHealth: "Visualizar Saúde",
}

export default function SettingsPage() {
  const [users, setUsers] = useState(usersData)
  const [showNewUserForm, setShowNewUserForm] = useState(false)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [signaturePassword, setSignaturePassword] = useState("")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    role: "Técnico",
    corac: "",
    licenses: [] as string[],
    photo: null as File | null,
    permissions: {
      editInspections: false,
      viewAllMenus: false,
      createUsers: false,
      changePasswords: false,
      viewAircraft: true,
      viewComponents: false,
      viewDocuments: false,
      viewHealth: false,
    },
    forcePasswordChange: true,
    forceSignatureChange: false,
    isActive: true,
  })

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewUser({ ...newUser, photo: file })
    }
  }

  const handlePermissionChange = (permission: keyof typeof newUser.permissions, value: boolean) => {
    setNewUser({
      ...newUser,
      permissions: {
        ...newUser.permissions,
        [permission]: value,
      },
    })
  }

  const handleCreateUser = () => {
    const user = {
      id: Date.now().toString(),
      ...newUser,
      licenses: newUser.licenses.filter(Boolean),
    }
    setUsers([...users, user])
    setNewUser({
      name: "",
      email: "",
      phone: "",
      cpf: "",
      role: "Técnico",
      corac: "",
      licenses: [],
      photo: null,
      permissions: {
        editInspections: false,
        viewAllMenus: false,
        createUsers: false,
        changePasswords: false,
        viewAircraft: true,
        viewComponents: false,
        viewDocuments: false,
        viewHealth: false,
      },
      forcePasswordChange: true,
      forceSignatureChange: false,
      isActive: true,
    })
    setShowNewUserForm(false)
  }

  const handleForceChange = (userId: string, type: "password" | "signature", value: boolean) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              [type === "password" ? "forcePasswordChange" : "forceSignatureChange"]: value,
            }
          : user,
      ),
    )
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const SignatureModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 w-full max-w-md border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Senha de Assinatura Digital</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Digite sua senha de assinatura para confirmar esta operação crítica.
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="signature">Senha de Assinatura (até 10 dígitos)</Label>
            <Input
              id="signature"
              type="password"
              value={signaturePassword}
              onChange={(e) => setSignaturePassword(e.target.value)}
              maxLength={10}
              placeholder="Digite números e letras"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowSignatureModal(false)} variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button onClick={() => setShowSignatureModal(false)} className="flex-1">
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações do Sistema</h1>
          <p className="text-muted-foreground">Gerenciar usuários, permissões e configurações</p>
        </div>
      </div>

      {/* Users Management */}
      <div className="bg-card rounded-xl p-6 border border-border mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Gerenciamento de Usuários</h2>
            <p className="text-sm text-muted-foreground">Cadastrar e gerenciar usuários do sistema</p>
          </div>
          <Button onClick={() => setShowNewUserForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>

        {/* New User Form */}
        {showNewUserForm && (
          <div className="bg-muted rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Cadastrar Novo Usuário</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Nome completo do usuário"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone/Celular</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF (Login) *</Label>
                <Input
                  id="cpf"
                  value={newUser.cpf}
                  onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <Label htmlFor="corac">CORAC</Label>
                <Input
                  id="corac"
                  value={newUser.corac}
                  onChange={(e) => setNewUser({ ...newUser, corac: e.target.value })}
                  placeholder="Número do CORAC"
                />
              </div>
              <div>
                <Label htmlFor="role">Perfil</Label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="Técnico">Técnico</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="mb-6">
              <Label>Foto do Usuário</Label>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border">
                  {newUser.photo ? (
                    <img
                      src={URL.createObjectURL(newUser.photo) || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("photo-upload")?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Anexar Foto
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Tirar Foto
                  </Button>
                </div>
                <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </div>
            </div>

            {/* Licenses */}
            <div className="mb-6">
              <Label>Carteiras/Habilitações</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {["INVA", "IA", "IFR", "MLTE", "MNTE", "COMM"].map((license) => (
                  <label key={license} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newUser.licenses.includes(license)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewUser({ ...newUser, licenses: [...newUser.licenses, license] })
                        } else {
                          setNewUser({ ...newUser, licenses: newUser.licenses.filter((l) => l !== license) })
                        }
                      }}
                    />
                    <span className="text-sm">{license}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div className="mb-6">
              <Label className="text-base font-semibold">Permissões do Usuário</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {Object.entries(permissionLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="text-sm">{label}</span>
                    <Switch
                      checked={newUser.permissions[key as keyof typeof newUser.permissions]}
                      onCheckedChange={(value) =>
                        handlePermissionChange(key as keyof typeof newUser.permissions, value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Force Changes */}
            <div className="mb-6">
              <Label className="text-base font-semibold">Configurações de Acesso</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="text-sm">Forçar troca de senha no próximo login</span>
                  <Switch
                    checked={newUser.forcePasswordChange}
                    onCheckedChange={(value) => setNewUser({ ...newUser, forcePasswordChange: value })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="text-sm">Forçar criação de assinatura digital</span>
                  <Switch
                    checked={newUser.forceSignatureChange}
                    onCheckedChange={(value) => setNewUser({ ...newUser, forceSignatureChange: value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setShowNewUserForm(false)} variant="outline">
                Cancelar
              </Button>
              <Button onClick={handleCreateUser}>Cadastrar Usuário</Button>
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-muted rounded-lg p-4">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* User Avatar and Basic Info */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    {user.photo ? (
                      <img src="#" alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-primary-foreground" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-semibold text-card-foreground">{user.name}</h4>
                      <Badge variant={user.role === "Administrador" ? "default" : "secondary"}>{user.role}</Badge>
                      {user.forcePasswordChange && (
                        <Badge variant="destructive" className="text-xs">
                          <Key className="h-3 w-3 mr-1" />
                          Trocar Senha
                        </Badge>
                      )}
                      {user.forceSignatureChange && (
                        <Badge variant="destructive" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Criar Assinatura
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground">
                    <div className="min-w-0">
                      <span className="font-medium">Email:</span>
                      <div className="truncate">{user.email}</div>
                    </div>
                    <div className="min-w-0">
                      <span className="font-medium">CPF:</span>
                      <div>{user.cpf}</div>
                    </div>
                    <div className="min-w-0">
                      <span className="font-medium">CORAC:</span>
                      <div>{user.corac}</div>
                    </div>
                    <div className="min-w-0">
                      <span className="font-medium">Carteiras:</span>
                      <div className="truncate">{user.licenses.join(", ") || "Nenhuma"}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleForceChange(user.id, "password", !user.forcePasswordChange)}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Senha
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleForceChange(user.id, "signature", !user.forceSignatureChange)}
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Assinatura
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingUser(user.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Permissions Display */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium text-card-foreground mb-2">Permissões:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(user.permissions)
                    .filter(([, value]) => value)
                    .map(([key]) => (
                      <Badge key={key} variant="outline" className="text-xs">
                        {permissionLabels[key as keyof typeof permissionLabels]}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Signature Info */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Assinatura Digital</h2>
            <p className="text-sm text-muted-foreground">
              Sistema de segurança para operações críticas (até 10 dígitos, números e letras)
            </p>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium text-card-foreground mb-2">Operações que requerem assinatura digital:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Atualizar inspeções</li>
            <li>• Instalar ou desinstalar componentes</li>
            <li>• Cadastrar novas inspeções</li>
            <li>• Modificar dados críticos de aeronaves</li>
          </ul>
        </div>
        <Button onClick={() => setShowSignatureModal(true)} className="mt-4">
          Testar Assinatura Digital
        </Button>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && <SignatureModal />}
    </div>
  )
}
