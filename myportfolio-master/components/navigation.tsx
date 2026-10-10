'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const initialTheme = savedTheme || 'dark'
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    document.documentElement.classList.toggle('light', initialTheme === 'light')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    document.documentElement.classList.toggle('light', nextTheme === 'light')
  }

  const navItems = [
    { label: 'Highlight', href: '#highlight' },
    { label: 'Projects', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#capabilities' },
  ]

  return (
    <>
      {/* Top Left Logo - Fixed */}
      <div className="fixed top-6 left-6 md:left-10 z-50">
        <a href="#hero" className="relative flex items-center justify-center w-12 h-12 group cursor-pointer">
          {/* Outer circle border/background */}
          <div className="absolute inset-0 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 z-10 overflow-hidden">
            <img
              src={theme === 'dark' ? '/logo/hero.png' : '/logo/hero white.png'}
              alt="V Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          {/* Overlapping Blue Accent Circle */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-[#3b82f6] opacity-40 blur-[4px] scale-120 transition-transform group-hover:scale-125" />
        </a>
      </div>

      {/* Desktop Centered Navigation Pill */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <nav className="flex items-center gap-6 px-6 py-2.5 rounded-full bg-white/90 dark:bg-black/75 backdrop-blur-md border border-neutral-200 dark:border-neutral-800/80 shadow-lg dark:shadow-2xl">
          {/* Menu Items */}
          <div className="flex items-center gap-6 pr-4 border-r border-neutral-200 dark:border-neutral-800">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-1.5 px-3"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Blue Hire Me Button */}
            <a
              href="#contact"
              className="px-5 py-2 text-sm font-semibold rounded-full text-white bg-[#3399ff] hover:bg-blue-600 transition-all duration-300 shadow-[0_0_15px_rgba(51,153,255,0.4)] hover:shadow-[0_0_20px_rgba(51,153,255,0.6)] cursor-pointer"
            >
              Hire me
            </a>

            {/* Light/Dark Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Trigger */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          className="p-3 rounded-full bg-white dark:bg-[#121212]/90 text-neutral-700 dark:text-white border border-neutral-200 dark:border-neutral-800 shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white/98 dark:bg-[#0d0d0d]/98 backdrop-blur-lg z-40 flex flex-col justify-center px-8">
          <nav className="flex flex-col gap-8 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold mb-2">— MENU</span>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-bold font-heading text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <hr className="border-neutral-200 dark:border-neutral-800 my-4" />
            <div className="flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="inline-block text-center px-8 py-3 text-base font-semibold rounded-full text-white bg-[#3399ff] shadow-[0_0_15px_rgba(51,153,255,0.4)]"
              >
                Hire me
              </a>
              <button
                onClick={toggleTheme}
                className="p-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
