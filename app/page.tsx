"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ExternalLink, Cloud, Wind, Settings, Globe } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  const [isVisible, setIsVisible] = useState(false)
  const [text, setText] = useState("")
  const fullText = "Воздушный Севастополь"
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsVisible(true)

    // Безопасно получаем размеры окна только на клиенте
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Эффект печатающей машинки
  useEffect(() => {
    if (!isMounted) return

    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [isMounted])

  // Если компонент не смонтирован (серверный рендеринг), возвращаем заглушку
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">Воздушный Севастополь</h1>
          <p className="text-white/80">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Фоновое изображение с параллакс-эффектом */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/images/background.png')`,
          transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0005})`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Анимированные облака */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-1">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute text-white/30"
            initial={{
              x: -100,
              y: Math.random() * windowSize.height,
              opacity: 0.3 + Math.random() * 0.4,
              scale: 0.5 + Math.random() * 2,
            }}
            animate={{
              x: windowSize.width + 100,
              opacity: [0.3 + Math.random() * 0.4, 0.5, 0.3 + Math.random() * 0.4],
            }}
            transition={{
              duration: 30 + Math.random() * 60,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              opacity: {
                duration: 5 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          >
            <Cloud size={30 + Math.random() * 50} />
          </motion.div>
        ))}
      </div>

      {/* Затемнение фона для лучшей читаемости с градиентом */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-0"></div>

      {/* Основной контент */}
      <div className="relative z-10">
        {/* Главный экран */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.div style={{ opacity, scale, y }} className="flex flex-col items-center">
            <motion.div
              className="mb-4 text-white/80"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Wind className="w-12 h-12 mx-auto" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wider relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="relative">
                {text}
                <motion.span
                  className="absolute -right-4 top-0 h-full w-[3px] bg-white"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
              </span>
            </motion.h1>

            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-full my-6"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />

            <motion.p
              className="text-white/80 max-w-md text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Проект, который стремится улучшить город героев Севастополь
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-16 animate-bounce"
          >
            <ArrowDown className="w-10 h-10 text-white" />
          </motion.div>
        </section>

        {/* Вкладки с информацией */}
        <div className="max-w-4xl mx-auto px-4 pb-24">
          {/* Первая вкладка */}
          <motion.section
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center mb-4"
            >
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 via-white to-red-500 rounded-full mr-3" />
              <h2 className="text-2xl font-bold text-white">Связь с нами</h2>
            </motion.div>
            <p className="text-white/90 leading-relaxed">
              Если вы хотите слить какую либо особь вам не обходимо написать в лс создателю его юз в тг{" "}
              <motion.a
                href="https://t.me/finansovs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                @finansovs <ExternalLink className="ml-1 w-4 h-4" />
              </motion.a>{" "}
              пишите вежливо и конструктивно.
            </p>
          </motion.section>

          {/* Вторая вкладка */}
          <motion.section
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center mb-4"
            >
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 via-white to-red-500 rounded-full mr-3" />
              <h2 className="text-2xl font-bold text-white">О нашем канале</h2>
            </motion.div>
            <p className="text-white/90 leading-relaxed">
              Наш телеграмм канал создан в развлекательно юмористических целях. Все слитые люди актеры или добровольцы!
            </p>
          </motion.section>

          {/* Третья вкладка */}
          <motion.section
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center mb-4"
            >
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 via-white to-red-500 rounded-full mr-3" />
              <h2 className="text-2xl font-bold text-white">Наш канал</h2>
            </motion.div>
            <p className="text-white/90 leading-relaxed mb-4">Всегда актуальная ссылка на наш телеграмм канал:</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center">
              <Link
                href="https://t.me/+-J5H3TY0D-RkOTdh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(255,255,255,0)",
                      "0 0 15px rgba(255,255,255,0.5)",
                      "0 0 5px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center"
                >
                  Перейти в Telegram <ExternalLink className="ml-2 w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.section>

          {/* Дополнительная информация */}
          <motion.section
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-white/90 leading-relaxed">
              Этот телеграмм канал старается улучшить город героев Севастополь. Наш проект вырастит и все будут о нас
              знать спасибо за внимание.
            </p>
          </motion.section>

          {/* Ссылки на служебные страницы */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/deployment"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5 mr-2" />
              Инструкция по развертыванию
            </Link>

            <Link
              href="/domain-setup"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <Globe className="w-5 h-5 mr-2" />
              Настройка домена
            </Link>
          </motion.div>
        </div>

        {/* Футер */}
        <footer className="relative z-10 text-center text-white/70 py-6 border-t border-white/10 backdrop-blur-md bg-black/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>© 2025 Воздушный Севастополь. Все права защищены.</p>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-full mx-auto mt-2"
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </footer>
      </div>

      {/* Плавающие элементы для эффектности */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Анимированные частицы */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-1">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, windowSize.height],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </main>
  )
}
