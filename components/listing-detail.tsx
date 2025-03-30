"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { Listing } from "@/types/listing"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Star, Users, Wifi, Home, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface ListingDetailProps {
  id: string
}

export function ListingDetail({ id }: ListingDetailProps) {
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState("1")

  // Add this mock data at the top of the component, after the useState declarations
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
        "Stunning luxury apartment with panoramic ocean views. This spacious 2-bedroom unit features modern furnishings, a fully equipped kitchen, and a private balcony overlooking the Atlantic Ocean.\n\nThe master bedroom has a king-size bed and en-suite bathroom, while the second bedroom has two twin beds. The living room has a comfortable sofa bed, making this apartment suitable for up to 6 guests.\n\nThe building offers a range of amenities, including a swimming pool, fitness center, and 24-hour security. Located in the heart of Miami Beach, you'll be just steps away from restaurants, shops, and nightlife.",
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
        "Escape to this charming cabin nestled in the woods. Perfect for a romantic getaway or a peaceful retreat. Features a wood-burning fireplace, hot tub, and beautiful hiking trails nearby.\n\nThis one-bedroom cabin has a comfortable queen-size bed and a pull-out sofa in the living room. The fully equipped kitchen has everything you need to prepare meals, and there's a charcoal grill on the deck for outdoor cooking.\n\nSpend your evenings relaxing in the hot tub under the stars or curled up by the fireplace. During the day, explore the nearby hiking trails or take a short drive to downtown Asheville to visit the local breweries and restaurants.",
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
        "Stylish loft in the heart of Manhattan. High ceilings, exposed brick walls, and modern furnishings. Walking distance to restaurants, shops, and major attractions.\n\nThis open-concept loft features a comfortable queen-size bed, a sleek bathroom with a walk-in shower, and a fully equipped kitchen with stainless steel appliances. The large windows provide plenty of natural light and views of the city.\n\nThe building has an elevator and secure entry. You'll be within walking distance of the subway, making it easy to explore all that New York City has to offer.",
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
        "Fall asleep to the sound of waves in this charming beachfront bungalow. Step directly onto the sand from your private patio. Includes snorkeling gear and beach chairs.\n\nThis one-bedroom bungalow has a king-size bed, a bathroom with a shower, and a kitchenette with a mini-fridge, microwave, and coffee maker. The highlight is the private lanai (patio) with comfortable seating and stunning ocean views.\n\nWe provide beach towels, chairs, umbrellas, and snorkeling equipment for your use during your stay. The property is located on a quiet stretch of beach, but you're just a short drive from restaurants, shops, and activities.",
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
        "Stay in a piece of history in this beautifully restored brownstone. Original hardwood floors, crown molding, and modern amenities. Located in the charming Beacon Hill neighborhood.\n\nThis two-bedroom apartment occupies the entire second floor of a historic brownstone. The master bedroom has a queen-size bed, and the second bedroom has two twin beds. The spacious living room has a decorative fireplace and comfortable seating.\n\nThe fully equipped kitchen has been updated with modern appliances while maintaining its historic charm. The bathroom features a clawfoot tub with shower.\n\nBeacon Hill is one of Boston's most picturesque neighborhoods, with cobblestone streets, gas lamps, and beautiful architecture. You'll be within walking distance of Boston Common, the Freedom Trail, and many restaurants and shops.",
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
        "Luxurious chalet with breathtaking mountain views. Perfect for ski trips with easy access to the slopes. Features a hot tub, fireplace, and spacious deck.\n\nThis three-bedroom chalet can accommodate up to 8 guests. The master bedroom has a king-size bed and en-suite bathroom, the second bedroom has a queen-size bed, and the third bedroom has two sets of bunk beds, making it perfect for families.\n\nThe open-concept living area has floor-to-ceiling windows with stunning mountain views, a stone fireplace, and comfortable seating. The fully equipped kitchen has everything you need to prepare meals, and there's a dining table that seats 8.\n\nAfter a day on the slopes, relax in the private hot tub on the deck or gather around the fire pit. The property is just a 5-minute drive from the ski resort and a 10-minute drive from downtown Aspen.",
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
        "Mid-century modern home with private pool and stunning desert views. Bright, airy spaces with retro-inspired decor. Perfect for a relaxing getaway.\n\nThis three-bedroom home features a master bedroom with a king-size bed and en-suite bathroom, a second bedroom with a queen-size bed, and a third bedroom with two twin beds. The living room has a sleek mid-century design with comfortable seating and a large TV.\n\nThe kitchen is fully equipped with modern appliances, and there's a dining area that seats 6. Sliding glass doors lead to the backyard, where you'll find a private pool, hot tub, outdoor dining area, and lounge chairs.\n\nThe property is located in a quiet neighborhood but is just a short drive from downtown Palm Springs, where you'll find restaurants, shops, and entertainment.",
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
        "Charming cottage right on the lake with private dock. Cozy interior with rustic touches. Perfect for summer swimming or winter skiing at nearby resorts.\n\nThis two-bedroom cottage has a master bedroom with a queen-size bed and a second bedroom with two twin beds. The living room has a stone fireplace, comfortable seating, and large windows with lake views.\n\nThe kitchen is fully equipped, and there's a dining area that seats 6. The highlight of this property is the large deck overlooking the lake, with a dining table, BBQ grill, and steps leading down to a private dock.\n\nIn the summer, swim or kayak from your dock (we provide two kayaks for your use). In the winter, you're just a 15-minute drive from Heavenly Ski Resort. Year-round, you'll enjoy the peaceful setting and beautiful views.",
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
        { image_url: "/placeholder.svg?height=400&width=600&text"  },
        { image_url: "/placeholder.svg?height=400&width=600&text=Dock" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Living+Room" },
        { image_url: "/placeholder.svg?height=400&width=600&text=Bedroom" }
      ],
      amenities: ["Wifi", "Kitchen", "Fireplace", "Lake access", "Free parking"],
    },
  ]

  // Replace the useEffect block with this updated version that uses mock data
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true)
      setError(null)

      try {

        await new Promise((resolve) => setTimeout(resolve, 1000))
        const foundListing = mockListings.find((listing) => listing.id.toString() === id)

        if (!foundListing) {
          throw new Error("Listing not found")
        }

        setListing(foundListing)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [id])

  if (loading) {
    return (
      <div className="mt-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-96 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="mt-8 text-center text-red-500">{error}</div>
  }

  if (!listing) {
    return <div className="mt-8 text-center text-gray-500">Listing not found</div>
  }

  const {
    title,
    location,
    address,
    description,
    price_per_night,
    currency,
    ratings,
    reviews,
    images,
    amenities,
    host,
    property_type,
  } = listing

  // Calculate total price (assuming 10% service fee)
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1
  const subtotal = price_per_night * nights
  const serviceFee = subtotal * 0.1
  const total = subtotal + serviceFee

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {ratings && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-rose-500 fill-rose-500" />
              <span className="ml-1">{ratings}</span>
              <span className="mx-1">·</span>
              <span className="underline">{reviews} reviews</span>
            </div>
          )}
          <div>
            <span className="underline">{location}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
        <div className="relative aspect-square overflow-hidden rounded-l-xl">
          <Image
            src={images && images.length > 0 ? images[0].image_url : `/placeholder.svg?height=600&width=600`}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-r-xl">
              <Image
                src={
                  images && images.length > index
                    ? images[index].image_url
                    : `/placeholder.svg?height=300&width=300&text=Image+${index + 1}`
                }
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between pb-6 border-b">
            <div>
              <h2 className="text-xl font-semibold">
                {property_type} hosted by {host?.name || "Host"}
              </h2>
              <p className="text-gray-500">{address}</p>
            </div>

            {host?.image_url && (
              <div className="relative h-14 w-14 rounded-full overflow-hidden">
                <Image
                  src={host.image_url || "/placeholder.svg"}
                  alt={host.name || "Host"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="py-6 border-b">
            <h2 className="text-xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>

          <div className="py-6 border-b">
            <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amenities &&
                amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    {amenity.toLowerCase().includes("wifi") ? (
                      <Wifi className="h-5 w-5 mr-4 text-gray-500" />
                    ) : (
                      <Home className="h-5 w-5 mr-4 text-gray-500" />
                    )}
                    <span>{amenity}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-8 border rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xl font-semibold">
                  {currency} {price_per_night}
                </span>
                <span className="text-gray-500"> night</span>
              </div>

              {ratings && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-rose-500 fill-rose-500" />
                  <span className="ml-1">{ratings}</span>
                </div>
              )}
            </div>

            <div className="border rounded-t-lg">
              <div className="grid grid-cols-2 divide-x">
                <div className="p-3">
                  <label className="block text-xs font-semibold">CHECK-IN</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-left font-normal p-0", !checkIn && "text-gray-400")}
                      >
                        {checkIn ? format(checkIn, "MMM d, yyyy") : "Add date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="p-3">
                  <label className="block text-xs font-semibold">CHECKOUT</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-left font-normal p-0", !checkOut && "text-gray-400")}
                      >
                        {checkOut ? format(checkOut, "MMM d, yyyy") : "Add date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="p-3 border-t">
                <label className="block text-xs font-semibold">GUESTS</label>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <Input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0 p-0 text-sm"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white mt-4">Reserve</Button>

            <div className="mt-4">
              <p className="flex justify-between py-2">
                <span className="underline">
                  {currency} {price_per_night} x {nights} nights
                </span>
                <span>
                  {currency} {subtotal}
                </span>
              </p>
              <p className="flex justify-between py-2">
                <span className="underline">Service fee</span>
                <span>
                  {currency} {serviceFee.toFixed(2)}
                </span>
              </p>
              <div className="border-t mt-4 pt-4">
                <p className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {currency} {total.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

