'use client'

export default function WhatIveBuilt() {
  const systems = [
    'Outbound automation',
    'Marketing analytics',
    'Content distribution',
    'Internal operations tooling',
  ]

  return (
    <section className="relative py-16 md:py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-secondary font-mono text-xs uppercase tracking-widest font-bold shimmer">Systems I Build</span>
          <div className="h-1 bg-gradient-to-r from-secondary via-primary to-transparent w-32 hidden md:block" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {systems.map((system, idx) => (
            <div
              key={idx}
              className="px-5 md:px-6 py-2 md:py-3 rounded-lg border-2 border-border hover:border-secondary bg-card/40 hover:bg-card/80 text-sm md:text-base text-foreground hover:text-secondary transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-secondary/30 font-medium"
            >
              {system}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
