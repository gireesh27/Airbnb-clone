import { SearchBar } from "@/components/search-bar"
import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { BackgroundAnimation } from "@/components/animations/background-animation"
import { PlaneAnimation } from "@/components/animations/plane-animation"
import { ThreeScene } from "@/components/animations/three-scene"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThreeScene />
      <BackgroundAnimation />
      <PlaneAnimation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar />
        <Suspense fallback={<div className="mt-8 text-center">Loading listings...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  )
}

