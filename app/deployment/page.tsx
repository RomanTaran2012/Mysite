export const dynamic = "force-static"

import { DeploymentGuide } from "@/components/deployment-guide"

export default function DeploymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Развертывание сайта</h1>
        <DeploymentGuide />
      </div>
    </div>
  )
}
