import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Globe, HelpCircle, Briefcase } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-booking-gray-800 border-t border-booking-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-white font-semibold text-lg">Your Reservation</span>
            </div>
            <p className="text-booking-gray-400 text-sm mb-4">
              Making the world more accessible, one booking at a time.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-booking-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-booking-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-booking-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rooms" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/resorts" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Resorts
                </Link>
              </li>
              <li>
                <Link href="/villas" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Villas
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Destinations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Top Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations/new-york" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  New York
                </Link>
              </li>
              <li>
                <Link href="/destinations/london" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  London
                </Link>
              </li>
              <li>
                <Link href="/destinations/paris" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Paris
                </Link>
              </li>
              <li>
                <Link href="/destinations/tokyo" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Tokyo
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Partners */}
          <div>
            <h3 className="text-white font-semibold mb-4">Partners</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/partners" className="text-booking-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Extranet login
                </Link>
              </li>
              <li>
                <Link href="/partner-help" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Partner help
                </Link>
              </li>
              <li>
                <Link href="/list-property" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  List your property
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Become an affiliate
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-booking-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                  Terms & conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-booking-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-booking-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Your Reservation™. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-booking-gray-400 hover:text-white transition-colors text-sm">
                <Globe className="w-4 h-4 mr-1" />
                English (US)
              </button>
              <button className="text-booking-gray-400 hover:text-white transition-colors text-sm">
                $ USD
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-booking-gray-500 text-xs">
              Your Reservation is part of a leading travel and related services platform.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
