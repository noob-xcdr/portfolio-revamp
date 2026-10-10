'use client'

import { useState } from 'react'
import { ArrowUpRight, Play, ExternalLink } from 'lucide-react'

type Availability = 'embedded' | 'run-locally' | 'link-only'

interface Stage {
  id: string
  label: string
  title: string
  repo: string
  license: string
  demoUrl: string
  note: string
}

interface Review {
  name: string
  repo: string
  license: string
  availability: Availability
  verdict: string
  caveat: string
}

// Left stage: the fly brain. Right stage: a game, switchable between two playable picks.
const brainStage: Stage = {
  id: 'fly-brain',
  label: 'Brain',
  title: 'Fly Brain Arena',
  repo: 'https://github.com/Lulzx/fly-brain',
  license: 'MIT',
  demoUrl: 'https://lulzx.com/fly-brain/arena.html',
  note: 'Whole-CNS Drosophila connectome (165,122 neurons) driving a physics-simulated body. ~23 MB download; desktop Chrome, Edge or Firefox.',
}

const gameStages: Stage[] = [
  {
    id: 'vibe-weavers',
    label: 'Play',
    title: 'Vibe Weavers',
    repo: 'https://github.com/leoawen/vibe-weavers',
    license: 'MIT',
    demoUrl: 'https://leoawen.github.io/vibe-weavers/',
    note: '3D FPS with an anti-gravity vehicle, built with Three.js, Rapier.js and PeerJS in a single HTML file.',
  },
  {
    id: 'ggez',
    label: 'Engine',
    title: 'GGEZ',
    repo: 'https://github.com/vibe-stack/ggez',
    license: 'MIT',
    demoUrl: 'https://vibe-stack.github.io/ggez/',
    note: 'Vibe-coding framework for Three.js games: world editor, animation editor and runtime packages. Public alpha.',
  },
]

// Ranked by: runs in a browser, license allows reuse, and what the repo states about itself.
const reviews: Review[] = [
  {
    name: 'Lulzx/fly-brain',
    repo: 'https://github.com/Lulzx/fly-brain',
    license: 'MIT',
    availability: 'embedded',
    verdict: 'Top pick. Full connectome sim in the browser with a hosted arena, connectome viewer and textbook.',
    caveat: 'Heavy download; desktop browsers only.',
  },
  {
    name: 'leoawen/vibe-weavers',
    repo: 'https://github.com/leoawen/vibe-weavers',
    license: 'MIT',
    availability: 'embedded',
    verdict: 'Best playable game: hosted, single-file, peer-to-peer multiplayer.',
    caveat: 'Small project (4 stars); expect rough edges.',
  },
  {
    name: 'vibe-stack/ggez',
    repo: 'https://github.com/vibe-stack/ggez',
    license: 'MIT',
    availability: 'embedded',
    verdict: 'Strongest tooling for building games: world editor, animation editor, Three.js runtime.',
    caveat: 'Public alpha; breaking changes expected.',
  },
  {
    name: 'DenisSergeevitch/desktop-fly',
    repo: 'https://github.com/DenisSergeevitch/desktop-fly',
    license: 'Code MIT; FlyWire-derived data CC BY-NC 4.0',
    availability: 'run-locally',
    verdict: 'Charming 3D fly on your macOS desktop with a live spiking-brain window you can click to stimulate.',
    caveat: 'macOS app (Windows port via Electron). Non-commercial data terms.',
  },
  {
    name: 'DeveloperKubilay/fruit-fly-plays-mc',
    repo: 'https://github.com/DeveloperKubilay/fruit-fly-plays-mc',
    license: 'Code MIT; connectome data CC BY 4.0',
    availability: 'run-locally',
    verdict: 'Easiest way to reproduce the viral Minecraft demo: a server plugin plus a Python brain engine.',
    caveat: 'Needs a Minecraft server, Java 17+, Python 3.10+ and ~1.5 GB disk. Cannot run inside a web page.',
  },
  {
    name: 'cedrickchee/vibe-jet',
    repo: 'https://github.com/cedrickchee/vibe-jet',
    license: 'MIT',
    availability: 'link-only',
    verdict: 'Well-documented vibe-coding process: the README walks through the prompts that built it.',
    caveat: 'Multiplayer needs its own Node server; the README shows a demo video rather than describing a hosted playable.',
  },
  {
    name: 'NeuroCause (neuroflyapp/neurofly)',
    repo: 'https://github.com/neuroflyapp/neurofly',
    license: 'PolyForm Noncommercial 1.0.0',
    availability: 'link-only',
    verdict: 'Most research-minded: guided assays, causal traces, data export and a game-style Habitat mode.',
    caveat: 'Noncommercial license, so not suitable for reuse in commercial work. Windows and Android apps.',
  },
  {
    name: 'aaddrick/building-with-typesafe-jev',
    repo: 'https://github.com/aaddrick/building-with-typesafe-jev',
    license: 'MIT',
    availability: 'link-only',
    verdict: 'A skill for coding agents building with Jev, a model that answers typed questions with calibrated probabilities.',
    caveat: 'An agent skill, not a UI. An optional TYPESAFE_API_KEY checks designs against the live API.',
  },
]

const availabilityLabel: Record<Availability, string> = {
  embedded: 'Live in this page',
  'run-locally': 'Run locally',
  'link-only': 'Link only',
}

function StagePanel({ stage }: { stage: Stage }) {
  const [launched, setLaunched] = useState(false)

  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-card overflow-hidden">
      <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-950">
        {launched ? (
          <iframe
            src={stage.demoUrl}
            title={`${stage.title} live demo`}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allow="fullscreen; gamepad; autoplay; xr-spatial-tracking"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLaunched(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfff00]"
            aria-label={`Launch ${stage.title} live demo`}
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#bfff00] text-black shadow-[0_0_25px_rgba(191,255,0,0.4)] transition-transform group-hover:scale-110">
              <Play size={24} fill="currentColor" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-600 dark:text-neutral-400">
              Launch live demo
            </span>
          </button>
        )}
      </div>

      <div className="p-5 md:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">{stage.title}</h3>
          <span className="shrink-0 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
            {stage.license}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{stage.note}</p>
        {launched && (
          <p className="text-xs text-neutral-500 leading-relaxed">
            Blank or still loading? Some hosts block embedding, so use "Open in new tab" below.
          </p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-sm font-bold">
          <a
            href={stage.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground hover:text-[#bfff00] transition-colors"
          >
            Open in new tab <ExternalLink size={14} />
          </a>
          <a
            href={stage.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground hover:text-[#bfff00] transition-colors"
          >
            Source <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function LabHighlight() {
  const [gameId, setGameId] = useState(gameStages[0].id)
  const game = gameStages.find((g) => g.id === gameId) ?? gameStages[0]

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background" id="highlight">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">
            — FEATURED HIGHLIGHT
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-tight">
            A fly brain and a game, side by side
          </h2>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Two open-source projects I reviewed and wired into this page. Launch either one live, then read how each
            of the eight I reviewed stacked up.
          </p>
        </div>

        {/* Paired stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="space-y-4">
            <p className="h-7 flex items-end text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-500">
              {brainStage.label}
            </p>
            <StagePanel stage={brainStage} />
          </div>

          <div className="space-y-4">
            <div
              role="tablist"
              aria-label="Choose a game"
              className="h-7 flex items-end gap-4 text-xs uppercase tracking-[0.2em] font-mono font-bold"
            >
              {gameStages.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={g.id === gameId}
                  onClick={() => setGameId(g.id)}
                  className={`pb-1 border-b-2 transition-colors cursor-pointer focus:outline-none focus-visible:text-foreground ${
                    g.id === gameId
                      ? 'text-foreground border-[#bfff00]'
                      : 'text-neutral-500 border-transparent hover:text-foreground'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            {/* key resets launch state when switching games */}
            <StagePanel key={game.id} stage={game} />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-20 md:mt-28">
          <div className="mb-10 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— REVIEWS</span>
            <h3 className="text-3xl md:text-4xl font-heading font-black text-foreground">What I'd actually use</h3>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Ranked on three things: it runs in a browser, its license allows reuse, and what the repo itself says it
              does. Licenses are as stated in each README.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((review, idx) => (
              <li
                key={review.repo}
                className="flex gap-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-card p-5 md:p-6"
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
                      className="font-heading font-bold text-lg text-foreground hover:text-[#bfff00] transition-colors break-words"
                    >
                      {review.name}
                    </a>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[0.7rem] font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      {availabilityLabel[review.availability]}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{review.verdict}</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    <span className="font-semibold">Catch:</span> {review.caveat}
                  </p>
                  <p className="text-xs font-mono text-neutral-500">{review.license}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
