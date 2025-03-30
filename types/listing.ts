export interface Host {
  id?: number
  name: string
  image_url?: string
  is_superhost: boolean
  response_rate?: number
  joined_date?: string
}

export interface ListingImage {
  id?: number
  image_url: string
}

export interface Listing {
  id: number
  title: string
  location: string
  address?: string
  price_per_night: number
  currency: string
  total_price?: number
  ratings?: number
  reviews: number
  description?: string
  property_type?: string
  host?: Host
  images?: ListingImage[]
  amenities?: string[]
  created_at?: string
  updated_at?: string
}

