'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

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

interface BookingFormData {
  guest_name: string
  guest_email: string
  guest_phone: string
  room_id: number
  check_in_date: string
  check_out_date: string
  num_guests: number
}

export default function BookingPage() {
  const searchParams = useSearchParams()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState<BookingFormData>({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    room_id: parseInt(searchParams.get('roomId') || '0'),
    check_in_date: searchParams.get('checkIn') || '',
    check_out_date: searchParams.get('checkOut') || '',
    num_guests: parseInt(searchParams.get('numGuests') || '1')
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState<any>(null)

  useEffect(() => {
    if (bookingData.room_id) {
      fetch(`http://localhost:5000/api/rooms/${bookingData.room_id}`)
        .then(response => response.json())
        .then(data => {
          setRoom(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching room:', error)
          setLoading(false)
        })
    }
  }, [bookingData.room_id])

  const calculateTotalPrice = () => {
    if (!room || !bookingData.check_in_date || !bookingData.check_out_date) {
      return 0
    }
    
    const checkIn = new Date(bookingData.check_in_date)
    const checkOut = new Date(bookingData.check_out_date)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    
    return nights * room.price_per_night
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!bookingData.guest_name.trim()) {
      newErrors.guest_name = 'Name is required'
    }

    if (!bookingData.guest_email.trim()) {
      newErrors.guest_email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(bookingData.guest_email)) {
      newErrors.guest_email = 'Email is invalid'
    }

    if (!bookingData.guest_phone.trim()) {
      newErrors.guest_phone = 'Phone number is required'
    }

    if (!bookingData.check_in_date) {
      newErrors.check_in_date = 'Check-in date is required'
    }

    if (!bookingData.check_out_date) {
      newErrors.check_out_date = 'Check-out date is required'
    }

    if (bookingData.check_in_date && bookingData.check_out_date) {
      const checkIn = new Date(bookingData.check_in_date)
      const checkOut = new Date(bookingData.check_out_date)
      
      if (checkIn >= checkOut) {
        newErrors.check_out_date = 'Check-out date must be after check-in date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        const data = await response.json()
        setConfirmation(data)
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.error || 'Booking failed' })
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">Loading booking information...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (confirmation) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600 mb-6">
                Your reservation has been successfully confirmed. We've sent a confirmation email to {bookingData.guest_email}.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                <div className="space-y-2">
                  <p><strong>Confirmation ID:</strong> #{confirmation.id}</p>
                  <p><strong>Guest:</strong> {confirmation.guest_name}</p>
                  <p><strong>Room:</strong> {confirmation.room.name}</p>
                  <p><strong>Check-in:</strong> {confirmation.check_in_date}</p>
                  <p><strong>Check-out:</strong> {confirmation.check_out_date}</p>
                  <p><strong>Guests:</strong> {confirmation.num_guests}</p>
                  <p><strong>Total Price:</strong> ${confirmation.total_price}</p>
                </div>
              </div>
              
              <Link
                href="/"
                className="bg-booking-blue hover:bg-booking-blue-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Room Not Found</h1>
            <p className="text-gray-600 mb-6">The room you're trying to book is not available.</p>
            <Link
              href="/rooms"
              className="bg-booking-blue hover:bg-booking-blue-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Rooms
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Complete Your Booking
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">Guest Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.guest_name}
                      onChange={(e) => handleInputChange('guest_name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue ${
                        errors.guest_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.guest_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.guest_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={bookingData.guest_email}
                      onChange={(e) => handleInputChange('guest_email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue ${
                        errors.guest_email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.guest_email && (
                      <p className="text-red-500 text-sm mt-1">{errors.guest_email}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={bookingData.guest_phone}
                    onChange={(e) => handleInputChange('guest_phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue ${
                      errors.guest_phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.guest_phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.guest_phone}</p>
                  )}
                </div>
                
                <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      value={bookingData.check_in_date}
                      onChange={(e) => handleInputChange('check_in_date', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue ${
                        errors.check_in_date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.check_in_date && (
                      <p className="text-red-500 text-sm mt-1">{errors.check_in_date}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      value={bookingData.check_out_date}
                      onChange={(e) => handleInputChange('check_out_date', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue ${
                        errors.check_out_date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.check_out_date && (
                      <p className="text-red-500 text-sm mt-1">{errors.check_out_date}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests *
                  </label>
                  <select
                    value={bookingData.num_guests}
                    onChange={(e) => handleInputChange('num_guests', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-booking-blue"
                  >
                    {[...Array(room.max_guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600">{errors.submit}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-booking-blue hover:bg-booking-blue-dark disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-semibold transition-colors"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Booking'}
                </button>
              </form>
            </div>
            
            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                
                <div className="mb-4">
                  <img
                    src={room.image_url}
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type:</span>
                    <span className="font-medium">{room.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per Night:</span>
                    <span className="font-medium">${room.price_per_night}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">
                      {bookingData.check_in_date || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">
                      {bookingData.check_out_date || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{bookingData.num_guests}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold text-booking-blue">
                      ${calculateTotalPrice()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
