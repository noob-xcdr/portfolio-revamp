'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background border-t border-neutral-200 dark:border-neutral-900">
      {/* Bright gradient accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#bfff00] to-transparent opacity-80" />
      
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-7xl mx-auto space-y-8">
        {/* Top section */}
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-heading font-black text-foreground">
            Let&apos;s build systems that scale teams
          </h3>
          <p className="text-[#bfff00] font-mono text-xs uppercase tracking-widest font-bold">
            Ready to start a project?
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <a
            href="#contact"
            className="inline-block px-6 py-3 rounded-full text-xs uppercase font-mono font-bold tracking-wider text-black bg-[#bfff00] hover:bg-[#cfff33] hover:shadow-lg hover:shadow-[#bfff00]/30 transition-all duration-300 cursor-pointer"
          >
            Get in Touch →
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-200 dark:bg-neutral-900" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-500 font-medium">
            &copy; {currentYear} Oxvctr. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-neutral-400">
            <div className="w-1.5 h-1.5 rounded-full bg-[#bfff00] animate-pulse" />
            <p className="font-mono text-[#bfff00] font-bold uppercase tracking-widest text-[10px]">
              AI Systems Engineer
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
