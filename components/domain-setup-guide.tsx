"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Copy, Globe, ExternalLink } from "lucide-react"

export function DomainSetupGuide() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const dnsRecords = [
    {
      id: "a-record",
      type: "A",
      name: "@",
      value: "76.76.21.21",
      description: "Основная A-запись для корневого домена",
    },
    {
      id: "cname-www",
      type: "CNAME",
      name: "www",
      value: "cname.vercel-dns.com.",
      description: "CNAME-запись для поддомена www",
    },
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6" /> Настройка собственного домена
        </CardTitle>
        <CardDescription>Следуйте этим шагам, чтобы подключить ваш домен к сайту на Vercel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Шаг 1: Войдите в панель управления Vercel</h3>
          <p className="text-sm text-muted-foreground">
            Перейдите на{" "}
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline inline-flex items-center"
            >
              vercel.com/dashboard <ExternalLink className="h-3 w-3 ml-1" />
            </a>{" "}
            и войдите в свой аккаунт.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Шаг 2: Выберите ваш проект</h3>
          <p className="text-sm text-muted-foreground">
            В списке проектов найдите "vozdushny-sevastopol" (или имя, которое вы дали проекту) и кликните на него.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Шаг 3: Перейдите в настройки доменов</h3>
          <p className="text-sm text-muted-foreground">
            В меню слева выберите "Domains" (Домены). Затем нажмите кнопку "Add" (Добавить).
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Шаг 4: Введите ваш домен</h3>
          <p className="text-sm text-muted-foreground">
            Введите домен, который вы хотите подключить (например, vozdushny-sevastopol.ru), и нажмите "Add" (Добавить).
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Шаг 5: Настройте DNS-записи</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Vercel предложит вам два варианта: использовать DNS-серверы Vercel или настроить записи у вашего текущего
            DNS-провайдера. Если вы выбираете второй вариант, добавьте следующие записи:
          </p>

          <div className="space-y-3">
            {dnsRecords.map((record) => (
              <div key={record.id} className="bg-black/30 rounded-md p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">
                    {record.type} запись: {record.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => copyToClipboard(record.value, record.id)}
                  >
                    {copied === record.id ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    {copied === record.id ? "Скопировано" : "Копировать"}
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <pre className="bg-black/50 p-2 rounded text-xs overflow-x-auto">{record.value}</pre>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{record.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Шаг 6: Проверьте настройки</h3>
          <p className="text-sm text-muted-foreground">
            Vercel автоматически проверит ваши DNS-настройки. Это может занять до 24 часов, но обычно происходит
            значительно быстрее. Когда статус домена изменится на "Valid Configuration" (Правильная конфигурация), ваш
            сайт будет доступен по новому домену.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Шаг 7: Настройте перенаправления (опционально)</h3>
          <p className="text-sm text-muted-foreground">
            Если вы хотите, чтобы все запросы с www.вашдомен.ru перенаправлялись на вашдомен.ru (или наоборот), вы
            можете настроить это в разделе "Redirects" (Перенаправления) в настройках проекта.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          После настройки домена обновите переменную окружения NEXT_PUBLIC_SITE_URL в настройках проекта на Vercel,
          указав ваш новый домен.
        </p>
      </CardFooter>
    </Card>
  )
}
