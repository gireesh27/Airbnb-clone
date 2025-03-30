import Image from "next/image"
import Link from "next/link"
import type { Listing } from "@/types/listing"
import { Star } from "lucide-react"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  const { id, title, location, price_per_night, currency, ratings, images } = listing

  // Get the first image or use a placeholder
  const imageUrl = images && images.length > 0 ? images[0].image_url : `/placeholder.svg?height=300&width=400`

  return (
    <Link href={`/listings/${id}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority
        />
      </div>

      <div className="mt-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 truncate">{title}</h3>
          {ratings && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-rose-500 fill-rose-500" />
              <span className="ml-1 text-sm">{ratings}</span>
            </div>
          )}
        </div>

        <p className="text-gray-500 text-sm">{location}</p>
        <p className="mt-1">
          <span className="font-semibold">
            {currency} {price_per_night}
          </span>
          <span className="text-gray-500"> night</span>
        </p>
      </div>
    </Link>
  )
}

