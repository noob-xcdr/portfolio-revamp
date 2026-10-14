'use client'

import { useState, useEffect } from 'react'
import { ArrowDown, ArrowUpRight, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Listen for fullscreen changes (e.g., user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(err => {
        console.error(err)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      }).catch(err => {
        console.error(err)
      })
    }
  }

  return (
    <section
      className="relative min-h-[90svh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-16 overflow-hidden bg-background"
      id="hero"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between flex-grow gap-12">
        {/* Main Headline - Bold, massive typography */}
        <div
          className={`relative transition-all duration-1000 ease-out delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Background Video - Positioned behind headline only */}
          <div className="absolute -top-4 -bottom-8 left-[50%] -translate-x-1/2 w-screen overflow-hidden z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              onEnded={(e) => e.currentTarget.play()}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center top' }}
            >
              <source src="/background-video.mp4" type="video/mp4" />
            </video>
            {/* Overlay tint */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/20 z-10" />
            {/* Top fade out to background */}
            <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-background via-background/60 to-transparent backdrop-blur-[2px] z-10 pointer-events-none" />
            {/* Bottom fade out to background */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-background via-background/60 to-transparent backdrop-blur-[2px] z-10 pointer-events-none" />
          </div>

          {/* H1 always white — it sits over the video */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[length:min(7rem,7.6vw,13vh)] font-heading font-black leading-[0.95] tracking-[-0.03em] text-white relative z-10">
            <span className="block">I build AI systems</span>
            <span className="block text-neutral-300">that automate growth,</span>
            <span className="block">improve decisions,</span>
            <span className="block">and reduce overhead.</span>
          </h1>
        </div>

        {/* Footer split layout: Subtitle + Info vs Buttons + Toggles */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end pt-8 md:pt-16 border-t border-neutral-200 dark:border-neutral-800/60 bg-background relative z-20">
          
          {/* Left Column: Subtext and Name */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              I design and deploy systems that replace manual workflows across outbound, analytics, and content, helping teams scale without increasing headcount.
            </p>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-500 font-bold">
              OXVCTR — AI SYSTEMS ENGINEER
            </div>
          </div>

          {/* Right Column: CTA Buttons and Interactive Icons */}
          <div
            className={`flex flex-col sm:items-end gap-6 transition-all duration-1000 ease-out delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Buttons Row */}
            <div className="flex flex-wrap gap-4 w-full sm:justify-end">
              {/* View Work: Lime Green-Yellow Pill Button */}
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black bg-[#bfff00] hover:bg-[#cfff33] transition-all duration-300 shadow-[0_0_15px_rgba(191,255,0,0.3)] hover:shadow-[0_0_25px_rgba(191,255,0,0.6)] cursor-pointer hover:-translate-y-0.5"
              >
                View Selected Work <ArrowDown size={14} className="animate-bounce" />
              </a>

              {/* Work With Me: Outline Pill Button — adapts per theme */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-neutral-800 dark:text-white bg-transparent border border-neutral-300 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/10 hover:border-neutral-400 dark:hover:border-white/50 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                Work With Me <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Interactive controls */}
            <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-500 sm:justify-end">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundOn(!soundOn)}
                className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="Toggle sound"
              >
                {soundOn ? (
                  <>
                    <Volume2 size={16} className="text-[#bfff00]" />
                    <span>Sound On</span>
                  </>
                ) : (
                  <>
                    <VolumeX size={16} />
                    <span>Sound Off</span>
                  </>
                )}
              </button>

              <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-800" />

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors p-1"
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
