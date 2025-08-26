"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("[v0] Login attempt:", { email, password })

    // Check for test admin credentials
    if (email === "123" && password === "123") {
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to dashboard
        window.location.href = "/dashboard"
      }, 1000)
      return
    }

    // Simular delay de API para outras credenciais
    setTimeout(() => {
      setIsLoading(false)
      alert("Credenciais inválidas! Use login: 123 e senha: 123 para teste.")
    }, 1500)
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="text-center space-y-4">
        {/* Logo da aviação */}
        <div className="flex justify-center">
          <div className="bg-primary rounded-full p-3">
            <Plane className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">CTM System</CardTitle>
          <CardDescription className="text-muted-foreground">
            Controle Técnico de Manutenção de Aeronaves
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Login</Label>
            <Input
              id="email"
              type="text"
              placeholder="Digite seu login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-accent transition-colors" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Teste: Login <strong>123</strong> | Senha <strong>123</strong>
            </p>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-accent hover:underline"
              onClick={() => alert("Funcionalidade em desenvolvimento")}
            >
              Esqueceu sua senha?
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
