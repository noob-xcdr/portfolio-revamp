'use client'

import { useEffect, useRef, useState } from 'react'

interface ServiceCard {
  number: string
  title: string
  description: string
  checklist: string[]
}

export default function Capabilities() {
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

  const services: ServiceCard[] = [
    {
      number: '01',
      title: 'Analytics Systems',
      description: 'Analytics dashboards that connect activity to revenue and enable faster decision-making.',
      checklist: ['Data pipelines', 'Real-time dashboards', 'Performance metrics'],
    },
    {
      number: '02',
      title: 'Outbound Systems',
      description: 'Outbound systems that automate lead generation and improve pipeline efficiency.',
      checklist: ['Email automation', 'Inbox monitoring', 'Reply handling'],
    },
    {
      number: '03',
      title: 'AI Workflows',
      description: 'AI-powered systems for content generation and operations automation.',
      checklist: ['AI integration', 'Content engines', 'Process automation'],
    },
    {
      number: '04',
      title: 'Backend Infrastructure',
      description: 'Backend infrastructure for data-heavy applications and API integrations.',
      checklist: ['API design', 'Data processing', 'System orchestration'],
    },
    {
      number: '05',
      title: 'Internal Tools',
      description: 'Custom internal tools that replace spreadsheets and manual workflows.',
      checklist: ['Custom dashboards', 'Workflow automation', 'Data integration'],
    },
    {
      number: '06',
      title: 'Web3 Infrastructure',
      description: 'Web3 infrastructure, monitoring, and smart contract-adjacent tooling.',
      checklist: ['Web3 integration', 'Monitoring systems', 'Smart contract tools'],
    },
  ]

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background" id="capabilities">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— CAPABILITIES</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-tight">
            Systems built for growth, operations, and visibility
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            From analytics to automation and internal tools, each system is built to solve real problems and improve efficiency.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const isVisible = visibleItems.has(idx)
            return (
              <div
                key={idx}
                data-index={idx}
                className={`relative p-5 md:p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/20 hover:border-slate-400 dark:hover:border-[#bfff00]/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{
                  transitionDelay: isVisible ? `${idx * 80}ms` : '0ms',
                }}
              >
                {/* Ghost Background Number */}
                <span className="absolute top-2 right-4 text-6xl md:text-7xl lg:text-[7rem] font-heading font-black text-slate-200/60 dark:text-white/[0.03] group-hover:text-slate-300 dark:group-hover:text-white/[0.06] transition-colors select-none pointer-events-none">
                  {service.number}
                </span>

                <div className="relative z-10 flex flex-col justify-between h-full space-y-4 md:space-y-6">
                  {/* Title & Description */}
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-lg md:text-xl font-heading font-bold text-foreground group-hover:text-[#bfff00] transition-colors pr-8">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-2 pt-3 md:pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {service.checklist.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                        {/* Custom Green Checkmark */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 md:h-4.5 md:w-4.5 text-lime-600 dark:text-[#bfff00] flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
