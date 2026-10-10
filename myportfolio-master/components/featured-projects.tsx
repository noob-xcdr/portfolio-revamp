'use client'

import { ArrowRight } from 'lucide-react'
import HighlightPair from '@/components/highlight-pair'

interface Project {
  title: string
  tagline: string
  description: string
  tags: string[]
  images: string[]
}

interface FeaturedProjectsProps {
  onImageClick: (images: string[], activeIndex: number) => void
}

const projects: Project[] = [
  {
    title: 'Qubic SEO Platform',
    tagline: 'SEO Copilot for Qubic That Generates Blogs, Internal Links, and Site Monitoring.',
    description: 'Built an AI SEO copilot (not autopilot) for the Qubic ecosystem that researches Qubic-related keywords, produces long-form blog drafts grounded in Qubic context, suggests internal linking across the site, and continuously monitors the website. Content is prepared end-to-end and handed to the team for review and manual publishing.',
    tags: ['SEO Copilot', 'AI Content', 'Internal Linking', 'Site Monitoring', 'Qubic', 'Web3'],
    images: [
      '/portfolio/Automated SEO/Screenshot (365).png',
      '/portfolio/Automated SEO/Screenshot (366).png',
      '/portfolio/Automated SEO/Screenshot (367).png',
      '/portfolio/Automated SEO/Screenshot (368).png',
      '/portfolio/Automated SEO/Screenshot (369).png',
    ],
  },
  {
    title: 'OutreachIQ Platform',
    tagline: 'Cold Outreach System That Scales Email Campaigns Without Burning Domains.',
    description: 'Built an outreach operations system with AI-assisted email generation, inbox health monitoring, auto-pause logic, and reply handling so teams can scale outbound without manually babysitting campaigns.',
    tags: ['Outbound Ops', 'Email Infrastructure', 'Automation', 'B2B'],
    images: [
      '/portfolio/image 5-6/photo_5_2026-01-13_02-04-22.jpg',
      '/portfolio/image 5-6/photo_6_2026-01-13_02-04-22.jpg',
    ],
  },
  {
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
      '/portfolio/HiveAI/photo_7_2026-01-28_05-47-12.jpg',
    ],
  },
]

export default function FeaturedProjects({ onImageClick }: FeaturedProjectsProps) {
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

        {/* Main highlight: audited live demos + reviews */}
        <HighlightPair />

        {/* Earlier work: all three projects in one long bar */}
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-500">Earlier work</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-card overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 dark:divide-neutral-800">
            {projects.map((project) => (
              <article key={project.title} className="group flex flex-col gap-4 p-5 md:p-6">
                <button
                  type="button"
                  onClick={() => onImageClick(project.images, 0)}
                  className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-[#bfff00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfff00] transition-colors cursor-zoom-in"
                  aria-label={`Open ${project.title} screenshots`}
                >
                  <img
                    src={project.images[0]}
                    alt={`${project.title} screen 1`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {project.images.length > 1 && (
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-[0.7rem] font-mono font-bold text-white">
                      {project.images.length} screens
                    </span>
                  )}
                </button>

                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-[#bfff00] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#bfff00] tracking-wide">{project.tagline}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onImageClick(project.images, 0)}
                    className="mt-auto pt-2 inline-flex items-center gap-2 self-start text-sm font-bold text-foreground hover:text-[#bfff00] transition-colors group/link cursor-pointer focus:outline-none"
                  >
                    View case <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
