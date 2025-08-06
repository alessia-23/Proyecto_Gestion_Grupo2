"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, Flame, Coins, Target, User, ArrowRight, ArrowLeft, LogOut } from 'lucide-react'
import { useRouter } from "next/navigation"
import { motion } from "framer-motion" // Importar motion para animaciones

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Cargar los datos del usuario de localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser)
      } else {
        router.push("/login") // Redirigir si no está logueado
      }
    } else {
      router.push("/login") // Redirigir si no hay datos de usuario
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user") // Limpiar los datos del usuario de localStorage
    router.push("/login") // Redirigir a la página de inicio de sesión
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8E1] via-[#E3F2FD] to-[#F3E5F5] p-4">
        <div className="text-center">
          <div className="text-4xl animate-spin">🔄</div>
          <p className="text-xl font-bold text-gray-700 mt-4">Cargando tu panel...</p>
        </div>
      </div>
    )
  }

  const getLevelInfo = (level: string) => {
    const levels = {
      principiante: {
        title: "🌱 Súper Principiante",
        color: "bg-[#AED581]",
        icon: "🌟",
        bgGradient: "from-[#AED581]/30 to-[#4FC3F7]/20",
      },
      básico: {
        title: "📚 Explorador de Inglés",
        color: "bg-[#4FC3F7]",
        icon: "🎯",
        bgGradient: "from-[#4FC3F7]/30 to-[#CE93D8]/20",
      },
      intermedio: {
        title: "🎯 Aventurero Intermedio",
        color: "bg-[#CE93D8]",
        icon: "🚀",
        bgGradient: "from-[#CE93D8]/30 to-[#E57373]/20",
      },
      avanzado: {
        title: "🏆 Maestro del Inglés",
        color: "bg-[#FFA726]",
        icon: "👑",
        bgGradient: "from-[#FFA726]/30 to-[#FFEB3B]/20",
      },
    }
    return levels[user.englishLevel as keyof typeof levels] || levels.principiante // Usar user.englishLevel
  }

  const levelInfo = getLevelInfo(user.englishLevel || "principiante") // Usar user.englishLevel
  const userCoins = user.coins || 150
  const currentStreak = user.streak || 7
  const weeklyGoal = user.weeklyGoal || 75
  const currentProgress = user.completedLessons || 50 // Ejemplo de progreso para la semana

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#E3F2FD] to-[#F3E5F5] p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-4xl">✨</div>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#CE93D8] to-[#E57373]">
              AvaLearn
            </span>
            <div className="text-4xl">📚</div>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4FC3F7] to-[#CE93D8] mb-2">
            ¡Bienvenido, {user.username}!
          </h1>
          <p className="text-xl text-gray-700 font-bold">Tu panel de aprendizaje personalizado.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/">
              <Button variant="link" className="text-lg font-bold text-[#FFA726] hover:text-[#FFEB3B] transition-colors duration-200">
                <ArrowLeft className="mr-2 h-5 w-5" /> Regresar a Inicio
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-lg font-bold text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent transition-colors duration-200"
            >
              <LogOut className="mr-2 h-5 w-5" /> Cerrar Sesión
            </Button>
          </div>
        </motion.div>

        {/* Tarjetas de Resumen del Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#AED581] shadow-xl rounded-2xl text-center p-4">
              <User className="h-10 w-10 text-[#AED581] mx-auto mb-2" />
              <CardTitle className="text-xl font-black text-[#AED581]">Nivel</CardTitle>
              <CardDescription className="text-lg font-bold text-gray-700">{levelInfo.title}</CardDescription>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#FFD54F] shadow-xl rounded-2xl text-center p-4">
              <Coins className="h-10 w-10 text-[#FFD54F] fill-[#FFD54F] mx-auto mb-2" />
              <CardTitle className="text-xl font-black text-[#FFD54F]">Monedas</CardTitle>
              <CardDescription className="text-lg font-bold text-gray-700">{userCoins}</CardDescription>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#FFAB91] shadow-xl rounded-2xl text-center p-4">
              <Flame className="h-10 w-10 text-[#FFAB91] fill-[#FFAB91] mx-auto mb-2" />
              <CardTitle className="text-xl font-black text-[#FFAB91]">Racha</CardTitle>
              <CardDescription className="text-lg font-bold text-gray-700">{currentStreak} días</CardDescription>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#CE93D8] shadow-xl rounded-2xl text-center p-4">
              <Award className="h-10 w-10 text-[#CE93D8] fill-[#CE93D8] mx-auto mb-2" />
              <CardTitle className="text-xl font-black text-[#CE93D8]">Puntuación Test</CardTitle>
              <CardDescription className="text-lg font-bold text-gray-700">
                {user.testScore?.toFixed(0) || 0}%
              </CardDescription>
            </Card>
          </motion.div>
        </div>

        {/* Tarjetas de Acción Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#4FC3F7] shadow-xl rounded-3xl p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-black text-[#4FC3F7]">¡Continúa Aprendiendo!</CardTitle>
                <BookOpen className="h-8 w-8 text-[#4FC3F7]" />
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-gray-700 mb-4">
                  Sumérgete en tu próxima lección personalizada y avanza en tu inglés.
                </CardDescription>
                <Link href="/lessons">
                  <Button className="w-full py-6 text-xl bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] hover:from-[#29B6F6] hover:to-[#03A9F4] text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                    Ir a Lecciones <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#FFEB3B] shadow-xl rounded-3xl p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-black text-[#FFA726]">Progreso Semanal</CardTitle>
                <Target className="h-8 w-8 text-[#FFA726]" />
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-gray-700 mb-4">
                  Tu meta semanal es completar {weeklyGoal} puntos. Llevas {currentProgress}.
                </CardDescription>
                <Progress
                  value={(currentProgress / weeklyGoal) * 100}
                  className="h-4 bg-[#FFECB3] border-2 border-[#FFD54F]"
                />
                <p className="text-right text-sm text-gray-600 mt-2">
                  {currentProgress}/{weeklyGoal} puntos
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enlace a la Tienda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-xl text-gray-700 font-bold mb-4">¡Visita la Tienda Mágica para conseguir mejoras!</p>
          <Link href="/shop">
            <Button
              size="lg"
              variant="link"
              className="text-2xl font-black text-[#FF9800] hover:text-[#FFC107] flex items-center mx-auto transition-colors duration-200"
            >
              Ir a la Tienda <ArrowRight className="ml-2 h-7 w-7" />
            </Button>
          </Link>
        </motion.div>

        {/* Pie de página */}
        <div className="mt-12 text-center text-gray-600">
          <p>&copy; 2024 AvaLearn. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
