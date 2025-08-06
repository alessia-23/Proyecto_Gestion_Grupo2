"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion" // Importar motion para animaciones

interface Avatar {
  id: number
  name: string
  image: string
}

const avatars: Avatar[] = [
  { id: 1, name: "Astro", image: "/placeholder.svg?height=100&width=100&text=Astro" },
  { id: 2, name: "Robotín", image: "/placeholder.svg?height=100&width=100&text=Robotín" },
  { id: 3, name: "Hada Mágica", image: "/placeholder.svg?height=100&width=100&text=Hada" },
  { id: 4, name: "Dragón Amigable", image: "/placeholder.svg?height=100&width=100&text=Dragón" },
  { id: 5, name: "Explorador", image: "/placeholder.svg?height=100&width=100&text=Explorador" },
  { id: 6, name: "Estrella", image: "/placeholder.svg?height=100&width=100&text=Estrella" },
]

export default function AvatarSelectionPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null)
  const [user, setUser] = useState<any>(null) // Estado para el usuario
  const router = useRouter()

  useEffect(() => {
    // Cargar los datos del usuario de localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      // Pre-seleccionar el avatar si ya existe uno guardado
      if (parsedUser.avatar) {
        const currentAvatar = avatars.find(a => a.image === parsedUser.avatar);
        if (currentAvatar) {
          setSelectedAvatar(currentAvatar);
        }
      }
    } else {
      // Redirigir si no hay usuario logueado
      router.push("/login");
    }
  }, [router]);

  const handleSelectAvatar = (avatar: Avatar) => {
    setSelectedAvatar(avatar)
  }

  const handleConfirmSelection = () => {
    if (selectedAvatar && user) {
      // Actualizar el avatar en el objeto de usuario y guardar en localStorage
      const updatedUser = { ...user, avatar: selectedAvatar.image };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("Avatar seleccionado y guardado:", selectedAvatar.name);
      router.push("/dashboard"); // Redirigir al panel después de la selección
    } else {
      alert("Por favor, selecciona un avatar para continuar.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F5E9] via-[#E0F7FA] to-[#F3E5F5] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-3xl bg-white/80 backdrop-blur-sm border-4 border-[#AED581] shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-4xl">✨</div>
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] to-[#4CAF50]">
                AvaLearn
              </span>
              <div className="text-4xl">🌟</div>
            </div>
            <CardTitle className="text-3xl font-black text-[#4CAF50]">¡Elige tu Compañero de Aventura!</CardTitle>
            <CardDescription className="text-lg text-gray-700 font-bold">
              Selecciona el avatar que te acompañará en tu viaje de aprendizaje.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
              {avatars.map((avatar, index) => (
                <motion.div
                  key={avatar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                  className={`relative flex flex-col items-center p-4 rounded-2xl border-4 cursor-pointer transition-all duration-300 ${
                    selectedAvatar?.id === avatar.id
                      ? "border-[#4CAF50] bg-[#E8F5E9] shadow-lg scale-105"
                      : "border-[#AED581] bg-white/70 hover:bg-[#F1F8E9]"
                  }`}
                  onClick={() => handleSelectAvatar(avatar)}
                >
                  <img
                    src={avatar.image || "/placeholder.svg"}
                    alt={avatar.name}
                    width={100}
                    height={100}
                    className="rounded-full mb-3 border-2 border-[#4CAF50]"
                  />
                  <span className="text-lg font-bold text-gray-800">{avatar.name}</span>
                  {selectedAvatar?.id === avatar.id && (
                    <CheckCircle className="absolute top-2 right-2 h-6 w-6 text-[#4CAF50] fill-[#4CAF50] animate-in zoom-in duration-300" />
                  )}
                </motion.div>
              ))}
            </div>
            <Button
              onClick={handleConfirmSelection}
              disabled={!selectedAvatar}
              className="w-full py-6 text-xl bg-gradient-to-r from-[#8BC34A] to-[#4CAF50] hover:from-[#689F38] hover:to-[#388E3C] text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Confirmar Selección <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <div className="mt-4 text-center">
              <Link href="/">
                <Button variant="link" className="text-lg font-bold text-[#8BC34A] hover:text-[#4CAF50] transition-colors duration-200">
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
