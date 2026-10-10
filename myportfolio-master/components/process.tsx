'use client'

import { useEffect, useRef, useState } from 'react'

interface ProcessStep {
  number: string
  title: string
  description: string
}

export default function Process() {
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

  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Understand the business problem, technical requirements, and success metrics before writing code.',
    },
    {
      number: '02',
      title: 'Architecture',
      description: 'Define the system architecture, tech stack, data flow, and core functionality together.',
    },
    {
      number: '03',
      title: 'Development',
      description: 'Build the system with clean code, proper testing, and integration points.',
    },
    {
      number: '04',
      title: 'Testing',
      description: 'Test thoroughly, gather feedback, and refine until the system meets requirements.',
    },
    {
      number: '05',
      title: 'Deployment',
      description: 'Deploy the system with monitoring, documentation, and handover to the team.',
    },
  ]

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background" id="process">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— PROCESS</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-tight">
            A clear path from system concept to production deployment.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Five focused steps that keep requirements, technical details, and delivery timeline aligned.
          </p>
        </div>

        {/* Process Rows */}
        <div ref={ref} className="space-y-4 md:space-y-5">
          {steps.map((step, idx) => {
            const isVisible = visibleItems.has(idx)
            return (
              <div
                key={idx}
                data-index={idx}
                className={`p-4 md:p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/30 hover:border-slate-400 dark:hover:border-[#bfff00]/40 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{
                  transitionDelay: isVisible ? `${idx * 80}ms` : '0ms',
                }}
              >
                {/* Row Grid - Number + Title on left, Description on right */}
                <div className="grid grid-cols-1 md:grid-cols-[0.4fr_0.6fr] lg:grid-cols-[0.35fr_0.65fr] gap-4 md:gap-8 items-center">
                  
                  {/* Left Side: Number + Title */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-lime-600 dark:text-[#bfff00]">
                      {step.number}
                    </span>
                    <h3 className="text-base md:text-lg lg:text-xl font-heading font-bold text-foreground group-hover:text-[#bfff00] transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Right Side: Description */}
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-300 transition-colors leading-relaxed">
                    {step.description}
                  </p>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
