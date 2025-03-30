import { SearchBar } from "@/components/search-bar"
import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar />
        <Suspense fallback={<div className="mt-8 text-center">Loading listings...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  )
}