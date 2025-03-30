"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ListingCard } from "@/components/listing-card"
import type { Listing } from "@/types/listing"
<<<<<<< HEAD
import { motion } from "framer-motion"
=======
>>>>>>> fe79db3 (ok)

export function SearchResults() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

<<<<<<< HEAD
  // Add this mock data at the top of the component, after the useState declarations
=======
>>>>>>> fe79db3 (ok)
  const mockListings: Listing[] = [
    {
      id: 1,
      title: "Luxury Apartment with Ocean View",
      location: "Miami, Florida",
      address: "123 Ocean Drive, Miami, FL",
      price_per_night: 250,
      currency: "USD",
      total_price: 1250,
      ratings: 4.9,
      reviews: 124,
      description:
        "Stunning luxury apartment with panoramic ocean views. This spacious 2-bedroom unit features modern furnishings, a fully equipped kitchen, and a private balcony overlooking the Atlantic Ocean.",
      property_type: "Entire apartment",
      host: {
        name: "Sarah",
        image_url: "/placeholder.svg?height=50&width=50&text=Sarah",
        is_superhost: true,
        response_rate: 98,
      },
      images: [
        { image_url: "/placeholder.svg?height=400&width=600&text=Luxury+Apartment" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Ocean+View" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Living+Room" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Kitchen" },
      ],
      amenities: ["Wifi", "Kitchen", "Air conditioning", "Pool", "Gym", "Free parking"],
    },
    {
      id: 2,
      title: "Cozy Cabin in the Woods",
      location: "Asheville, North Carolina",
      address: "45 Pine Trail, Asheville, NC",
      price_per_night: 120,
      currency: "USD",
      total_price: 600,
      ratings: 4.8,
      reviews: 87,
      description:
        "Escape to this charming cabin nestled in the woods. Perfect for a romantic getaway or a peaceful retreat. Features a wood-burning fireplace, hot tub, and beautiful hiking trails nearby.",
      property_type: "Entire cabin",
      host: {
        name: "Michael",
        image_url: "/placeholder.svg?height=50&width=50&text=Michael",
        is_superhost: true,
        response_rate: 100,
      },
      images: [
        { image_url: "/placeholder.svg?height=400&width=600&text=Cozy+Cabin" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Woods+View" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Fireplace" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Hot+Tub" },
      ],
      amenities: ["Wifi", "Kitchen", "Fireplace", "Hot tub", "Free parking"],
    },
    {
      id: 3,
      title: "Modern Loft in Downtown",
      location: "New York, New York",
      address: "789 Broadway, New York, NY",
      price_per_night: 180,
      currency: "USD",
      total_price: 900,
      ratings: 4.7,
      reviews: 156,
      description:
        "Stylish loft in the heart of Manhattan. High ceilings, exposed brick walls, and modern furnishings. Walking distance to restaurants, shops, and major attractions.",
      property_type: "Entire loft",
      host: {
        name: "Jessica",
        image_url: "/placeholder.svg?height=50&width=50&text=Jessica",
        is_superhost: false,
        response_rate: 95,
      },
      images: [
        { image_url: "/placeholder.svg?height=400&width=600&text=Modern+Loft" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Living+Area" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Kitchen" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bathroom" },
      ],
      amenities: ["Wifi", "Kitchen", "Air conditioning", "Washer/Dryer", "Elevator"],
    },
    {
      id: 4,
      title: "Beachfront Bungalow",
      location: "Maui, Hawaii",
      address: "567 Beach Road, Lahaina, HI",
      price_per_night: 350,
      currency: "USD",
      total_price: 1750,
      ratings: 4.9,
      reviews: 92,
      description:
        "Fall asleep to the sound of waves in this charming beachfront bungalow. Step directly onto the sand from your private patio. Includes snorkeling gear and beach chairs.",
      property_type: "Entire bungalow",
      host: {
        name: "David",
        image_url: "/placeholder.svg?height=50&width=50&text=David",
        is_superhost: true,
        response_rate: 99,
      },
      images: [
        { image_url: "/placeholder.svg?height=400&width=600&text=Beach+Bungalow" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Ocean+View" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Patio" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Kitchen" },
      ],
      amenities: ["Wifi", "Kitchen", "Air conditioning", "Beach access", "Free parking"],
    },
    {
      id: 5,
      title: "Historic Brownstone",
      location: "Boston, Massachusetts",
      address: "123 Beacon Street, Boston, MA",
      price_per_night: 200,
      currency: "USD",
      total_price: 1000,
      ratings: 4.8,
      reviews: 78,
      description:
        "Stay in a piece of history in this beautifully restored brownstone. Original hardwood floors, crown molding, and modern amenities. Located in the charming Beacon Hill neighborhood.",
      property_type: "Entire townhouse",
      host: {
        name: "Emily",
        image_url: "/placeholder.svg?height=50&width=50&text=Emily",
        is_superhost: true,
        response_rate: 97,
      },
      images: [
        { image_url: "/placeholder.svg?height=400&width=600&text=Historic+Brownstone" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Living+Room" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Dining+Room" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Kitchen" },
      ],
      amenities: ["Wifi", "Kitchen", "Washer/Dryer", "Fireplace", "Free street parking"],
    },
    {
      id: 6,
      title: "Mountain View Chalet",
      location: "Aspen, Colorado",
      address: "789 Mountain Road, Aspen, CO",
      price_per_night: 280,
      currency: "USD",
      total_price: 1400,
      ratings: 4.9,
      reviews: 65,
      description:
        "Luxurious chalet with breathtaking mountain views. Perfect for ski trips with easy access to the slopes. Features a hot tub, fireplace, and spacious deck.",
      property_type: "Entire chalet",
      host: {
        name: "Robert",
        image_url: "/placeholder.svg?height=50&width=50&text=Robert",
        is_superhost: false,
        response_rate: 90,
      },
      images: [
        { image_url: "/placeholder.svg?height=400&width=600&text=Mountain+Chalet" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Mountain+View" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Living+Room" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Hot+Tub" },
      ],
      amenities: ["Wifi", "Kitchen", "Fireplace", "Hot tub", "Ski-in/Ski-out", "Free parking"],
    },
    {
      id: 7,
      title: "Desert Oasis with Pool",
      location: "Palm Springs, California",
      address: "456 Palm Canyon Drive, Palm Springs, CA",
      price_per_night: 220,
      currency: "USD",
      total_price: 1100,
      ratings: 4.7,
      reviews: 103,
      description:
        "Mid-century modern home with private pool and stunning desert views. Bright, airy spaces with retro-inspired decor. Perfect for a relaxing getaway.",
      property_type: "Entire house",
      host: {
        name: "Jennifer",
        image_url: "/placeholder.svg?height=50&width=50&text=Jennifer",
        is_superhost: true,
        response_rate: 98,
      },
      images: [
        { image_url: "/placeholder.svg?height=400&width=600&text=Desert+Oasis" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Pool" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Living+Room" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Patio" },
      ],
      amenities: ["Wifi", "Kitchen", "Pool", "Air conditioning", "Free parking"],
    },
    {
      id: 8,
      title: "Lakefront Cottage",
      location: "Lake Tahoe, California",
      address: "321 Lakeshore Drive, South Lake Tahoe, CA",
      price_per_night: 190,
      currency: "USD",
      total_price: 950,
      ratings: 4.8,
      reviews: 87,
      description:
        "Charming cottage right on the lake with private dock. Cozy interior with rustic touches. Perfect for summer swimming or winter skiing at nearby resorts.",
      property_type: "Entire cottage",
      host: {
        name: "Mark",
        image_url: "/placeholder.svg?height=50&width=50&text=Mark",
        is_superhost: true,
        response_rate: 100,
      },
      images: [
        { image_url: "/placeholder.svg?height=400&width=600&text=Lake+Cottage" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Lake+View" },
<<<<<<< HEAD
        { image_url: "/placeholder.svg?height=400&width=600&text=Lakeside" },
=======
>>>>>>> fe79db3 (ok)
        { image_url: "/placeholder.svg?height=400&width=600&text=Dock" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Living+Room" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" },
      ],
      amenities: ["Wifi", "Kitchen", "Fireplace", "Lake access", "Free parking"],
    },
  ]

  // Replace the entire useEffect block with this updated version that includes mock data
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      setError(null)

      try {
        // In a real application, we would fetch from the backend
        // const apiUrl = `http://localhost:8000/api/listings/?${params.toString()}`;
        // const response = await fetch(apiUrl);

        // For demo purposes, use mock data instead
        // Simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Filter mock data based on search parameters
        const filteredListings = mockListings.filter((listing) => {
          // Filter by location if provided
          if (
            searchParams.get("location") &&
            !listing.location.toLowerCase().includes(searchParams.get("location")!.toLowerCase())
          ) {
            return false
          }

          // Filter by min price if provided
          if (
            searchParams.get("min_price") &&
            listing.price_per_night < Number.parseFloat(searchParams.get("min_price")!)
          ) {
            return false
          }

          // Filter by max price if provided
          if (
            searchParams.get("max_price") &&
            listing.price_per_night > Number.parseFloat(searchParams.get("max_price")!)
          ) {
            return false
          }

          // Filter by min rating if provided
          if (
            searchParams.get("min_rating") &&
            listing.ratings &&
            listing.ratings < Number.parseFloat(searchParams.get("min_rating")!)
          ) {
            return false
          }

          return true
        })

        setListings(filteredListings)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [searchParams])

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
<<<<<<< HEAD
            <div className="rounded-lg bg-gray-200 dark:bg-gray-700 h-64 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
=======
            <div className="rounded-lg bg-gray-200 h-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
>>>>>>> fe79db3 (ok)
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="mt-8 text-center text-red-500">{error}</div>
  }

  if (listings.length === 0) {
<<<<<<< HEAD
    return (
      <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
        No listings found. Try adjusting your search criteria.
      </div>
    )
  }

  return (
    <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
=======
    return <div className="mt-8 text-center text-gray-500">No listings found. Try adjusting your search criteria.</div>
  }

  return (
    <div className="mt-8">
>>>>>>> fe79db3 (ok)
      <h2 className="text-xl font-semibold mb-4">
        {listings.length} {listings.length === 1 ? "stay" : "stays"}
        {searchParams.get("location") ? ` in ${searchParams.get("location")}` : ""}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
<<<<<<< HEAD
        {listings.map((listing, index) => (
          <ListingCard key={listing.id} listing={listing} index={index} />
        ))}
      </div>
    </motion.div>
=======
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
>>>>>>> fe79db3 (ok)
  )
}

