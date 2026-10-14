'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, ExternalLink, Maximize } from 'lucide-react'

type ReviewStatus = 'live' | 'passed' | 'rejected'

interface Stage {
  id: string
  title: string
  license: string
  demoUrl: string
  note: string
  size: string
  hint: string
}

interface Review {
  name: string
  repo: string
  license: string
  status: ReviewStatus
  verdict: string
  caveat: string
  audited?: string
}

// Every game is code-audited, pinned to a commit and self-hosted under /demos
// (see public/demos/NOTICE.md for licences and the exact changes made).
const featuredStage: Stage = {
  id: 'mykonos',
  title: 'Mykonos Island Voxels',
  license: 'MIT',
  demoUrl: '/demos/mykonos/index.html',
  note: 'A calm isometric island builder with Mykonos-style voxel art: whitewashed houses, bougainvillea, windmills and sea walls.',
  size: '~31 MB',
  hint: 'Tap or click to place, long-press to erase, pinch or scroll to zoom. Your island saves in this browser.',
}

const gameStages: Stage[] = [
  {
    id: 'hextris',
    title: 'Hextris',
    license: 'GPL-3.0',
    demoUrl: '/demos/hextris/index.html',
    note: 'Fast hexagon puzzle: rotate the hexagon to stack matching colours before they reach the edge.',
    size: '~2 MB',
    hint: 'Arrow keys, or tap the left or right half of the board to rotate.',
  },
  {
    id: 'three-quake',
    title: 'Three.js Quake',
    license: 'GPL-2.0',
    demoUrl: '/demos/three-quake/index.html',
    note: "id Software's Quake ported to Three.js by mrdoob. Includes the shareware Episode 1.",
    size: '~22 MB',
    hint: 'Desktop: click to capture the mouse, Esc releases it. Phone: left thumb moves, right side looks.',
  },
]

// Ranked: games live on this page first, then the ones I audited and turned down.
const reviews: Review[] = [
  {
    name: 'boona13/mykonos-island-voxels',
    repo: 'https://github.com/boona13/mykonos-island-voxels',
    license: 'MIT (code and art)',
    status: 'live',
    verdict: 'Prettiest pick: a calm island builder that is just as good on a phone as on a desktop.',
    caveat: 'A creative toy rather than a game with goals, and about 31 MB of art loads when you launch it.',
    audited: 'No outside requests at all in a browser test on desktop and phone, no trackers, no dynamic code; saves only to your browser.',
  },
  {
    name: 'Hextris/hextris',
    repo: 'https://github.com/Hextris/hextris',
    license: 'GPL-3.0',
    status: 'live',
    verdict: 'Most addictive: a quick-fire hexagon puzzle that plays well with touch or arrow keys.',
    caveat: 'The upstream page shipped ads, two analytics trackers, a score beacon to a hard-coded IP address and a remote script loader. I removed all of them.',
    audited: 'After patching, zero outside requests in a browser test. Every change is listed in the demos notice.',
  },
  {
    name: 'mrdoob/three-quake',
    repo: 'https://github.com/mrdoob/three-quake',
    license: 'GPL-2.0',
    status: 'live',
    verdict: 'Most faithful: real Quake running on Three.js, with touch controls for phones.',
    caveat: 'Single-player is Episode 1 only. The multiplayer menu talks to a third-party server, and only if you open it.',
    audited: 'Game data is a standard Quake PACK file of ordinary assets; Three.js is self-hosted instead of loaded from a CDN.',
  },
  {
    name: 'gabrielecirulli/2048',
    repo: 'https://github.com/gabrielecirulli/2048',
    license: 'MIT',
    status: 'passed',
    verdict: 'Cleanest code of everything I audited: no network calls, no trackers, no dynamic code.',
    caveat: 'Passed the audit; left out only to keep the lineup varied.',
  },
  {
    name: 'BKcore/HexGL',
    repo: 'https://github.com/BKcore/HexGL',
    license: 'MIT repo-wide; core game files CC BY-NC 3.0',
    status: 'rejected',
    verdict: 'Futuristic WebGL racer, and still one of the best-looking browser games around.',
    caveat: 'The README says MIT "unless specified in the file", and the core game files specify a non-commercial licence. Its page also runs Google Analytics.',
  },
  {
    name: 'R74nCom/sandboxels',
    repo: 'https://github.com/R74nCom/sandboxels',
    license: 'R74n Content License (all rights reserved)',
    status: 'rejected',
    verdict: 'Falling-sand sandbox with over 500 elements and thousands of reactions.',
    caveat: 'Not open source: its licence is non-commercial and lets the authors demand removal at any time. Its page also loads Google Tag Manager and AdSense.',
  },
  {
    name: 'KilledByAPixel/SpaceHuggers',
    repo: 'https://github.com/KilledByAPixel/SpaceHuggers',
    license: 'GPL-3.0, with a no-redistribution note',
    status: 'rejected',
    verdict: 'A roguelike platformer with destructible environments in 13 KB of JavaScript.',
    caveat: 'Its README says it is "not intended to be redistributed", which rules out hosting it here.',
  },
  {
    name: 'EnclaveGames/Captain-Rogers',
    repo: 'https://github.com/EnclaveGames/Captain-Rogers',
    license: 'CC BY-NC 4.0',
    status: 'rejected',
    verdict: 'Polished little HTML5 mobile arcade game.',
    caveat: 'Non-commercial licence, so not suitable for a site that advertises paid work.',
  },
  {
    name: 'gbatha/PolyBranch',
    repo: 'https://github.com/gbatha/PolyBranch',
    license: 'None',
    status: 'rejected',
    verdict: 'Stylish minimalist 3D game about dodging branches at terminal velocity.',
    caveat: 'The repo has no licence at all, so it cannot be rehosted.',
  },
]

const statusLabel: Record<ReviewStatus, string> = {
  live: 'Live on this page',
  passed: 'Passed, not added',
  rejected: 'Rejected',
}

const TOP_REVIEWS = 3

function StagePanel({ stage, featured = false }: { stage: Stage; featured?: boolean }) {
  const [launched, setLaunched] = useState(false)
  const [canFullscreen, setCanFullscreen] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)

  // iPhone Safari cannot put an iframe into fullscreen, so only offer it where it works.
  useEffect(() => {
    setCanFullscreen(!!document.fullscreenEnabled)
  }, [])

  const goFullscreen = () => {
    frameRef.current?.requestFullscreen?.().catch(() => {})
  }

  // Phones get a taller window so the game is not a thin strip.
  const aspect = featured ? 'aspect-[4/5] sm:aspect-video' : 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-video'

  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-card overflow-hidden">
      <div className={`relative ${aspect} bg-neutral-100 dark:bg-neutral-950`}>
        {launched ? (
          <iframe
            ref={frameRef}
            src={stage.demoUrl}
            title={`${stage.title} live demo`}
            className="absolute inset-0 w-full h-full border-0"
            allow="fullscreen; gamepad; autoplay"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLaunched(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfff00]"
            aria-label={`Launch ${stage.title}`}
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#bfff00] text-black shadow-[0_0_25px_rgba(191,255,0,0.4)] transition-transform group-hover:scale-110">
              <Play size={24} fill="currentColor" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-600 dark:text-neutral-400">
              Launch · {stage.size}
            </span>
          </button>
        )}
      </div>

      <div className="p-5 md:p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">{stage.title}</h3>
          <span className="shrink-0 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
            {stage.license}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{stage.note}</p>
        <p className="text-xs text-neutral-500 leading-relaxed">{stage.hint}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-sm font-bold">
          {launched && canFullscreen && (
            <button
              type="button"
              onClick={goFullscreen}
              className="inline-flex items-center gap-1.5 text-foreground hover:text-[#bfff00] transition-colors cursor-pointer focus:outline-none"
            >
              Fullscreen <Maximize size={14} />
            </button>
          )}
          <a
            href={stage.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground hover:text-[#bfff00] transition-colors"
          >
            Open in new tab <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

// Lab: playable third-party games, kept apart from the client work in Selected Work.
export default function Lab() {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, TOP_REVIEWS)

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background" id="lab">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 md:mb-16 space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— LAB</span>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground leading-tight">
          Games you can play right here
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          A side project: open-source games I dug up on GitHub, audited for ads, trackers and phone-home code, and
          host on this site. Pick one and press Launch.
        </p>
      </div>

      {/* Featured game: full width */}
      <StagePanel stage={featuredStage} featured />

      {/* Two more games side by side */}
      <div className="mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        {gameStages.map((g) => (
          <StagePanel key={g.id} stage={g} />
        ))}
      </div>

      {/* Reviews */}
      <div className="mt-14 md:mt-20">
        <div className="mb-8 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— REVIEWS</span>
          <h4 className="text-2xl md:text-3xl font-heading font-black text-foreground">How they stacked up</h4>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Every candidate had to be complete, light enough for an ordinary laptop or phone, licensed for reuse, and
            clean of trackers and remote code. Licences are as stated in each repository.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {visibleReviews.map((review, idx) => (
            <li
              key={review.repo}
              className="flex gap-4 sm:gap-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-card p-5 md:p-6"
            >
              <span className="text-3xl md:text-4xl font-heading font-black text-neutral-200 dark:text-neutral-800 select-none leading-none">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="space-y-3 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a
                    href={review.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading font-bold text-lg text-foreground hover:text-[#bfff00] transition-colors break-all"
                  >
                    {review.name}
                  </a>
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-[0.7rem] font-mono font-bold uppercase tracking-wider ${
                      review.status === 'live'
                        ? 'bg-[#bfff00]/10 border-[#bfff00]/40 text-neutral-800 dark:text-[#bfff00]'
                        : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {statusLabel[review.status]}
                  </span>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{review.verdict}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  <span className="font-semibold">{review.status === 'rejected' ? 'Why not:' : 'Catch:'}</span>{' '}
                  {review.caveat}
                </p>
                {review.audited && (
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    <span className="font-semibold">Audited:</span> {review.audited}
                  </p>
                )}
                <p className="text-xs font-mono text-neutral-500 break-words">{review.license}</p>
              </div>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => setShowAllReviews((v) => !v)}
          aria-expanded={showAllReviews}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-[#bfff00] transition-colors cursor-pointer focus:outline-none"
        >
          {showAllReviews ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
        </button>
      </div>
      </div>
    </section>
  )
}
