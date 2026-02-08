'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Search, Calendar, Users, MapPin, Star, Wifi, Car, Coffee, Filter, X } from 'lucide-react'

interface Room {
  id: number
  name: string
  type: string
  description: string
  price_per_night: number
  max_guests: number
  image_url: string
  amenities: string[]
}

export default function RoomsPage() {
  const searchParams = useSearchParams()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    destination: searchParams.get('destination') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    numGuests: parseInt(searchParams.get('guests') || '2'),
    priceRange: [0, 1000],
    roomType: 'all',
    amenities: [] as string[]
  })
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = () => {
    setLoading(true)
    const url = filters.checkIn && filters.checkOut 
      ? `http://localhost:5000/api/availability?check_in=${filters.checkIn}&check_out=${filters.checkOut}&num_guests=${filters.numGuests}`
      : 'http://localhost:5000/api/rooms'

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRooms(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching rooms:', error)
        setLoading(false)
      })
  }

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const applyFilters = () => {
    fetchRooms()
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters({
      destination: '',
      checkIn: '',
      checkOut: '',
      numGuests: 2,
      priceRange: [0, 1000],
      roomType: 'all',
      amenities: []
    })
    fetchRooms()
  }

  const sortedRooms = [...rooms].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price_per_night - b.price_per_night
      case 'price-high':
        return b.price_per_night - a.price_per_night
      case 'rating':
        return 8.9 - 8.9 // Placeholder for rating sort
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-booking-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center text-white">Loading properties...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-booking-gray-900">
      <Header />
      
      {/* Search Bar */}
      <section className="bg-booking-blue border-b border-booking-blue-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={filters.destination}
                  onChange={(e) => handleFilterChange('destination', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-booking-blue text-gray-900"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-booking-blue text-gray-900"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={filters.checkOut}
                  onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-booking-blue text-gray-900"
                />
              </div>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={filters.numGuests}
                    onChange={(e) => handleFilterChange('numGuests', parseInt(e.target.value))}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-booking-blue text-gray-900 appearance-none"
                  >
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                    <option value={4}>4 guests</option>
                    <option value={5}>5+ guests</option>
                  </select>
                </div>
                <button
                  onClick={applyFilters}
                  className="bg-booking-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="booking-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Filters</h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden text-white"
                  >
                    {showFilters ? <X size={24} /> : <Filter size={24} />}
                  </button>
                </div>

                <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                  {/* Price Range */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Price per night</h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-booking-gray-400 text-sm">
                        <span>$0</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Room Type */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Room Type</h4>
                    <div className="space-y-2">
                      {['all', 'Standard', 'Deluxe', 'Suite', 'Luxury'].map((type) => (
                        <label key={type} className="flex items-center text-booking-gray-300">
                          <input
                            type="radio"
                            name="roomType"
                            value={type}
                            checked={filters.roomType === type}
                            onChange={(e) => handleFilterChange('roomType', e.target.value)}
                            className="mr-2"
                          />
                          <span className="capitalize">{type === 'all' ? 'All Types' : type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Amenities</h4>
                    <div className="space-y-2">
                      {['WiFi', 'Air Conditioning', 'Mini Bar', 'Balcony', 'Room Service'].map((amenity) => (
                        <label key={amenity} className="flex items-center text-booking-gray-300">
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFilterChange('amenities', [...filters.amenities, amenity])
                              } else {
                                handleFilterChange('amenities', filters.amenities.filter(a => a !== amenity))
                              }
                            }}
                            className="mr-2"
                          />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Apply/Clear Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={applyFilters}
                      className="w-full booking-button-primary"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={clearFilters}
                      className="w-full bg-booking-gray-700 hover:bg-booking-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {rooms.length} properties found
                  </h2>
                  <p className="text-booking-gray-400">
                    {filters.destination && `in ${filters.destination}`}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="text-booking-gray-400">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="booking-input px-3 py-2 rounded-lg"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price (low to high)</option>
                    <option value="price-high">Price (high to low)</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Results Grid */}
              {sortedRooms.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-white mb-4">No properties found</p>
                  <p className="text-booking-gray-400 mb-6">Try adjusting your filters or search criteria</p>
                  <button
                    onClick={clearFilters}
                    className="booking-button-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedRooms.map((room) => (
                    <div key={room.id} className="booking-card overflow-hidden hover:shadow-2xl transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img
                            src={room.image_url}
                            alt={room.name}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h3 className="text-xl font-semibold text-white mr-3">{room.name}</h3>
                                <span className="bg-booking-orange text-white px-2 py-1 rounded text-sm font-semibold">
                                  {room.type}
                                </span>
                              </div>
                              <div className="flex items-center text-booking-gray-400 text-sm mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{filters.destination || 'New York City'}</span>
                              </div>
                              <div className="flex items-center mb-3">
                                <Star className="w-4 h-4 text-booking-orange mr-1" />
                                <span className="text-white font-semibold mr-2">8.9</span>
                                <span className="text-booking-gray-400 text-sm">Excellent (324 reviews)</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">${room.price_per_night}</div>
                              <div className="text-booking-gray-400 text-sm">per night</div>
                            </div>
                          </div>
                          
                          <p className="text-booking-gray-400 text-sm mb-4 line-clamp-2">
                            {room.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.slice(0, 3).map((amenity, index) => (
                              <span
                                key={index}
                                className="bg-booking-gray-700 text-booking-gray-300 px-2 py-1 rounded text-xs"
                              >
                                {amenity}
                              </span>
                            ))}
                            {room.amenities.length > 3 && (
                              <span className="text-booking-gray-400 text-xs">
                                +{room.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-booking-gray-400 text-sm">
                              <div className="flex items-center">
                                <Wifi className="w-4 h-4 mr-1" />
                                <span>Free WiFi</span>
                              </div>
                              <div className="flex items-center">
                                <Car className="w-4 h-4 mr-1" />
                                <span>Free Parking</span>
                              </div>
                            </div>
                            <Link
                              href={`/booking?roomId=${room.id}&checkIn=${filters.checkIn}&checkOut=${filters.checkOut}&numGuests=${filters.numGuests}`}
                              className="booking-button-secondary"
                            >
                              Reserve Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
