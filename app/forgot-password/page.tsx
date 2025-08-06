"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion" // Importar motion para animaciones
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase-config"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsError(false)

    if (!email) {
      setMessage("Por favor, ingresa tu correo electrónico.")
      setIsError(true)
      return
    }

    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.")
      setIsError(false)
    } catch (error: any) {
      console.error(error)
      if (error.code === "auth/user-not-found") {
        setMessage("No existe una cuenta con este correo.")
      } else if (error.code === "auth/invalid-email") {
        setMessage("El correo ingresado no es válido.")
      } else {
        setMessage("Error al enviar el correo de recuperación.")
      }
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFECB3] via-[#FFE0B2] to-[#FFCCBC] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-4 border-[#FFD54F] shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-4xl">🔑</div>
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD54F] to-[#FFB300]">
                AvaLearn
              </span>
              <div className="text-4xl">🔒</div>
            </div>
            <CardTitle className="text-3xl font-black text-[#FFB300]">¿Olvidaste tu Contraseña?</CardTitle>
            <CardDescription className="text-lg text-gray-700 font-bold">
              Ingresa tu correo electrónico para restablecerla.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-lg font-bold text-[#FFB300]">
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
                    className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-[#FFECB3] focus:border-[#FFB300] focus:ring-2 focus:ring-[#FFD54F]/50 transition-all duration-200"
                    disabled={loading}
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
                disabled={loading}
                className="w-full py-6 text-xl bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFC107] hover:to-[#F57C00] text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Restablecer Contraseña <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/login">
                <Button variant="link" className="text-lg font-bold text-[#FFD54F] hover:text-[#FFB300] transition-colors duration-200">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Regresar al Inicio de Sesión
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}