'use client'

import { ArrowUp } from 'lucide-react'

const EMAIL = 'oxvctr@gmail.com'

const links = [
  { label: 'Projects', href: '#work' },
  { label: 'Lab', href: '#lab' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const backToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative bg-background border-t border-neutral-200 dark:border-neutral-900">
      {/* Bright gradient accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#bfff00] to-transparent opacity-80" />

      {/* Same edge padding as every section above, so the content lines up with them */}
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-10">
            {/* Brand */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <a href="#hero" className="inline-flex items-center gap-3 group" aria-label="Back to the top of the page">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <img src="/logo/hero.png" alt="" className="w-7 h-7 object-contain hidden dark:block" />
                  <img src="/logo/hero white.png" alt="" className="w-7 h-7 object-contain dark:hidden" />
                </span>
                <span className="font-mono font-bold tracking-[0.25em] text-sm text-foreground">OXVCTR</span>
              </a>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
                AI systems engineer. Analytics, automation and internal tools that help teams scale without increasing
                headcount.
              </p>
            </div>

            {/* Sections */}
            <nav aria-label="Footer" className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-500">Explore</p>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-lime-700 dark:hover:text-[#bfff00] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-500">Contact</p>
              <a
                href={`mailto:${EMAIL}?subject=Project%20Inquiry`}
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-lime-700 dark:hover:text-[#bfff00] transition-colors break-all"
              >
                {EMAIL}
              </a>
              <p className="text-sm text-neutral-500">Replies within 24 hours.</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-neutral-200 dark:bg-neutral-900" />

          {/* Bottom row */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-neutral-500 font-medium">&copy; {currentYear} Oxvctr. All rights reserved.</p>
            <button
              type="button"
              onClick={backToTop}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:border-[#bfff00] hover:text-foreground transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfff00]"
            >
              Back to top
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
