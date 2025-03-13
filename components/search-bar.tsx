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
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl lg:rounded-full shadow-xl border border-gray-300 dark:border-gray-700 w-full max-w-[90vw] xl:max-w-6xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-4">
        {/* Location */}
        <div className="flex-1 flex items-center gap-2 p-3 border-b lg:border-b-0 lg:border-r border-gray-300 dark:border-gray-700">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <Input
            id="location"
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 p-0 text-sm bg-transparent dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 flex-1"
          />
        </div>

        {/* Dates */}
      {/* Dates */}
<div className="flex-1 p-3 sm:p-4 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="w-full">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Check in</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-none shadow-none hover:bg-transparent dark:bg-transparent dark:text-gray-100",
              !checkIn && "text-gray-400 dark:text-gray-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkIn ? format(checkIn, "MMM d, yyyy") : "Add date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700">
          <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus className="dark:bg-gray-800" />
        </PopoverContent>
      </Popover>
    </div>

    <div className="w-full">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Check out</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-none shadow-none hover:bg-transparent dark:bg-transparent dark:text-gray-100",
              !checkOut && "text-gray-400 dark:text-gray-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkOut ? format(checkOut, "MMM d, yyyy") : "Add date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700">
          <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus className="dark:bg-gray-800" />
        </PopoverContent>
      </Popover>
    </div>
  </div>
</div>
        {/* Guests */}
<div className="w-28 sm:w-24 p-3 sm:p-4 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
  <label htmlFor="guests" className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
    Who
  </label>
  <div className="flex items-center">
    <Users className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
    <Input
      id="guests"
      type="number"
      min="1"
      placeholder="Guests"
      value={guests}
      onChange={(e) => setGuests(e.target.value)}
      className="border-none shadow-none focus-visible:ring-0 p-0 text-sm bg-transparent dark:text-gray-100 w-full text-center"
    />
  </div>
</div>

        {/* Filters */}
        <div className="flex-1 grid grid-cols-3 gap-3">
          {[
            { label: "Min Price", value: minPrice, setter: setMinPrice, placeholder: "$" },
            { label: "Max Price", value: maxPrice, setter: setMaxPrice, placeholder: "$" },
            { label: "Min Rating", value: minRating, setter: setMinRating, placeholder: "★", max: 5, step: 0.1 },
          ].map(({ label, value, setter, placeholder, max, step }) => (
            <div key={label} className="space-y-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</label>
              <Input
                type="number"
                min="0"
                max={max}
                step={step}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="text-sm h-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400"
              />
            </div>
          ))}
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="h-12 w-full sm:w-auto bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white rounded-full transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 px-6"
        >
          <Search className="h-5 w-5" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>
    </div>
  )
}
