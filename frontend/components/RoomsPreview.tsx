'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, MapPin, Wifi, Car, Coffee } from 'lucide-react'

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

export default function RoomsPreview() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/rooms')
      .then(response => response.json())
      .then(data => {
        setRooms(data.slice(0, 3)) // Show only first 3 rooms
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching rooms:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-booking-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Featured Properties
          </h2>
          <div className="text-center text-white">Loading properties...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-booking-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-booking-gray-300 max-w-3xl mx-auto">
            Discover our handpicked selection of amazing properties around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {rooms.map((room) => (
            <div key={room.id} className="booking-card overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="relative">
                <img
                  src={room.image_url}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-booking-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {room.type}
                </div>
                <button className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors">
                  <Star className="w-4 h-4 text-booking-orange" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{room.name}</h3>
                    <div className="flex items-center text-booking-gray-400 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>New York City</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 text-booking-orange mr-1" />
                      <span className="text-white font-semibold">8.9</span>
                    </div>
                    <span className="text-booking-gray-400 text-xs">Excellent</span>
                  </div>
                </div>
                
                <p className="text-booking-gray-400 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-booking-gray-400 text-sm">
                    <Wifi className="w-4 h-4 mr-1" />
                    <span>Free WiFi</span>
                  </div>
                  <div className="flex items-center text-booking-gray-400 text-sm">
                    <Car className="w-4 h-4 mr-1" />
                    <span>Parking</span>
                  </div>
                  <div className="flex items-center text-booking-gray-400 text-sm">
                    <Coffee className="w-4 h-4 mr-1" />
                    <span>Breakfast</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-booking-gray-700">
                  <div>
                    <span className="text-2xl font-bold text-white">${room.price_per_night}</span>
                    <span className="text-booking-gray-400 text-sm"> /night</span>
                  </div>
                  <span className="text-booking-gray-400 text-sm">
                    Up to {room.max_guests} guests
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/rooms"
            className="booking-button-primary"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  )
}
