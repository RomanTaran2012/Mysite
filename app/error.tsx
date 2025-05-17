"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RefreshCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Что-то пошло не так</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-full mx-auto mb-6" />
          <p className="text-white/70 mb-8">
            Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте обновить страницу.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => reset()}
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:bg-white/20 border border-white/20"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Попробовать снова
            </motion.button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                Вернуться на главную
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
