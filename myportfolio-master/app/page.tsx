'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Process from '@/components/process'
import Capabilities from '@/components/capabilities'
import FeaturedProjects from '@/components/featured-projects'
import Lab from '@/components/lab'
import ProjectArchive from '@/components/project-archive'
import FrameWall from '@/components/frame-wall'
import About from '@/components/about'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import AnimatedOrbs from '@/components/animated-orbs'

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState(false)

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentProject, setCurrentProject] = useState<any>(null)
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setZoomLevel(1)
      setPosition({ x: 0, y: 0 })
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  // Lightbox Handlers
  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const openSingleLightbox = useCallback((imageSrc: string, project?: any) => {
    setLightboxImages([imageSrc])
    setLightboxIndex(0)
    setLightboxOpen(true)
    setCurrentProject(project || null)
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setCurrentProject(null)
    setDescriptionModalOpen(false)
  }, [])

  const handleNext = useCallback(() => {
    if (lightboxImages.length === 0) return
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }, [lightboxImages])

  const handlePrev = useCallback(() => {
    if (lightboxImages.length === 0) return
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }, [lightboxImages])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'ArrowLeft':
          handlePrev()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, lightboxImages, lightboxIndex, closeLightbox, handleNext, handlePrev])

  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2))
  }, [])

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1))
  }, [])

  // Dragging logic for zoomed images
  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (zoomLevel <= 1) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!isDragging || zoomLevel <= 1) return
    e.preventDefault()
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // Simple boundary clamping
    const maxDragX = (zoomLevel - 1) * 300
    const maxDragY = (zoomLevel - 1) * 200
    setPosition({
      x: Math.min(maxDragX, Math.max(-maxDragX, newX)),
      y: Math.min(maxDragY, Math.max(-maxDragY, newY)),
    })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Animated background orbs */}
      {!reducedMotion && <AnimatedOrbs />}

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <Process />
        <Capabilities />
        <FeaturedProjects onImageClick={openLightbox} />
        <Lab />
        <FrameWall onFrameClick={openSingleLightbox} />
        <ProjectArchive onProjectClick={openLightbox} />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Premium Lightbox Modal overlay */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 md:p-8 animate-fade-in">
          
          {/* Lightbox Header Controls */}
          <div className="w-full flex items-center justify-between text-neutral-400 z-10 max-w-6xl">
            <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold">
              Image {lightboxIndex + 1} of {lightboxImages.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-3 text-white hover:text-[#bfff00] transition-colors focus:outline-none text-2xl font-bold font-mono cursor-pointer"
              aria-label="Close lightbox"
            >
              &times;
            </button>
          </div>

          {/* Lightbox Central Viewer */}
          <div className="relative flex-grow w-full flex items-center justify-center max-w-5xl my-4">
            
            {/* Prev Trigger - Desktop only */}
            {lightboxImages.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 z-10 p-3 rounded-full bg-neutral-900/60 border border-neutral-800 text-white hover:border-[#bfff00] hover:text-[#bfff00] transition-all hidden md:block cursor-pointer focus:outline-none"
                aria-label="Previous image"
              >
                &#8592;
              </button>
            )}

            {/* In-viewport Image Container */}
            <div
              ref={viewportRef}
              className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-950/40 p-2"
            >
              <img
                src={lightboxImages[lightboxIndex]}
                alt={`Lightbox view ${lightboxIndex + 1}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`max-h-[68vh] max-w-full object-contain rounded-lg transition-transform duration-200 select-none ${
                  zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                }`}
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoomLevel})`,
                  transformOrigin: 'center',
                }}
              />
            </div>

            {/* Next Trigger - Desktop only */}
            {lightboxImages.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 z-10 p-3 rounded-full bg-neutral-900/60 border border-neutral-800 text-white hover:border-[#bfff00] hover:text-[#bfff00] transition-all hidden md:block cursor-pointer focus:outline-none"
                aria-label="Next image"
              >
                &#8594;
              </button>
            )}
          </div>

          {/* Lightbox Footer Actions: Zoom & Slide Buttons */}
          <div className="w-full flex flex-col items-center gap-4 z-10">
            {/* Info icon for project description */}
            {currentProject && (
              <button
                onClick={() => setDescriptionModalOpen(true)}
                className="p-3 rounded-full bg-neutral-900/60 border border-neutral-800 text-white hover:border-[#bfff00] hover:text-[#bfff00] transition-all cursor-pointer focus:outline-none"
                aria-label="Show project description"
                title="View project details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}

            {/* Zoom controls */}
            <div className="flex items-center gap-4 bg-neutral-900/60 border border-neutral-800/80 rounded-full px-5 py-2">
              <button
                onClick={zoomOut}
                disabled={zoomLevel <= 1}
                className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer focus:outline-none"
              >
                Zoom Out
              </button>
              <span className="text-xs font-mono font-bold text-white min-w-[3rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={zoomLevel >= 2}
                className="text-xs uppercase font-mono tracking-wider font-bold text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer focus:outline-none"
              >
                Zoom In
              </button>
            </div>

            {/* Simple dot slider for slide visibility */}
            {lightboxImages.length > 1 && (
              <div className="flex items-center gap-2">
                {lightboxImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      setLightboxIndex(dotIdx)
                      setZoomLevel(1)
                      setPosition({ x: 0, y: 0 })
                    }}
                    className={`w-2 h-2 rounded-full transition-all focus:outline-none cursor-pointer ${
                      lightboxIndex === dotIdx ? 'bg-[#bfff00] w-4' : 'bg-neutral-700 hover:bg-neutral-500'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Project Description Modal */}
      {descriptionModalOpen && currentProject && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 relative">
            <button
              onClick={() => setDescriptionModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Close description"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              {currentProject.name}
            </h3>
            <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
              {currentProject.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
