"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Copy, Github, Terminal, BellIcon as Vercel } from "lucide-react"

export function DeploymentGuide() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const deployCommands = [
    {
      id: "install",
      title: "Установка зависимостей",
      command: "npm install",
      description: "Установка всех необходимых пакетов для проекта",
    },
    {
      id: "build",
      title: "Сборка проекта",
      command: "npm run build",
      description: "Создание оптимизированной версии сайта для продакшена",
    },
    {
      id: "deploy",
      title: "Развертывание",
      command: "npx vercel deploy --prod",
      description: "Развертывание сайта на платформе Vercel",
    },
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Vercel className="h-6 w-6" /> Руководство по развертыванию
        </CardTitle>
        <CardDescription>Следуйте этим шагам, чтобы развернуть ваш сайт на платформе Vercel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Github className="h-5 w-5" /> Шаг 1: Загрузите код на GitHub
          </h3>
          <p className="text-sm text-muted-foreground">
            Создайте репозиторий на GitHub и загрузите туда код вашего проекта.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Vercel className="h-5 w-5" /> Шаг 2: Подключите репозиторий к Vercel
          </h3>
          <p className="text-sm text-muted-foreground">
            Зайдите на{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              vercel.com
            </a>
            , создайте аккаунт, нажмите "Add New..." и выберите "Project". Затем выберите ваш репозиторий из списка.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Terminal className="h-5 w-5" /> Шаг 3: Команды для локального развертывания
          </h3>
          <div className="space-y-3">
            {deployCommands.map((item) => (
              <div key={item.id} className="bg-black/30 rounded-md p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{item.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => copyToClipboard(item.command, item.id)}
                  >
                    {copied === item.id ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    {copied === item.id ? "Скопировано" : "Копировать"}
                  </Button>
                </div>
                <pre className="bg-black/50 p-2 rounded text-xs overflow-x-auto">{item.command}</pre>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          После развертывания ваш сайт будет доступен по адресу https://[имя-проекта].vercel.app
        </p>
      </CardFooter>
    </Card>
  )
}
