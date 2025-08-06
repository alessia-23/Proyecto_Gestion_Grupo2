"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Coins, ShoppingCart, Gem, Zap } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion" // Importar motion para animaciones

interface Item {
  id: number
  name: string
  description: string
  price: number
  icon: React.ElementType
}

const shopItems: Item[] = [
  { id: 1, name: "Poción de Energía", description: "Recarga tu energía para más lecciones.", price: 50, icon: Zap },
  { id: 2, name: "Gema de Sabiduría", description: "Duplica tus monedas en la próxima lección.", price: 100, icon: Gem },
  { id: 3, name: "Escudo Protector", description: "Protege tu racha de un día perdido.", price: 75, icon: Shield },
  { id: 4, name: "Libro Mágico", description: "Desbloquea un tema de lección avanzado.", price: 200, icon: BookOpen },
]

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFDE7] via-[#FFF8E1] to-[#FFECB3] p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="text-4xl">🛍️</div>
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD54F] to-[#FFA726]">
            AvaLearn Shop
          </span>
          <div className="text-4xl">✨</div>
        </div>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFECB3] to-[#FFD54F] mb-2">
          ¡Tienda Mágica!
        </h1>
        <p className="text-xl text-gray-700 font-bold">
          Usa tus monedas para conseguir increíbles mejoras.
        </p>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button variant="link" className="text-lg font-bold text-[#FFA726] hover:text-[#FFD54F] transition-colors duration-200">
              <ArrowLeft className="mr-2 h-5 w-5" /> Regresar al Panel
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {shopItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-4 border-[#FFECB3] shadow-xl rounded-3xl p-6 text-center">
              <item.icon className="h-12 w-12 text-[#FFA726] mx-auto mb-4" />
              <CardTitle className="text-2xl font-black text-[#FFA726] mb-2">{item.name}</CardTitle>
              <CardDescription className="text-lg text-gray-700 mb-4">
                {item.description}
              </CardDescription>
              <div className="flex items-center justify-center text-2xl font-black text-[#FFD54F] mb-4">
                <Coins className="h-6 w-6 mr-2 fill-[#FFD54F]" /> {item.price}
              </div>
              <Button className="w-full py-4 text-lg bg-gradient-to-r from-[#FFD54F] to-[#FFA726] hover:from-[#FFC107] hover:to-[#FB8C00] text-white font-black rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
                Comprar <ShoppingCart className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>&copy; 2024 AvaLearn. Todos los derechos reservados.</p>
      </div>
    </div>
  )
}
