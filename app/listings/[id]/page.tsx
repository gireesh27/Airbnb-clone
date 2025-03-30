
import { ListingDetail } from "@/components/listing-detail"
import { SearchBar } from "@/components/search-bar"
import React from "react";
import { Suspense } from "react"

export default  function ListingPage({ params }: { params: { id: string } }) {
  const act_id = params.id
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar />
        <Suspense fallback={<div className="mt-8 text-center">Loading listing details...</div>}>
          <ListingDetail id={act_id} />
        </Suspense>
      </div>
    </main>
  )
}

