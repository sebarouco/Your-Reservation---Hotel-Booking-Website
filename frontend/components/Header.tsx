'use client'

import Link from 'next/link'
import { Menu, X, Globe, User, HelpCircle, Globe2 } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)

  return (
    <header className="bg-booking-blue border-b border-booking-blue-dark sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-white font-semibold text-lg">Your Reservation</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="text-white hover:text-booking-gray-300 flex items-center space-x-1">
              <Globe2 className="w-4 h-4" />
              <span>EN</span>
            </button>
            <button className="text-white hover:text-booking-gray-300 flex items-center space-x-1">
              <span>$</span>
              <span>USD</span>
            </button>
            <button className="text-white hover:text-booking-gray-300 flex items-center space-x-1">
              <HelpCircle className="w-4 h-4" />
              <span>List your property</span>
            </button>
            <button className="text-white hover:text-booking-gray-300 flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>Partner Portal</span>
            </button>
            <button className="text-white hover:text-booking-gray-300 flex items-center space-x-2 border border-white rounded px-3 py-2">
              <User className="w-4 h-4" />
              <span>Register</span>
            </button>
            <button className="text-white hover:text-booking-gray-300">
              Sign in
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-booking-blue-dark">
            <div className="space-y-3">
              <button className="text-white hover:text-booking-gray-300 flex items-center space-x-1 w-full">
                <Globe2 className="w-4 h-4" />
                <span>English (US)</span>
              </button>
              <button className="text-white hover:text-booking-gray-300 flex items-center space-x-1 w-full">
                <span>$</span>
                <span>USD</span>
              </button>
              <button className="text-white hover:text-booking-gray-300 flex items-center space-x-1 w-full">
                <HelpCircle className="w-4 h-4" />
                <span>List your property</span>
              </button>
              <button className="text-white hover:text-booking-gray-300 flex items-center space-x-1 w-full">
                <Globe className="w-4 h-4" />
                <span>Partner Portal</span>
              </button>
              <div className="border-t border-booking-blue-dark pt-3">
                <button className="text-white hover:text-booking-gray-300 flex items-center space-x-2 border border-white rounded px-3 py-2 w-full">
                  <User className="w-4 h-4" />
                  <span>Register</span>
                </button>
                <button className="text-white hover:text-booking-gray-300 w-full mt-2">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
