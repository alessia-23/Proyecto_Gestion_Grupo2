"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion" // Importar motion para animaciones

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E0F7FA] via-[#E3F2FD] to-[#F3E5F5] p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center space-x-4 mb-6">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl"
          >
            ✨
          </motion.div>
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] drop-shadow-lg">
            AvaLearn
          </h1>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl"
          >
            📚
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl text-gray-700 font-bold max-w-2xl mx-auto leading-relaxed"
        >
          ¡Tu aventura para dominar el inglés comienza aquí! Lecciones personalizadas, juegos divertidos y seguimiento de progreso.
        </motion.p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/register">
            <Button
              size="lg"
              className="w-full sm:w-auto px-10 py-6 text-2xl bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] hover:from-[#26C6DA] hover:to-[#00ACC1] text-white font-black rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              ¡Regístrate Gratis!
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-10 py-6 text-2xl bg-white/80 backdrop-blur-sm border-4 border-[#4DD0E1] text-[#00BCD4] hover:bg-[#4DD0E1] hover:text-white font-black rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Iniciar Sesión
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 text-center"
      >
        <Link href="/level-test">
          <Button variant="link" className="text-xl font-bold text-[#00BCD4] hover:text-[#4DD0E1] transition-colors duration-200">
            ¿No estás seguro de tu nivel? Haz nuestro test rápido.
          </Button>
        </Link>
      </motion.div>

      <div className="mt-20 text-center text-gray-600">
        <p>&copy; 2025 AvaLearn. Todos los derechos reservados.</p>
      </div>
    </div>
  )
}
