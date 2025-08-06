"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase-config"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [rol, setRol] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsError(false)

    if (!username || !email || !password || !confirmPassword || !rol) {
      setMessage("Por favor, completa todos los campos.")
      setIsError(true)
      return
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.")
      setIsError(true)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, { displayName: username })

      // Guardar info adicional en Firestore
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: username,
        rol: rol
      })

      setMessage("¡Registro exitoso! Redirigiendo al test de nivel...")
      setIsError(false)

      setTimeout(() => {
        router.push("/level-test")
      }, 1500)

    } catch (error: any) {
      console.error("Error de Firebase:", error) // Mantener el log para depuración
      setIsError(true)
      let errorMessage = "Error al registrarse. Por favor, inténtalo de nuevo."

      // Manejo de errores específicos de Firebase
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Este correo ya está registrado. Por favor, usa otro."
          break
        case 'auth/weak-password':
          errorMessage = "La contraseña debe tener al menos 6 caracteres."
          break
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico es inválido."
          break
        default:
          errorMessage = "Ha ocurrido un error inesperado. Inténtalo más tarde."
          break
      }
      
      setMessage(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E3F2FD] via-[#FCE4EC] to-[#F3E5F5] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-4 border-[#BBDEFB] shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-4xl">🚀</div>
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#64B5F6] to-[#2196F3]">
                AvaLearn
              </span>
              <div className="text-4xl">✨</div>
            </div>
            <CardTitle className="text-3xl font-black text-[#2196F3]">¡Únete a la Aventura!</CardTitle>
            <CardDescription className="text-lg text-gray-700 font-bold">
              Crea tu cuenta gratis y comienza a aprender inglés.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-lg font-bold text-[#2196F3]">
                  Nombre de Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Tu nombre de usuario"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-[#90CAF9] focus:border-[#2196F3]"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-lg font-bold text-[#2196F3]">
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
                    className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-[#90CAF9] focus:border-[#2196F3]"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-lg font-bold text-[#2196F3]">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Crea una contraseña segura"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-[#90CAF9] focus:border-[#2196F3]"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-lg font-bold text-[#2196F3]">
                  Confirmar Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-[#90CAF9] focus:border-[#2196F3]"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rol" className="text-lg font-bold text-[#2196F3]">
                  Rol
                </Label>
                <select
                  id="rol"
                  required
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  className="w-full py-4 px-4 text-lg rounded-xl border-2 border-[#90CAF9] focus:border-[#2196F3] focus:ring-2 focus:ring-[#64B5F6]/50 transition-all duration-200"
                >
                  <option value="">Selecciona un rol</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              {message && (
                <p className={`text-center text-lg font-semibold ${isError ? "text-red-600" : "text-green-600"}`}>
                  {message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full py-6 text-xl bg-gradient-to-r from-[#64B5F6] to-[#2196F3] hover:from-[#42A5F5] hover:to-[#1976D2] text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Registrarme <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login">
                <Button variant="link" className="text-lg font-bold text-[#64B5F6] hover:text-[#2196F3]">
                  ¿Ya tienes una cuenta? Inicia Sesión
                </Button>
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link href="/">
                <Button variant="link" className="text-lg font-bold text-[#64B5F6] hover:text-[#2196F3]">
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