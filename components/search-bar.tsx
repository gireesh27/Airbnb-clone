"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get("location") || "")
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    searchParams.get("checkin") ? new Date(searchParams.get("checkin") as string) : undefined,
  )
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    searchParams.get("checkout") ? new Date(searchParams.get("checkout") as string) : undefined,
  )
  const [guests, setGuests] = useState(searchParams.get("guests") || "1")
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "")
  const [minRating, setMinRating] = useState(searchParams.get("min_rating") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (checkIn) params.set("checkin", format(checkIn, "yyyy-MM-dd"))
    if (checkOut) params.set("checkout", format(checkOut, "yyyy-MM-dd"))
    if (guests) params.set("guests", guests)
    if (minPrice) params.set("min_price", minPrice)
    if (maxPrice) params.set("max_price", maxPrice)
    if (minRating) params.set("min_rating", minRating)

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-full shadow-lg border border-gray-200">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center">
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 w-full">
          <label htmlFor="location" className="block text-xs font-semibold text-gray-700">
            Where
          </label>
          <div className="flex items-center">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              id="location"
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-none shadow-none focus-visible:ring-0 p-0 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 w-full">
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700">Check in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-none shadow-none hover:bg-transparent",
                      !checkIn && "text-gray-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "MMM d, yyyy") : "Add date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700">Check out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-none shadow-none hover:bg-transparent",
                      !checkOut && "text-gray-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "MMM d, yyyy") : "Add date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 w-full">
          <label htmlFor="guests" className="block text-xs font-semibold text-gray-700">
            Who
          </label>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              id="guests"
              type="number"
              min="1"
              placeholder="Add guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="border-none shadow-none focus-visible:ring-0 p-0 text-sm"
            />
          </div>
        </div>

        <div className="p-4 flex items-center space-x-4">
          <div>
            <label htmlFor="min_price" className="block text-xs font-semibold text-gray-700">
              Min Price
            </label>
            <Input
              id="min_price"
              type="number"
              min="0"
              placeholder="$"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-20 text-sm"
            />
          </div>

          <div>
            <label htmlFor="max_price" className="block text-xs font-semibold text-gray-700">
              Max Price
            </label>
            <Input
              id="max_price"
              type="number"
              min="0"
              placeholder="$"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-20 text-sm"
            />
          </div>

          <div>
            <label htmlFor="min_rating" className="block text-xs font-semibold text-gray-700">
              Min Rating
            </label>
            <Input
              id="min_rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="★"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-20 text-sm"
            />
          </div>

          <Button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white rounded-full h-12 px-6">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}

