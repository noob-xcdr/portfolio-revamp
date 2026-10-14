'use client'

import { useState } from 'react'

interface Project {
  src: string
  alt: string
  name: string
  description: string
}

interface FrameWallProps {
  onFrameClick: (imageSrc: string, project?: Project) => void
}

export default function FrameWall({ onFrameClick }: FrameWallProps) {

  const projects: Project[] = [
    {
      src: '/systems-built/rootcause.png',
      alt: 'Rootcause',
      name: 'Rootcause',
      description: 'An incident-response and postmortem tool that helps engineering teams document, timeline, and root-cause outages so the same failure doesn\'t repeat.',
    },
    {
      src: '/systems-built/fableforge.png',
      alt: 'FableForge',
      name: 'FableForge',
      description: 'An AI-assisted story-writing tool that helps authors draft manuscripts, track characters, and get contextual writing suggestions as they work.',
    },
    {
      src: '/systems-built/loomwork.png',
      alt: 'Loomwork',
      name: 'Loomwork',
      description: 'A textile and fashion supply-chain tracker that follows fabric from supplier to finished product, keeping production stages visible in one place.',
    },
    {
      src: '/systems-built/thistle legal.png',
      alt: 'Thistle Legal',
      name: 'Thistle Legal',
      description: 'A legal case-management platform that organizes documents, timelines, and clause comparisons for law firms handling active cases.',
    },
    {
      src: '/systems-built/kelps-and-current.png',
      alt: 'Kelp & Current',
      name: 'Kelp & Current',
      description: 'An ocean-data and marine-research dashboard that visualizes buoy sensor readings and depth data for researchers studying ocean conditions.',
    },
    {
      src: '/systems-built/chlorophyll.png',
      alt: 'Chlorophyll',
      name: 'Chlorophyll',
      description: 'An agritech IoT dashboard that monitors crop health, soil moisture, and weather conditions across farmland using satellite and sensor data.',
    },
    {
      src: '/systems-built/ironclad fleet.png',
      alt: 'Ironclad Fleet',
      name: 'Ironclad Fleet',
      description: 'A logistics and fleet-management dashboard that tracks vehicles, drivers, fuel efficiency, and delivery orders in real time.',
    },
    {
      src: '/systems-built/petalsgram.png',
      alt: 'Petalgram',
      name: 'Petalgram',
      description: 'A social media scheduling tool built for florists and boutique brands to plan and queue Instagram content visually.',
    },
    {
      src: '/systems-built/tinyops.png',
      alt: 'tinyOps',
      name: 'tinyOps',
      description: 'A CI/CD pipeline visualizer that shows build, test, and deployment stages with live logs, so engineering teams can monitor releases as they run.',
    },
    {
      src: '/systems-built/aftertone.png',
      alt: 'Aftertone',
      name: 'Aftertone',
      description: 'A music royalty tracking dashboard that shows artists and labels how streams translate into earnings, with per-track royalty splits.',
    },
    {
      src: '/systems-built/glasswing metrics.png',
      alt: 'Glasswing Metrics',
      name: 'Glasswing Metrics',
      description: 'An environmental sensor dashboard for greenhouses, tracking humidity and temperature across zones to protect plant health.',
    },
    {
      src: '/systems-built/marrow.png',
      alt: 'Marrow',
      name: 'Marrow',
      description: 'A biotech research platform that organizes lab results, molecular data, and study progress for research teams running clinical studies.',
    },
    {
      src: '/systems-built/waferer.png',
      alt: 'Wayfarer',
      name: 'Wayfarer',
      description: 'A travel logistics and booking admin panel that lets travel managers track flights, itineraries, and bookings across a company or agency.',
    },
    {
      src: '/systems-built/pulsecrm.png',
      alt: 'PulseCRM',
      name: 'PulseCRM',
      description: 'A CRM dashboard that helps sales teams manage deals through a visual pipeline, from first contact to closed deal.',
    },
    {
      src: '/systems-built/gridwatch.png',
      alt: 'GridWatch',
      name: 'GridWatch',
      description: 'A SCADA-style industrial monitoring system that tracks power grid sensors, voltage, and frequency in real time, flagging faults as they occur.',
    },
    {
      src: '/systems-built/nightshift.png',
      alt: 'Nightshift',
      name: 'Nightshift',
      description: 'A hospital staff-scheduling app that manages shift assignments across departments while flagging staff fatigue risk.',
    },
    {
      src: '/systems-built/quitedesk.png',
      alt: 'QuietDesk',
      name: 'QuietDesk',
      description: 'A minimalist focus-timer and productivity app designed to reduce distraction with a single clean timer and almost no visual clutter.',
    },
  ]

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background overflow-hidden" id="frame-wall">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— INTERFACES</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground leading-tight">
            Seventeen interfaces, from incident response to greenhouse sensors.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Hover to pause the wall. Click any screen to see it full size and read what it does.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="space-y-8">
          {/* First Row - Moving Left */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-marquee hover:pause-marquee">
              {[...projects, ...projects].map((project, idx) => (
                <button
                  key={`row1-${idx}`}
                  onClick={() => onFrameClick(project.src, project)}
                  className="relative aspect-[16/10] w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] shrink-0 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/30 hover:border-[#bfff00] hover:shadow-lg hover:shadow-[#bfff00]/20 transition-all duration-300 group cursor-zoom-in"
                >
                  <img
                    src={project.src}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute left-2 bottom-2 max-w-[calc(100%-1rem)] truncate px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[11px] sm:text-xs font-semibold text-white">
                    {project.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-marquee-reverse hover:pause-marquee">
              {[...[...projects].reverse(), ...[...projects].reverse()].map((project, idx) => (
                <button
                  key={`row2-${idx}`}
                  onClick={() => onFrameClick(project.src, project)}
                  className="relative aspect-[16/10] w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] shrink-0 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/30 hover:border-[#bfff00] hover:shadow-lg hover:shadow-[#bfff00]/20 transition-all duration-300 group cursor-zoom-in"
                >
                  <img
                    src={project.src}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute left-2 bottom-2 max-w-[calc(100%-1rem)] truncate px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[11px] sm:text-xs font-semibold text-white">
                    {project.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
