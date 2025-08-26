import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <LoginForm />

        <div className="text-center">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full bg-transparent">
              Ver Dashboard (Desenvolvimento)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
