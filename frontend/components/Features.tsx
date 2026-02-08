'use client'

import { Wifi, Car, Coffee, Dumbbell, Utensils, Shield, Star, MapPin, Waves } from 'lucide-react'

const features = [
  {
    icon: Wifi,
    title: 'Free WiFi',
    description: 'Stay connected with complimentary high-speed internet access throughout the property'
  },
  {
    icon: Car,
    title: 'Free Parking',
    description: 'Complimentary parking spaces available for all our guests'
  },
  {
    icon: Coffee,
    title: 'Coffee & Tea',
    description: 'Premium coffee and tea service available 24/7'
  },
  {
    icon: Dumbbell,
    title: 'Fitness Center',
    description: 'State-of-the-art gym equipment for your workout routine'
  },
  {
    icon: Utensils,
    title: 'Restaurant',
    description: 'Fine dining restaurant serving local and international cuisine'
  },
  {
    icon: Waves,
    title: 'Swimming Pool',
    description: 'Outdoor pool with stunning views and comfortable loungers'
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Enhanced cleaning protocols and 24/7 security'
  },
  {
    icon: Star,
    title: 'Top Rated',
    description: 'Highly rated by guests with excellent reviews'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-booking-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why choose our booking platform?
          </h2>
          <p className="text-xl text-booking-gray-300 max-w-3xl mx-auto">
            We offer the best selection of properties with amazing amenities and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-booking-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-booking-orange transition-colors">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-booking-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-booking-gray-700 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Book with confidence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-booking-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Secure Booking</h4>
                  <p className="text-booking-gray-400 text-sm">Your payment details are safe and encrypted</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-booking-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Verified Reviews</h4>
                  <p className="text-booking-gray-400 text-sm">Real reviews from real guests</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-booking-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Best Locations</h4>
                  <p className="text-booking-gray-400 text-sm">Properties in the most desirable areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
