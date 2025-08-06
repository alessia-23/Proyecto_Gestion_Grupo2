"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, Users, BookOpen, Settings } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion" // Importar motion para animaciones

export default function TutorDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F0F4C3] via-[#DCEDC8] to-[#C8E6C9] p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="text-4xl">👨‍🏫</div>
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] to-[#689F38]">
            AvaLearn Tutor
          </span>
          <div className="text-4xl">👩‍🏫</div>
        </div>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A5D6A7] to-[#66BB6A] mb-2">
          Panel del Tutor
        </h1>
        <p className="text-xl text-gray-700 font-bold">
          Gestiona tus estudiantes y lecciones.
        </p>
        <div className="mt-4">
          <Link href="/">
            <Button variant="link" className="text-lg font-bold text-[#8BC34A] hover:text-[#689F38] transition-colors duration-200">
              <ArrowLeft className="mr-2 h-5 w-5" /> Regresar a la Página Principal
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#A5D6A7] shadow-xl rounded-3xl p-6 text-center">
            <MessageSquare className="h-12 w-12 text-[#A5D6A7] mx-auto mb-4" />
            <CardTitle className="text-2xl font-black text-[#A5D6A7] mb-2">Mensajes</CardTitle>
            <CardContent className="text-lg text-gray-700">
              Comunícate con tus estudiantes.
            </CardContent>
            <Button className="mt-4 w-full py-4 text-lg bg-gradient-to-r from-[#A5D6A7] to-[#66BB6A] hover:from-[#81C784] hover:to-[#4CAF50] text-white font-black rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
              Ver Mensajes
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#FFCC80] shadow-xl rounded-3xl p-6 text-center">
            <Users className="h-12 w-12 text-[#FFCC80] mx-auto mb-4" />
            <CardTitle className="text-2xl font-black text-[#FFCC80] mb-2">Estudiantes</CardTitle>
            <CardContent className="text-lg text-gray-700">
              Gestiona la lista de tus estudiantes.
            </CardContent>
            <Button className="mt-4 w-full py-4 text-lg bg-gradient-to-r from-[#FFCC80] to-[#FFA726] hover:from-[#FFB74D] hover:to-[#FB8C00] text-white font-black rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
              Ver Estudiantes
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#B39DDB] shadow-xl rounded-3xl p-6 text-center">
            <BookOpen className="h-12 w-12 text-[#B39DDB] mx-auto mb-4" />
            <CardTitle className="text-2xl font-black text-[#B39DDB] mb-2">Lecciones</CardTitle>
            <CardContent className="text-lg text-gray-700">
              Crea y asigna nuevas lecciones.
            </CardContent>
            <Button className="mt-4 w-full py-4 text-lg bg-gradient-to-r from-[#B39DDB] to-[#9575CD] hover:from-[#9575CD] hover:to-[#7E57C2] text-white font-black rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
              Gestionar Lecciones
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#81D4FA] shadow-xl rounded-3xl p-6 text-center">
            <Settings className="h-12 w-12 text-[#81D4FA] mx-auto mb-4" />
            <CardTitle className="text-2xl font-black text-[#81D4FA] mb-2">Configuración</CardTitle>
            <CardContent className="text-lg text-gray-700">
              Ajusta la configuración de tu perfil de tutor.
            </CardContent>
            <Button className="mt-4 w-full py-4 text-lg bg-gradient-to-r from-[#81D4FA] to-[#4FC3F7] hover:from-[#4FC3F7] hover:to-[#29B6F6] text-white font-black rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
              Ajustes
            </Button>
          </Card>
        </motion.div>
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>&copy; 2024 AvaLearn. Todos los derechos reservados.</p>
      </div>
    </div>
  )
}
