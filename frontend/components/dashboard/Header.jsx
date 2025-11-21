'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, User, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/dashboard', label: 'Ana Sayfa' },
    { href: '/dashboard/impact', label: 'Etkim' },
    { href: '/dashboard/league', label: 'Lig Sistemi' },
    { href: '/dashboard/challenges', label: 'Meydan Okumalar' },
    { href: '/dashboard/settings', label: 'Ayarlar' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            <span className="text-base sm:text-lg font-bold text-gray-900">
              <span className="hidden sm:inline">Turkcell </span>GreenConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-green-600"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* User Profile Icon */}
            <div className="ml-2 lg:ml-4">
              <button className="h-9 w-9 lg:h-10 lg:w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <User className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <User className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-sm font-medium transition-colors py-2 px-2 rounded",
                      isActive
                        ? "text-green-600 bg-green-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

