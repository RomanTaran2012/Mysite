export const dynamic = "force-static"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-full mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4">Страница не найдена</h2>
          <p className="text-white/70 mb-8">Извините, страница, которую вы ищете, не существует или была перемещена.</p>

          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:bg-white/20 border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
