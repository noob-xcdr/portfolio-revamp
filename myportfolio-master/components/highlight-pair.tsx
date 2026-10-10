'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight, Play, ExternalLink, Maximize } from 'lucide-react'

type Availability = 'embedded' | 'run-locally' | 'link-only'

interface Stage {
  id: string
  label: string
  title: string
  repo: string
  license: string
  demoUrl: string
  note: string
  hint?: string
}

interface Review {
  name: string
  repo: string
  license: string
  availability: Availability
  verdict: string
  caveat: string
  audited?: string
}

// Every demo is audited, pinned to a commit and self-hosted under /demos (see public/demos/NOTICE.md).
// Left stage: the fly brain. Right stage: a game, switchable between two picks.
const brainStage: Stage = {
  id: 'fly-brain',
  label: 'Brain',
  title: 'Fly Brain Arena',
  repo: 'https://github.com/Lulzx/fly-brain',
  license: 'MIT',
  demoUrl: '/demos/fly-brain/arena.html',
  note: 'Whole-CNS Drosophila connectome (165,122 neurons) driving a physics-simulated body. ~23 MB download; desktop Chrome, Edge or Firefox.',
  hint: 'Click the floor to place food or hazards. Press Run to start the simulation.',
}

const gameStages: Stage[] = [
  {
    id: 'three-quake',
    label: 'Quake',
    title: 'Three.js Quake',
    repo: 'https://github.com/mrdoob/three-quake',
    license: 'GPL-2.0',
    demoUrl: '/demos/three-quake/index.html',
    note: "id Software's Quake ported to Three.js by mrdoob. Includes the shareware Episode 1.",
    hint: 'Click the game to capture the mouse; Esc releases it.',
  },
  {
    id: 'claude-of-duty',
    label: 'Claude of Duty',
    title: 'Claude of Duty',
    repo: 'https://github.com/mshumer/Claude-of-Duty',
    license: 'MIT',
    demoUrl: '/demos/claude-of-duty/index.html',
    note: 'Browser FPS written by an orchestrated fleet of AI coding agents. Every texture, mesh and sound is generated procedurally at load time.',
    hint: 'WASD to move, mouse to aim, left click to fire.',
  },
]

// Ranked by: runs in a browser, license allows reuse, and what the repo itself says it does.
const reviews: Review[] = [
  {
    name: 'Lulzx/fly-brain',
    repo: 'https://github.com/Lulzx/fly-brain',
    license: 'MIT; connectome data CC BY 4.0',
    availability: 'embedded',
    verdict: 'Top pick. Full connectome sim in the browser: a spiking brain driving a physics body, with eye views and live neuron-group readouts.',
    caveat: 'Heavy download; needs a cross-origin-isolated page, so it cannot run as a plain third-party embed.',
    audited: 'No eval, dynamic code, or external hosts in the source; 45 locked dependencies, none with install scripts beyond a macOS-only optional one.',
  },
  {
    name: 'mrdoob/three-quake',
    repo: 'https://github.com/mrdoob/three-quake',
    license: 'GPL-2.0',
    availability: 'embedded',
    verdict: 'The most faithful pick: real Quake, running on Three.js, with the shareware episode included.',
    caveat: 'Single-player is Episode 1 only. The multiplayer menu talks to a third-party server, and only if you open it.',
    audited: 'Game data is a standard PACK file of ordinary assets (no executables); the only network code is the multiplayer menu.',
  },
  {
    name: 'mshumer/Claude-of-Duty',
    repo: 'https://github.com/mshumer/Claude-of-Duty',
    license: 'MIT',
    availability: 'embedded',
    verdict: 'Most interesting build story: a ~55k-line shooter written by coordinated AI agents, with zero image or audio files.',
    caveat: 'GPU-hungry; its README documents slow frames at high pixel density. Its menu shows its own working title, "OVERWATCH".',
    audited: 'Scanned the built bundle: no network, storage, cookie or dynamic-code calls; all 68 locked dependencies come from the npm registry.',
  },
  {
    name: 'leoawen/vibe-weavers',
    repo: 'https://github.com/leoawen/vibe-weavers',
    license: 'MIT',
    availability: 'link-only',
    verdict: 'Charming 3D FPS with an anti-gravity vehicle and peer-to-peer multiplayer, in a single HTML file.',
    caveat: 'Not embedded here: it needs ~33 MB of models plus five CDN dependencies, and multiplayer goes through a public PeerJS broker.',
  },
  {
    name: 'vibe-stack/ggez',
    repo: 'https://github.com/vibe-stack/ggez',
    license: 'MIT',
    availability: 'link-only',
    verdict: 'Strongest tooling for building games: world editor, animation editor, Three.js runtime.',
    caveat: 'Public alpha; breaking changes expected. A hosted demo exists but is not embedded.',
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
    caveat: 'Multiplayer needs its own Node server, so it cannot be self-hosted as a static page.',
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
  const frameRef = useRef<HTMLIFrameElement>(null)

  const goFullscreen = () => {
    frameRef.current?.requestFullscreen?.().catch(() => {})
  }

  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-card overflow-hidden">
      <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-950">
        {launched ? (
          <iframe
            ref={frameRef}
            src={stage.demoUrl}
            title={`${stage.title} live demo`}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allow="fullscreen; gamepad; autoplay; xr-spatial-tracking; cross-origin-isolated"
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
            {stage.hint} Blank or still loading? Use "Open in new tab" below.
          </p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-sm font-bold">
          {launched && (
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

const TOP_REVIEWS = 3

// Rendered at the top of the Selected Work section, above the screenshot projects.
export default function HighlightPair() {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, TOP_REVIEWS)

  return (
    <div className="mb-20 md:mb-32" id="highlight">
      <div>
        {/* Header */}
        <div className="mb-10 md:mb-12 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono font-bold">
            Main highlight
          </span>
          <h3 className="text-3xl md:text-5xl font-heading font-black text-foreground leading-tight">
            A fly brain and a game, side by side
          </h3>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Open-source projects I reviewed, code-audited and host here so you can run them live. Launch the fly brain
            and a game or two, then read how they stacked up against the others I looked at.
          </p>
        </div>

        {/* Fly brain: full width, since the arena is built for a large window */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-500">{brainStage.label}</p>
          <StagePanel stage={brainStage} />
        </div>

        {/* Games: side by side */}
        <div className="mt-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-neutral-500">Games</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {gameStages.map((g) => (
              <StagePanel key={g.id} stage={g} />
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-14 md:mt-20">
          <div className="mb-8 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— REVIEWS</span>
            <h4 className="text-2xl md:text-3xl font-heading font-black text-foreground">What I'd actually use</h4>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Ranked on three things: it runs in a browser, its license allows reuse, and what the repo itself says it
              does. Licenses are as stated in each README.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleReviews.map((review, idx) => (
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
                  {review.audited && (
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      <span className="font-semibold">Audited:</span> {review.audited}
                    </p>
                  )}
                  <p className="text-xs font-mono text-neutral-500">{review.license}</p>
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
    </div>
  )
}
