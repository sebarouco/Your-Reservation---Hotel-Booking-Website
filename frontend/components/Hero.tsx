'use client'

import { useState } from 'react'
import { Search, Calendar, Users, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  })

  return (
    <section className="relative bg-gradient-to-b from-booking-blue to-booking-blue-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find your perfect place to stay
          </h1>
          <p className="text-xl text-booking-gray-200">
            Search hotels, homes, and much more...
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-booking-blue text-gray-900"
                />
              </div>
            </div>

            {/* Check-in Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-booking-blue text-gray-900"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-booking-blue text-gray-900"
                />
              </div>
            </div>

            {/* Guests and Search Button */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={searchData.guests}
                    onChange={(e) => setSearchData({...searchData, guests: parseInt(e.target.value)})}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-booking-blue text-gray-900 appearance-none"
                  >
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                    <option value={4}>4 guests</option>
                    <option value={5}>5+ guests</option>
                  </select>
                </div>
                <Link
                  href={`/rooms?destination=${searchData.destination}&checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}&guests=${searchData.guests}`}
                  className="bg-booking-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Popular destinations:</p>
            <div className="flex flex-wrap gap-2">
              {['New York', 'London', 'Paris', 'Tokyo', 'Dubai', 'Barcelona'].map((city) => (
                <button
                  key={city}
                  onClick={() => setSearchData({...searchData, destination: city})}
                  className="text-booking-blue hover:text-booking-blue-dark text-sm font-medium"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">28,000,000+</div>
            <div className="text-booking-gray-200">Properties</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">153</div>
            <div className="text-booking-gray-200">Countries</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">7,000,000+</div>
            <div className="text-booking-gray-200">Reviews</div>
          </div>
        </div>
      </div>
    </section>
  )
}
