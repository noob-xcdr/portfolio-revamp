'use client'

import { useEffect, useRef, useState } from 'react'

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Smooth infinite scroll using requestAnimationFrame
  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (reducedMotion) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let currentPos = 0
    const speed = 0.5 // pixels per frame

    const animate = () => {
      currentPos -= speed
      
      // Get the scroll width
      const scrollWidth = scrollContainer.scrollWidth / 2 // Since we duplicate content
      
      // Reset when we've scrolled past the first half
      if (Math.abs(currentPos) >= scrollWidth) {
        currentPos = 0
      }
      
      scrollContainer.style.transform = `translateX(${currentPos}px)`
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [reducedMotion])

  const tools = [
    'TypeScript',
    'Python',
    'Rust',
    'React',
    'Next.js',
    'Node.js',
    'BullMQ',
    'Playwright',
    'Railway',
    'Vercel',
    'Claude API / Anthropic API',
    'Redis',
    'PostgreSQL',
    'Tailwind CSS',
  ]

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bio & Tools */}
          <div className="space-y-10">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— ABOUT</span>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-black dark:text-white leading-normal">
                I build AI systems that automate growth, improve decisions, and reduce operational overhead. Specializing in analytics, automation, and internal tools, I design custom software that helps teams scale without increasing headcount.
              </p>
            </div>

            {/* Tools list */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-500 font-bold block">
                TOOLS I WORK WITH
              </span>
              {/* Auto-scrolling marquee - JavaScript-based for smooth infinite scroll */}
              <div className="relative overflow-hidden w-full">
                <div 
                  ref={scrollRef}
                  className="flex gap-3 min-w-max"
                >
                  {[...tools, ...tools].map((tool, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/40 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 whitespace-nowrap hover:border-[#bfff00]/30 hover:text-black dark:hover:text-white transition-colors cursor-default shrink-0"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Browser Mockup with Overlapping Cards */}
          <div className="relative w-full max-w-xl mx-auto lg:mx-0">
            <div className="w-full rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 overflow-hidden shadow-2xl backdrop-blur-sm p-4 md:p-6 space-y-6">
              {/* Browser Header Controls */}
              <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-300 dark:border-neutral-800/80">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* Browser Body Area - Layered Cards Container */}
              <div className="relative h-64 md:h-72 w-full flex items-center justify-center overflow-hidden">
                {/* Back Card: Sa... text card */}
                <div className="absolute left-[10%] w-[45%] aspect-[4/3] rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg p-3 rotate-[-6deg] z-10 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">Sa...</span>
                    <div className="w-8 h-1 bg-neutral-300 dark:bg-neutral-600 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded" />
                    <div className="w-3/4 h-1 bg-neutral-200 dark:bg-neutral-700 rounded" />
                  </div>
                </div>

                {/* Automated SEO Card (Middle image card) */}
                <div className="absolute w-[50%] aspect-video rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-800 shadow-xl rotate-[-2deg] z-20">
                  <img
                    src="/portfolio/Automated SEO/Screenshot (365).png"
                    alt="Automated SEO Platform"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Placeholder for Xandeum Card (Front tilted card) */}
                <div className="absolute right-[8%] w-[45%] aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-2xl bg-white dark:bg-neutral-800 rotate-[8deg] z-30 flex items-center justify-center p-2">
                  <img
                    src="/portfolio/HiveAI/photo_1_2026-01-28_05-47-12.jpg"
                    alt="Platform (replace with Xandeum)"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Timeline Track Editor simulator */}
              <div className="space-y-3 pt-4 border-t border-neutral-300 dark:border-neutral-800/80">
                {/* Green track */}
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#bfff00] shrink-0" />
                  <div className="relative flex-grow h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="absolute left-[15%] right-[35%] h-full bg-[#bfff00] rounded-full" />
                  </div>
                </div>
                {/* Blue track */}
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3399ff] shrink-0" />
                  <div className="relative flex-grow h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="absolute left-[30%] right-[20%] h-full bg-[#3399ff] rounded-full" />
                  </div>
                </div>
                {/* Gray track */}
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0" />
                  <div className="relative flex-grow h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="absolute left-[5%] right-[60%] h-full bg-neutral-400 dark:bg-neutral-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
