export const dynamic = "force-static"

import { DomainSetupGuide } from "@/components/domain-setup-guide"

export default function DomainSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Настройка домена</h1>
        <DomainSetupGuide />
      </div>
    </div>
  )
}
