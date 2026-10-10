'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Project {
  number: string
  title: string
  tagline: string
  description: string
  tags: string[]
  images: string[]
}

interface FeaturedProjectsProps {
  onImageClick: (images: string[], activeIndex: number) => void
}

export default function FeaturedProjects({ onImageClick }: FeaturedProjectsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = ref.current?.querySelectorAll('[data-index]')
    items?.forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
    }
  }, [])

  const projects: Project[] = [
    {
      number: '01',
      title: 'Qubic SEO Platform',
      tagline: 'SEO Copilot for Qubic That Generates Blogs, Internal Links, and Site Monitoring.',
      description: 'Built an AI SEO copilot (not autopilot) for the Qubic ecosystem that researches Qubic-related keywords, produces long-form blog drafts grounded in Qubic context, suggests internal linking across the site, and continuously monitors the website. Content is prepared end-to-end and handed to the team for review and manual publishing.',
      tags: ['SEO Copilot', 'AI Content', 'Internal Linking', 'Site Monitoring', 'Qubic', 'Web3'],
      images: [
        '/portfolio/Automated SEO/Screenshot (365).png',
        '/portfolio/Automated SEO/Screenshot (366).png',
        '/portfolio/Automated SEO/Screenshot (367).png',
        '/portfolio/Automated SEO/Screenshot (368).png',
        '/portfolio/Automated SEO/Screenshot (369).png'
      ]
    },
    {
      number: '02',
      title: 'OutreachIQ Platform',
      tagline: 'Cold Outreach System That Scales Email Campaigns Without Burning Domains.',
      description: 'Built an outreach operations system with AI-assisted email generation, inbox health monitoring, auto-pause logic, and reply handling so teams can scale outbound without manually babysitting campaigns.',
      tags: ['Outbound Ops', 'Email Infrastructure', 'Automation', 'B2B'],
      images: [
        '/portfolio/image 5-6/photo_5_2026-01-13_02-04-22.jpg',
        '/portfolio/image 5-6/photo_6_2026-01-13_02-04-22.jpg'
      ]
    },
    {
      number: '03',
      title: 'TheHive Platform',
      tagline: 'Creator Analytics Platform That Surfaces Engagement and Performance Patterns.',
      description: 'Tracks creator performance across campaigns, surfaces engagement patterns, and gives operators a single view of activity so they can make faster decisions with less guesswork.',
      tags: ['Creator Analytics', 'Engagement Intelligence', 'Web3', 'Growth'],
      images: [
        '/portfolio/HiveAI/photo_1_2026-01-28_05-47-12.jpg',
        '/portfolio/HiveAI/photo_2_2026-01-28_05-47-12.jpg',
        '/portfolio/HiveAI/photo_3_2026-01-28_05-47-12.jpg',
        '/portfolio/HiveAI/photo_4_2026-01-28_05-47-12.jpg',
        '/portfolio/HiveAI/photo_5_2026-01-28_05-47-12.jpg',
        '/portfolio/HiveAI/photo_6_2026-01-28_05-47-12.jpg',
        '/portfolio/HiveAI/photo_7_2026-01-28_05-47-12.jpg'
      ]
    },
  ]

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background" id="work">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— SELECTED WORK</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-tight">
            Production-minded systems, shipped
          </h2>
        </div>

        {/* Projects Grid */}
        <div ref={ref} className="space-y-20 md:space-y-32">
          {projects.map((project, idx) => {
            const isVisible = visibleItems.has(idx)
            return (
              <div
                key={idx}
                data-index={idx}
                className={`group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${idx * 100}ms` : '0ms',
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  
                  {/* Left Column (Image Slider): 7 spans of grid */}
                  <div className="lg:col-span-7 w-full overflow-hidden">
                    {/* Horizontal slider of screenshots */}
                    <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
                      {project.images.map((imageSrc, imgIdx) => (
                        <button
                          key={`${project.number}-img-${imgIdx}`}
                          type="button"
                          className="w-[16rem] sm:w-[20rem] md:w-[25rem] aspect-video shrink-0 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-[#bfff00] hover:shadow-lg hover:shadow-[#bfff00]/20 snap-start focus:outline-none transition-all duration-300 cursor-zoom-in"
                          onClick={() => onImageClick(project.images, imgIdx)}
                        >
                          <img
                            src={imageSrc}
                            alt={`${project.title} screen ${imgIdx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (Info Content): 5 spans of grid */}
                  <div className="lg:col-span-5 flex flex-col justify-center gap-6">
                    <div className="space-y-4">
                      <p className="text-4xl md:text-5xl font-heading font-black text-neutral-200 dark:text-neutral-800 select-none">
                        {project.number}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground group-hover:text-[#bfff00] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm font-semibold text-[#bfff00] tracking-wide">
                        {project.tagline}
                      </p>
                      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link Trigger */}
                    <button
                      onClick={() => onImageClick(project.images, 0)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-[#bfff00] transition-colors group/link pt-2 self-start cursor-pointer focus:outline-none"
                    >
                      View case → <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
