"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion" // Importar motion y AnimatePresence

// Datos de las preguntas del cuestionario incrustados directamente en el frontend
const quizData = {
  "level_basic": [
    {
      "id": 1,
      "questions": [
        { "question": "What color is the sky?", "options": ["Blue", "Green", "Red", "Yellow"], "answer": "Blue" },
        { "question": "Choose the correct article: ___ apple", "options": ["a", "an", "the", "some"], "answer": "an" },
        { "question": "What is the opposite of 'hot'?", "options": ["cold", "warm", "cool", "heat"], "answer": "cold" },
        { "question": "Which one is a fruit?", "options": ["Chair", "Banana", "Rock", "Spoon"], "answer": "Banana" },
        { "question": "How do you say 'hola' in English?", "options": ["Bye", "Yes", "Hello", "Thanks"], "answer": "Hello" },
        { "question": "Complete: My name ___ Juan.", "options": ["is", "are", "am", "be"], "answer": "is" },
        { "question": "What number is 'diez'?", "options": ["5", "10", "15", "20"], "answer": "10" },
        { "question": "Which animal barks?", "options": ["Cat", "Dog", "Bird", "Horse"], "answer": "Dog" },
        { "question": "Where do you sleep?", "options": ["Kitchen", "Bathroom", "Bed", "Garden"], "answer": "Bed" },
        { "question": "What is the plural of 'libro'?", "options": ["Books", "Bookes", "Bookz", "Bookies"], "answer": "Books" }
      ]
    },
    {
      "id": 2,
      "questions": [
        { "question": "What day comes after Monday?", "options": ["Sunday", "Tuesday", "Wednesday", "Friday"], "answer": "Tuesday" },
        { "question": "What is the past tense of 'go'?", "options": ["gone", "went", "goes", "going"], "answer": "went" },
        { "question": "Complete: She ___ happy.", "options": ["are", "is", "am", "be"], "answer": "is" },
        { "question": "Which is not a color?", "options": ["Red", "Blue", "Tree", "Green"], "answer": "Tree" },
        { "question": "How much is 2 + 3?", "options": ["4", "5", "6", "7"], "answer": "5" },
        { "question": "What do you drink?", "options": ["Water", "Rock", "Chair", "Shirt"], "answer": "Water" },
        { "question": "How do you say 'gracias'?", "options": ["Sorry", "Please", "Thank you", "Hello"], "answer": "Thank you" },
        { "question": "Where is the sun?", "options": ["Sky", "Ocean", "Street", "Pocket"], "answer": "Sky" },
        { "question": "What is the opposite of 'big'?", "options": ["Tall", "Small", "Short", "Large"], "answer": "Small" },
        { "question": "What is a 'bolígrafo' used for?", "options": ["Eating", "Sleeping", "Writing", "Running"], "answer": "Writing" }
      ]
    },
    {
      "id": 3,
      "questions": [
        { "question": "How do you spell 'gato'?", "options": ["kat", "cat", "cut", "cot"], "answer": "cat" },
        { "question": "Where do birds live?", "options": ["Nest", "Desk", "Closet", "Box"], "answer": "Nest" },
        { "question": "Choose the correct word: The car is very ___.", "options": ["quickly", "slowly", "drive", "fast"], "answer": "fast" },
        { "question": "What does 'frío' mean?", "options": ["Hot", "Cold", "Noisy", "Dark"], "answer": "Cold" },
        { "question": "Which animal is green and jumps?", "options": ["Frog", "Fish", "Dog", "Bird"], "answer": "Frog" },
        { "question": "Choose the correct one: This ___ my book.", "options": ["is", "are", "am", "be"], "answer": "is" },
        { "question": "How many legs does a spider have?", "options": ["6", "8", "10", "4"], "answer": "8" },
        { "question": "Which one is a vegetable?", "options": ["Apple", "Carrot", "Banana", "Orange"], "answer": "Carrot" },
        { "question": "What do you use to see?", "options": ["Eyes", "Ears", "Hands", "Mouth"], "answer": "Eyes" },
        { "question": "Choose the correct word: He is very ___.", "options": ["happy", "run", "eat", "book"], "answer": "happy" }
      ]
    }
  ],
  "level_intermediate": [
    {
      "id": 1,
      "questions": [
        { "question": "Choose the correct sentence:", "options": ["She go to school.", "She goes to school.", "She went to school.", "She going to school."], "answer": "She goes to school." },
        { "question": "What is the past tense of 'eat'?", "options": ["Eaten", "Ate", "Eats", "Eating"], "answer": "Ate" },
        { "question": "Which one is an adjective?", "options": ["Quickly", "Quick", "Run", "Running"], "answer": "Quick" },
        { "question": "Complete: I have lived here ___ 2010.", "options": ["for", "since", "by", "from"], "answer": "since" },
        { "question": "What is a synonym for 'feliz'?", "options": ["Sad", "Happy", "Angry", "Hungry"], "answer": "Happy" },
        { "question": "He ___ to the gym every day.", "options": ["go", "goes", "going", "went"], "answer": "goes" },
        { "question": "Choose the correct question:", "options": ["Where he lives?", "Where does he live?", "Where live he?", "Where he does live?"], "answer": "Where does he live?" },
        { "question": "I am not good ___ math.", "options": ["in", "at", "on", "to"], "answer": "at" },
        { "question": "Which is a regular verb?", "options": ["Go", "Run", "Play", "Swim"], "answer": "Play" },
        { "question": "What is the plural of 'niño'?", "options": ["Children", "Childs", "Childrens", "Childen"], "answer": "Children" }
      ]
    },
    {
      "id": 2,
      "questions": [
        { "question": "What is the opposite of 'grande'?", "options": ["Small", "Big", "Tall", "Heavy"], "answer": "Small" },
        { "question": "Which is a body part?", "options": ["Hand", "Window", "Book", "Shoe"], "answer": "Hand" },
        { "question": "Which animal says 'meow'?", "options": ["Cat", "Dog", "Bird", "Fish"], "answer": "Cat" },
        { "question": "What do you wear on your feet?", "options": ["Shoes", "Shirt", "Hat", "Gloves"], "answer": "Shoes" },
        { "question": "How many days are in a week?", "options": ["5", "6", "7", "8"], "answer": "7" },
        { "question": "What do you drink?", "options": ["Water", "Book", "Pencil", "Phone"], "answer": "Water" },
        { "question": "Which is a color?", "options": ["Red", "Run", "Read", "Rain"], "answer": "Red" },
        { "question": "What comes after Monday?", "options": ["Tuesday", "Sunday", "Friday", "Thursday"], "answer": "Tuesday" },
        { "question": "What do you use to write?", "options": ["Pen", "Fork", "Key", "Bottle"], "answer": "Pen" },
        { "question": "How many fingers do you have?", "options": ["10", "5", "8", "6"], "answer": "10" }
      ]
    },
    {
      "id": 3,
      "questions": [
        { "question": "Which is a vegetable?", "options": ["Carrot", "Ball", "Shoe", "Phone"], "answer": "Carrot" },
        { "question": "What do you eat in the morning?", "options": ["Breakfast", "Dinner", "Snack", "Lunch"], "answer": "Breakfast" },
        { "question": "How much is 5 - 3?", "options": ["2", "1", "3", "4"], "answer": "2" },
        { "question": "Which is an animal?", "options": ["Dog", "Spoon", "Shirt", "Lamp"], "answer": "Dog" },
        { "question": "What is the opposite of 'happy'?", "options": ["Sad", "Funny", "Kind", "Cold"], "answer": "Sad" },
        { "question": "What color is grass?", "options": ["Green", "Blue", "Red", "Yellow"], "answer": "Green" },
        { "question": "What do you use to brush your teeth?", "options": ["Toothbrush", "Spoon", "Comb", "Soap"], "answer": "Toothbrush" },
        { "question": "How do you say 'gracias' in English?", "options": ["Thanks", "Please", "Sorry", "Hello"], "answer": "Thanks" },
        { "question": "Which is not a number?", "options": ["Seven", "Twenty", "Apple", "Ten"], "answer": "Apple" },
        { "question": "Which is a pet?", "options": ["Cat", "Cow", "Tiger", "Lion"], "answer": "Cat" }
      ]
    }
  ],
  "level_advanced": [
    {
      "id": 1,
      "questions": [
        { "question": "Choose the correct passive form: 'They built the house in 1990.'", "options": ["The house was built in 1990.", "The house is built in 1990.", "The house built in 1990.", "The house has built in 1990."], "answer": "The house was built in 1990." },
        { "question": "Which sentence uses a conditional correctly?", "options": ["If I will see him, I will tell him.", "If I saw him, I would tell him.", "If I see him, I told him.", "If I saw him, I will tell him."], "answer": "If I saw him, I would tell him." },
        { "question": "What is a synonym for 'sin embargo'?", "options": ["Nevertheless", "Because", "Therefore", "Unless"], "answer": "Nevertheless" },
        { "question": "Which is an example of reported speech?", "options": ["He says that he is tired.", "He said: 'I am tired.'", "He says: 'I am tired.'", "He says that he is tired."], "answer": "He says that he is tired." },
        { "question": "Which verb is not irregular?", "options": ["Buy", "Catch", "Talk", "Write"], "answer": "Talk" },
        { "question": "What is the meaning of the phrasal verb 'give up'?", "options": ["Surrender", "Continue", "Try", "Start"], "answer": "Surrender" },
        { "question": "Choose the correct sentence:", "options": ["I never saw that movie.", "I never seen that movie.", "I have never seen that movie.", "I never did see that movie."], "answer": "I have never seen that movie." },
        { "question": "What is the correct use of the subjunctive mood?", "options": ["If I were you, I would study.", "If I was you, I would study.", "If I am you, I would study.", "If I be you, I would study."], "answer": "If I were you, I would study." },
        { "question": "Which sentence has correct punctuation?", "options": ["He said: 'I am coming.'", "He said 'I am coming.'", "He said, I am coming.", "He said. 'I am coming'"], "answer": "He said: 'I am coming.'" },
        { "question": "What is a gerund?", "options": ["A noun formed from a verb + ing", "A past participle", "A present perfect tense", "An adverb ending in -ly"], "answer": "A noun formed from a verb + ing" }
      ]
    },
    {
      "id": 2,
      "questions": [
        { "question": "Choose the correct form: 'If I had known…'", "options": ["I would have acted differently.", "I would act differently.", "I had acted differently.", "I will have acted differently."], "answer": "I would have acted differently." },
        { "question": "Which is a modal verb?", "options": ["Should", "Was", "Did", "Am"], "answer": "Should" },
        { "question": "Identify the correct form: 'Neither the teacher nor the students ___ late.'", "options": ["are", "is", "was", "has been"], "answer": "are" },
        { "question": "What does 'albeit' mean?", "options": ["Although", "Therefore", "Because", "Unless"], "answer": "Although" },
        { "question": "Choose the correct use of the phrasal verb:", "options": ["He came up with a good idea.", "He put down a good idea.", "He went out a good idea.", "He came over a good idea."], "answer": "He came up with a good idea." },
        { "question": "Which is an example of inversion?", "options": ["Never have I seen such a mess.", "I have never seen such a mess.", "I never saw such a mess.", "Such a mess never I saw."], "answer": "Never have I seen such a mess." },
        { "question": "What is a collocation?", "options": ["A natural combination of words", "A synonym", "An adjective", "A verb form"], "answer": "A natural combination of words" },
        { "question": "What is the correct indirect question?", "options": ["Could you tell me where he lives?", "Could you tell me where does he live?", "Could you tell me where is he living?", "Could you tell me where he live?"], "answer": "Could you tell me where he lives?" },
        { "question": "Which is a formal connector?", "options": ["Furthermore", "So", "And", "But"], "answer": "Furthermore" },
        { "question": "Choose the correct sentence:", "options": ["Despite the rain, we went out.", "In spite the rain, we went out.", "Although the rain, we went out.", "Though the rain, we went out."], "answer": "Despite the rain, we went out." }
      ]
    },
    {
      "id": 3,
      "questions": [
        { "question": "What is an idiom?", "options": ["A phrase with a non-literal meaning", "A direct command", "A type of slang", "A formal writing style"], "answer": "A phrase with a non-literal meaning" },
        { "question": "Which word is a conjunction?", "options": ["Although", "Despite", "Due to", "However"], "answer": "Although" },
        { "question": "Choose the correct conditional:", "options": ["If she had studied, she would have passed.", "If she studies, she passed.", "If she studies, she would pass.", "If she studied, she passes."], "answer": "If she had studied, she would have passed." },
        { "question": "What is the passive voice of 'People speak English all over the world'?", "options": ["English is spoken all over the world.", "English speaks all over the world.", "English spoken all over the world.", "English is speaking all over the world."], "answer": "English is spoken all over the world." },
        { "question": "Choose the correct complex sentence:", "options": ["Although it was raining, we went out.", "It was raining, and we went out.", "It was raining. We went out.", "Though it was raining. We went out."], "answer": "Although it was raining, we went out." },
        { "question": "What is a synonym for 'beneficial'?", "options": ["Useful", "Harmful", "Dangerous", "Basic"], "answer": "Useful" },
        { "question": "Which is a noun clause?", "options": ["What he said was true.", "Although he said it, it was false.", "He said it loudly.", "After he said that."], "answer": "What he said was true." },
        { "question": "Choose the correct word order:", "options": ["Rarely do we see such honesty.", "We rarely see such honesty.", "Rarely we see such honesty.", "Such honesty rarely we see."], "answer": "Rarely do we see such honesty." },
        { "question": "Which is a metaphor?", "options": ["Time is a thief.", "Time passes quickly.", "Time runs fast.", "Time moves forward."], "answer": "Time is a thief." },
        { "question": "What is 'elision'?", "options": ["The omission of a sound or syllable", "A type of noun", "A way to emphasize a sentence", "A formal greeting"], "answer": "The omission of a sound or syllable" }
      ]
    }
  ]
};

interface Question {
  question: string
  options: string[]
  answer: string
}

interface QuizLevel {
  id: number;
  questions: Question[];
}

interface QuizData {
  level_basic: QuizLevel[];
  level_intermediate: QuizLevel[];
  level_advanced: QuizLevel[];
}

export default function LevelTestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos
  const [questions, setQuestions] = useState<Question[]>([])
  const router = useRouter()

  useEffect(() => {
    // Intentar cargar los datos del usuario de localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Usar los datos del cuestionario incrustados directamente
    // Para simplificar, usaremos las preguntas del primer test de nivel básico.
    // En una aplicación real, podrías seleccionar un test aleatorio o combinar preguntas.
    const basicLevelQuestions = quizData.level_basic[0]?.questions || [];
    setQuestions(basicLevelQuestions);

  }, [])

  useEffect(() => {
    // Lógica del temporizador
    if (timeLeft > 0 && !showResults && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && questions.length > 0) {
      handleFinishTest()
    }
  }, [timeLeft, showResults, questions.length])

  // Manejar la selección de una respuesta
  const handleAnswerSelect = (answerText: string) => {
    setSelectedAnswer(answerText)
  }

  // Pasar a la siguiente pregunta o finalizar el test
  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: selectedAnswer }))
      setSelectedAnswer("")

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        handleFinishTest()
      }
    }
  }

  // Finalizar el test y calcular resultados
  const handleFinishTest = () => {
    const finalAnswers = selectedAnswer ? { ...answers, [currentQuestionIndex]: selectedAnswer } : answers

    let correctAnswers = 0
    questions.forEach((question, index) => {
      const userAnswer = finalAnswers[index]
      if (userAnswer === question.answer) {
        correctAnswers++
      }
    })

    const percentage = (correctAnswers / questions.length) * 100
    let level = "principiante"

    if (percentage >= 80) level = "avanzado"
    else if (percentage >= 60) level = "intermedio"
    else if (percentage >= 40) level = "básico"

    // Actualizar los datos del usuario en localStorage
    if (user) {
      const updatedUser = { ...user, englishLevel: level, testScore: percentage } // Usar englishLevel
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } else {
      // Para usuarios de prueba o no logueados, solo establecer un resultado temporal
      setUser({ englishLevel: level, testScore: percentage, isTrial: true }) // Usar englishLevel
    }

    setShowResults(true)
  }

  // Formatear el tiempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Obtener información del nivel para mostrar en los resultados
  const getLevelInfo = (level: string) => {
    const levels = {
      principiante: {
        title: "🌱 Súper Principiante",
        description: "¡Perfecto para comenzar tu aventura de inglés!",
        color: "bg-[#AED581]",
        icon: "🌟",
        bgGradient: "from-[#AED581]/30 to-[#4FC3F7]/20",
      },
      básico: {
        title: "📚 Explorador de Inglés",
        description: "¡Ya sabes algunas cosas geniales de inglés!",
        color: "bg-[#4FC3F7]",
        icon: "🎯",
        bgGradient: "from-[#4FC3F7]/30 to-[#CE93D8]/20",
      },
      intermedio: {
        title: "🎯 Aventurero Intermedio",
        description: "¡Increíble! Tienes súper poderes en inglés",
        color: "bg-[#CE93D8]",
        icon: "🚀",
        bgGradient: "from-[#CE93D8]/30 to-[#E57373]/20",
      },
      avanzado: {
        title: "🏆 Maestro del Inglés",
        description: "¡WOW! Eres un súper genio del inglés",
        color: "bg-[#FFA726]",
        icon: "👑",
        bgGradient: "from-[#FFA726]/30 to-[#FFEB3B]/20",
      },
    }
    return levels[level as keyof typeof levels] || levels.principiante
  }

  // Mostrar pantalla de carga si las preguntas aún no se han cargado
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8E1] via-[#E3F2FD] to-[#F3E5F5] p-4">
        <div className="text-center">
          <div className="text-4xl animate-spin">🔄</div>
          <p className="text-xl font-bold text-gray-700 mt-4">Cargando tu aventura de inglés...</p>
        </div>
      </div>
    )
  }

  // Mostrar resultados del test
  if (showResults) {
    const levelInfo = getLevelInfo(user?.englishLevel || "principiante") // Usar englishLevel

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#E3F2FD] to-[#F3E5F5] p-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-4xl">📚</div>
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#CE93D8] to-[#E57373]">
                AvaLearn
              </span>
              <div className="text-4xl">✨</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card
              className={`text-center bg-gradient-to-br ${levelInfo.bgGradient} border-4 border-[#CE93D8] shadow-2xl rounded-3xl`}
            >
              <CardHeader>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-[#AED581] to-[#4FC3F7] rounded-full flex items-center justify-center mb-4 text-4xl"
                >
                  🎉
                </motion.div>
                <CardTitle className="text-4xl text-[#CE93D8] font-black">¡Test de Inglés Completado! 🎊</CardTitle>
                <CardDescription className="text-2xl text-gray-700 font-bold">
                  ¡Hemos preparado lecciones súper divertidas especialmente para ti! 📚
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className={`bg-gradient-to-r ${levelInfo.bgGradient} rounded-3xl p-8 border-4 border-[#CE93D8]`}>
                  <div className="text-8xl mb-4">{levelInfo.icon}</div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">{levelInfo.title}</h3>
                  <p className="text-xl text-gray-700 mb-6 font-bold">{levelInfo.description}</p>
                  <div
                    className={`inline-block px-8 py-4 rounded-full text-white text-2xl font-black ${levelInfo.color}`}
                  >
                    🌟 Puntuación: {user?.testScore?.toFixed(0)}% 🌟
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-2xl font-black text-[#CE93D8]">🎯 ¿Qué sigue en tu aventura de inglés?</h4>
                  <div className="grid gap-6 text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-start space-x-4 p-4 bg-[#4FC3F7]/20 rounded-2xl border-3 border-[#4FC3F7]"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#4FC3F7] to-[#CE93D8] rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                        📚
                      </div>
                      <div>
                        <p className="text-xl font-black text-[#4FC3F7]">¡Lecciones Personalizadas!</p>
                        <p className="text-lg text-gray-700 font-semibold">
                          Recibirás lecciones de inglés súper divertidas para tu nivel {levelInfo.title.toLowerCase()}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="flex items-start space-x-4 p-4 bg-[#CE93D8]/20 rounded-2xl border-3 border-[#CE93D8]"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#CE93D8] to-[#E57373] rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                        🎮
                      </div>
                      <div>
                        <p className="text-xl font-black text-[#CE93D8]">¡Juegos Geniales!</p>
                        <p className="text-lg text-gray-700 font-semibold">
                          Juega y aprende vocabulario y gramática de inglés
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      className="flex items-start space-x-4 p-4 bg-[#AED581]/20 rounded-2xl border-3 border-[#AED581]"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#AED581] to-[#FFEB3B] rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                        📊
                      </div>
                      <div>
                        <p className="text-xl font-black text-[#AED581]">¡Súper Seguimiento!</p>
                        <p className="text-lg text-gray-700 font-semibold">
                          Ve tu progreso y gana estrellitas por cada lección completada
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {user?.isTrial ? (
                  <div className="space-y-4">
                    <p className="text-xl font-bold text-[#E57373]">
                      ¡Para guardar tu progreso y desbloquear más aventuras, regístrate ahora!
                    </p>
                    <Link href="/register">
                      <Button
                        size="lg"
                        className="w-full text-2xl py-8 bg-gradient-to-r from-[#E57373] to-[#CE93D8] hover:from-[#F44336] hover:to-[#BA68C8] text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        🌟 ¡Crear mi Cuenta Gratis!
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full text-2xl py-8 bg-white/80 backdrop-blur-sm border-4 border-[#4FC3F7] text-[#4FC3F7] hover:bg-[#4FC3F7] hover:text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <ArrowLeft className="mr-3 h-6 w-6" /> Regresar a Inicio
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="w-full text-2xl py-8 bg-gradient-to-r from-[#CE93D8] to-[#E57373] hover:from-[#BA68C8] hover:to-[#F44336] text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      📚 ¡Ir a mi Panel de Aprendizaje!
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#E3F2FD] to-[#F3E5F5] p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Encabezado del Test */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-4xl">🧪</div>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#CE93D8] to-[#E57373]">
              AvaLearn
            </span>
            <div className="text-4xl">📚</div>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4FC3F7] to-[#CE93D8] mb-2">
            🎯 ¡Test de Inglés Súper Divertido!
          </h1>
          <p className="text-xl text-gray-700 font-bold">
            🌟 Responde estas preguntas para recibir lecciones perfectas para ti
          </p>
          <div className="mt-4">
            <Link href="/">
              <Button variant="link" className="text-lg font-bold text-[#FFA726] hover:text-[#FFEB3B] transition-colors duration-200">
                <ArrowLeft className="mr-2 h-5 w-5" /> Regresar a la Página Principal
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Progreso y Temporizador */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-[#CE93D8]">
              📚 Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <div className="flex items-center space-x-2 text-lg text-[#FFA726] bg-[#FFA726]/20 px-4 py-2 rounded-full border-3 border-[#FFA726]">
              <Clock className="h-5 w-5" />
              <span className="font-black">⏰ {formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress
            value={((currentQuestionIndex + 1) / questions.length) * 100}
            className="h-4 bg-[#CE93D8]/20 border-3 border-[#CE93D8]"
          />
        </motion.div>

        {/* Tarjeta de Pregunta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex} // Cambiar la clave para forzar la re-renderización y animación
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-[#4FC3F7]/20 via-[#CE93D8]/10 to-[#E57373]/20 border-4 border-[#CE93D8] shadow-2xl rounded-3xl">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">🤔</div>
                <CardTitle className="text-2xl text-[#CE93D8] font-black">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                  <div className="space-y-4">
                    {currentQuestion.options.map((option, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3"
                      >
                        <RadioGroupItem
                          value={option}
                          id={`option-${idx}`}
                          className="text-[#CE93D8] border-2 border-[#CE93D8]"
                        />
                        <Label
                          htmlFor={`option-${idx}`}
                          className="flex-1 cursor-pointer p-4 rounded-2xl border-3 border-[#CE93D8] hover:bg-[#CE93D8]/10 transition-all duration-200 text-lg font-bold bg-white/80 backdrop-blur-sm"
                        >
                          {option}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-8 flex justify-between">
                  <div></div>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="px-8 py-4 text-xl bg-gradient-to-r from-[#AED581] to-[#4FC3F7] hover:from-[#8BC34A] hover:to-[#29B6F6] text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {currentQuestionIndex === questions.length - 1 ? "🎉 ¡Terminar Test!" : "➡️ ¡Siguiente!"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Información Adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center p-4 bg-[#FFEB3B]/30 rounded-2xl border-3 border-[#FFA726]"
        >
          <p className="text-lg text-[#FFA726] font-black">
            🌟 Este test nos ayuda a crear las lecciones de inglés perfectas para ti 📚
          </p>
        </motion.div>
      </div>
    </div>
  )
}
