'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, ArrowRight } from 'lucide-react'

interface ProcessStep {
  number: string
  title: string
  description: string
  deliverables: string[]
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
      deliverables: ['The business problem, written down plainly', 'Success metrics we both agree on', 'Technical requirements and constraints'],
    },
    {
      number: '02',
      title: 'Architecture',
      description: 'Define the system architecture, tech stack, data flow, and core functionality together.',
      deliverables: ['System architecture', 'Tech stack choice', 'Data flow and core feature list'],
    },
    {
      number: '03',
      title: 'Development',
      description: 'Build the system with clean code, proper testing, and integration points.',
      deliverables: ['Clean, maintainable code', 'Tests alongside the features', 'Integrations with the tools you already use'],
    },
    {
      number: '04',
      title: 'Testing',
      description: 'Test thoroughly, gather feedback, and refine until the system meets requirements.',
      deliverables: ['Thorough test passes', 'Your feedback, worked back in', 'Refinement until the requirements are met'],
    },
    {
      number: '05',
      title: 'Deployment',
      description: 'Deploy the system with monitoring, documentation, and handover to the team.',
      deliverables: ['Production deployment', 'Monitoring in place from day one', 'Documentation and a handover to your team'],
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
            Five focused steps that keep requirements, technical details, and delivery timeline aligned. Open a step to
            see what you get from it.
          </p>
        </div>

        {/* Process Rows: each one opens to show its deliverables */}
        <div ref={ref} className="space-y-4 md:space-y-5">
          {steps.map((step, idx) => {
            const isVisible = visibleItems.has(idx)
            const isOpen = openIndex === idx
            const panelId = `process-step-${step.number}`
            return (
              <div
                key={step.number}
                data-index={idx}
                className={`rounded-2xl border bg-white dark:bg-neutral-900/30 shadow-sm hover:shadow-md transition-all duration-300 group ${
                  isOpen
                    ? 'border-lime-600/60 dark:border-[#bfff00]/50'
                    : 'border-slate-200 dark:border-neutral-800/80 hover:border-slate-400 dark:hover:border-[#bfff00]/40'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{
                  transitionDelay: isVisible ? `${idx * 80}ms` : '0ms',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full text-left p-4 md:p-6 lg:p-8 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfff00] rounded-2xl"
                >
                  {/* Row Grid - Number + Title on left, Description on right */}
                  <div className="grid grid-cols-[1fr_auto] md:grid-cols-[0.4fr_0.6fr_auto] lg:grid-cols-[0.35fr_0.65fr_auto] gap-4 md:gap-8 items-center">
                    {/* Left Side: Number + Title */}
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-lime-600 dark:text-[#bfff00]">
                        {step.number}
                      </span>
                      <h3 className="text-base md:text-lg lg:text-xl font-heading font-bold text-foreground group-hover:text-lime-600 dark:group-hover:text-[#bfff00] transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    {/* Right Side: Description */}
                    <p className="hidden md:block text-sm sm:text-base text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-300 transition-colors leading-relaxed">
                      {step.description}
                    </p>

                    {/* Open / close indicator */}
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'rotate-45 bg-[#bfff00] border-[#bfff00] text-black'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 group-hover:border-lime-600 dark:group-hover:border-[#bfff00] group-hover:text-lime-600 dark:group-hover:text-[#bfff00]'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus size={18} />
                    </span>
                  </div>
                  {/* On phones the description sits under the title */}
                  <p className="md:hidden mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.description}</p>
                </button>

                {/* Deliverables panel: animates open with grid rows */}
                <div
                  id={panelId}
                  role="region"
                  aria-label={`${step.title} deliverables`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 md:px-6 lg:px-8 pb-5 md:pb-7 md:grid md:grid-cols-[0.4fr_0.6fr_auto] lg:grid-cols-[0.35fr_0.65fr_auto] md:gap-8">
                      <span className="hidden md:block text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-500 pt-1">
                        What you get
                      </span>
                      <div className="space-y-4">
                        <span className="md:hidden block text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-500">
                          What you get
                        </span>
                        <ul className="grid gap-2 sm:grid-cols-3 sm:gap-3">
                          {step.deliverables.map((item) => (
                            <li
                              key={item}
                              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-200 leading-snug"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                        {idx === 0 && (
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-lime-600 dark:hover:text-[#bfff00] transition-colors"
                          >
                            Start with discovery <ArrowRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
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
