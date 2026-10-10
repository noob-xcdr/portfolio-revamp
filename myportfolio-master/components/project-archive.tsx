'use client'

import { ArrowRight } from 'lucide-react'

interface ArchiveProject {
  number: string
  title: string
  description: string
  category: string
  images: string[]
}

interface ProjectArchiveProps {
  onProjectClick: (images: string[], activeIndex: number) => void
}

export default function ProjectArchive({ onProjectClick }: ProjectArchiveProps) {
  const projects: ArchiveProject[] = [
    {
      number: '04',
      title: 'Xandeum pNode Analytics',
      description: 'Network Monitoring Dashboard for Decentralized Storage Operations',
      category: 'Infrastructure Monitoring',
      images: [
        '/portfolio/image 11-13/photo_11_2026-01-13_02-04-22.jpg',
        '/portfolio/image 11-13/photo_12_2026-01-13_02-04-22.jpg',
        '/portfolio/image 11-13/photo_13_2026-01-13_02-04-22.jpg'
      ]
    },
    {
      number: '05',
      title: 'Live Ecosystem Pulse Dashboard',
      description: 'Ecosystem Analytics Dashboard for Real-Time Growth Visibility',
      category: 'Analytics',
      images: [
        '/portfolio/image 3-4/photo_3_2026-01-13_02-04-22.jpg',
        '/portfolio/image 3-4/photo_4_2026-01-13_02-04-22.jpg'
      ]
    },
    {
      number: '06',
      title: 'Lead Generation System',
      description: 'Lead Operations System for Targeted B2B Pipeline Creation',
      category: 'Lead Generation',
      images: [
        '/portfolio/image 7-8/photo_7_2026-01-13_02-04-22.jpg',
        '/portfolio/image 7-8/photo_8_2026-01-13_02-04-22.jpg'
      ]
    },
    {
      number: '07',
      title: 'Email Generator & API Settings',
      description: 'AI Email Generation & Integration Layer for Outreach Teams',
      category: 'AI Workflows',
      images: [
        '/portfolio/image 9-10/photo_9_2026-01-13_02-04-22.jpg',
        '/portfolio/image 9-10/photo_10_2026-01-13_02-04-22.jpg'
      ]
    },
    {
      number: '08',
      title: 'Attention Media – Social Raid Platform',
      description: 'Campaign Coordination Dashboard for Community-Led Social Activation',
      category: 'Campaign Ops',
      images: [
        '/portfolio/image 1-2/photo_1_2026-01-13_02-04-22.jpg',
        '/portfolio/image 1-2/photo_2_2026-01-13_02-04-22.jpg'
      ]
    },
    {
      number: '09',
      title: 'ArbiFlow - Arbitrum Gateway',
      description: 'Arbitrum Gateway Wallet for Payments, Rewards, and Community Pools',
      category: 'Fintech',
      images: [
        '/portfolio/image 14 - 20/photo_14_2026-01-13_02-04-22.jpg',
        '/portfolio/image 14 - 20/photo_15_2026-01-13_02-04-22.jpg',
        '/portfolio/image 14 - 20/photo_16_2026-01-13_02-04-22.jpg',
        '/portfolio/image 14 - 20/photo_17_2026-01-13_02-04-22.jpg',
        '/portfolio/image 14 - 20/photo_18_2026-01-13_02-04-22.jpg',
        '/portfolio/image 14 - 20/photo_19_2026-01-13_02-04-22.jpg',
        '/portfolio/image 14 - 20/photo_20_2026-01-13_02-04-22.jpg'
      ]
    },
  ]

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— ARCHIVE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground leading-tight">
            More projects.
          </h2>
        </div>

        {/* Archive Grid */}
        <div className="space-y-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              onClick={() => onProjectClick(project.images, 0)}
              className="group p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/10 hover:border-slate-400 dark:hover:border-[#bfff00]/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
                <p className="font-heading font-bold text-lg text-lime-600 dark:text-[#bfff00] flex-shrink-0">{project.number}</p>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-heading font-bold text-foreground group-hover:text-lime-600 dark:group-hover:text-[#bfff00] transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 truncate mt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                {/* Category chip — fully themed */}
                <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 font-medium whitespace-nowrap hidden sm:inline-block">
                  {project.category}
                </span>
                <ArrowRight
                  size={18}
                  className="text-neutral-400 dark:text-neutral-500 group-hover:text-[#bfff00] group-hover:scale-110 group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
