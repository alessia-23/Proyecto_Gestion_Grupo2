"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion" 
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase-config"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsError(false)

    if (!email || !password) {
      setMessage("Por favor, ingresa tu correo y contraseña.")
      setIsError(true)
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      setMessage("¡Inicio de sesión exitoso! Redirigiendo al panel...")
      setIsError(false)

      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error: any) {
      console.error(error)
      if (error.code === "auth/user-not-found") {
        setMessage("No existe una cuenta con este correo.")
      } else if (error.code === "auth/wrong-password") {
        setMessage("La contraseña es incorrecta.")
      } else {
        setMessage("Error al iniciar sesión.")
      }
      setIsError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E0F7FA] via-[#F3E5F5] to-[#FFFDE7] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-4 border-[#B2EBF2] shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-4xl">👋</div>
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4]">
                AvaLearn
              </span>
              <div className="text-4xl">🚀</div>
            </div>
            <CardTitle className="text-3xl font-black text-[#00BCD4]">¡Bienvenido de Nuevo!</CardTitle>
            <CardDescription className="text-lg text-gray-700 font-bold">
              Inicia sesión para continuar tu aventura de aprendizaje.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-lg font-bold text-[#00BCD4]">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu.correo@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-[#80DEEA] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#4DD0E1]/50 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-lg font-bold text-[#00BCD4]">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Tu contraseña secreta"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-[#80DEEA] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#4DD0E1]/50 transition-all duration-200"
                  />
                </div>
              </div>
              {message && (
                <p className={`text-center text-lg font-semibold ${isError ? "text-red-600" : "text-green-600"}`}>
                  {message}
                </p>
              )}
              <Button
                type="submit"
                className="w-full py-6 text-xl bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] hover:from-[#26C6DA] hover:to-[#00ACC1] text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Iniciar Sesión <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/forgot-password">
                <Button variant="link" className="text-lg font-bold text-[#4DD0E1] hover:text-[#00BCD4] transition-colors duration-200">
                  ¿Olvidaste tu contraseña?
                </Button>
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link href="/register">
                <Button variant="link" className="text-lg font-bold text-[#4DD0E1] hover:text-[#00BCD4] transition-colors duration-200">
                  ¿No tienes una cuenta? Regístrate
                </Button>
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link href="/">
                <Button variant="link" className="text-lg font-bold text-[#4DD0E1] hover:text-[#00BCD4] transition-colors duration-200">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Regresar a Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}