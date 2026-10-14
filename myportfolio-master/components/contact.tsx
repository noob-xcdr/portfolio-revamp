'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import { Mail, Copy, Check } from 'lucide-react'

// Fired by the Capabilities cards to start a project of a given type.
export const PREFILL_PROJECT_EVENT = 'prefill-project'

const EMAIL = 'oxvctr@gmail.com'

const PROJECT_TYPES: { value: string; label: string }[] = [
  { value: 'analytics-dashboard', label: 'Analytics Dashboard' },
  { value: 'automation-system', label: 'Automation System' },
  { value: 'internal-tool', label: 'Internal Tool' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'backend-infrastructure', label: 'Backend Infrastructure' },
  { value: 'web3-infrastructure', label: 'Web3 Infrastructure' },
  { value: 'other', label: 'Other System' },
]

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    details: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [prefilledLabel, setPrefilledLabel] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const prefillTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // A Capabilities card was clicked: preselect that project type and flag it briefly.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const value = (e as CustomEvent<string>).detail
      const match = PROJECT_TYPES.find((t) => t.value === value)
      if (!match) return
      setFormState((prev) => ({ ...prev, projectType: match.value }))
      setPrefilledLabel(match.label)
      clearTimeout(prefillTimer.current)
      prefillTimer.current = setTimeout(() => setPrefilledLabel(null), 4000)
    }
    window.addEventListener(PREFILL_PROJECT_EVENT, onPrefill)
    return () => {
      window.removeEventListener(PREFILL_PROJECT_EVENT, onPrefill)
      clearTimeout(prefillTimer.current)
    }
  }, [])

  // Copy the address; if the clipboard is unavailable, fall back to the mail app.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}?subject=Project%20Inquiry`
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Formsubmit.co handles the email delivery without needing an API
    const formData = new FormData()
    formData.append('name', formState.name)
    formData.append('email', formState.email)
    formData.append('project_type', formState.projectType)
    formData.append('budget', formState.budget)
    formData.append('timeline', formState.timeline)
    formData.append('details', formState.details)
    formData.append('_subject', `Project Inquiry: ${formState.projectType}`)
    formData.append('_captcha', 'false')
    
    fetch(`https://formsubmit.co/${EMAIL}`, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        setSubmitSuccess(true)
        setFormState({
          name: '',
          email: '',
          projectType: '',
          budget: '',
          timeline: '',
          details: '',
        })
      })
      .catch((error) => {
        console.error('Form submission error:', error)
        alert(`Failed to submit form. Please email ${EMAIL} directly.`)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Contact info */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-[0.25em] text-[#bfff00] font-mono font-bold">— CONTACT</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-5xl font-heading font-black text-foreground leading-tight mb-6">
                Let&apos;s build the system your team actually needs
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
                Reach out with details about your business problem and the type of system you need. I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Email: click copies the address */}
            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={copyEmail}
                className="w-full flex items-center justify-between p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/10 hover:border-[#bfff00]/40 hover:bg-neutral-100 dark:hover:bg-neutral-900/30 transition-all duration-300 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfff00]"
                aria-label={copied ? 'Email address copied' : `Copy email address ${EMAIL}`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#bfff00] flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-black" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500 font-mono font-bold uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-base font-bold text-foreground group-hover:text-lime-700 dark:group-hover:text-[#bfff00] transition-colors truncate">{EMAIL}</p>
                  </div>
                </div>
                <span
                  className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                    copied ? 'text-lime-700 dark:text-[#bfff00]' : 'text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-white'
                  }`}
                  aria-live="polite"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>
              <a
                href={`mailto:${EMAIL}?subject=Project%20Inquiry`}
                className="inline-block text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 transition-colors"
              >
                or open it in your mail app
              </a>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="p-6 md:p-8 lg:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/10 backdrop-blur-sm shadow-sm dark:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 block uppercase tracking-widest font-mono">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-[#bfff00] focus:outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 block uppercase tracking-widest font-mono">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-[#bfff00] focus:outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-medium transition-all"
                  />
                </div>
              </div>

              {/* Project Type & Budget Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 block uppercase tracking-widest font-mono">Project Type</label>
                  <select
                    name="projectType"
                    required
                    value={formState.projectType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-950 border focus:border-[#bfff00] focus:outline-none text-neutral-900 dark:text-neutral-300 font-medium transition-all duration-500 ${
                      prefilledLabel ? 'border-[#bfff00] ring-4 ring-[#bfff00]/25' : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <option value="">Select type...</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {prefilledLabel && (
                    <p className="mt-2 text-xs font-mono text-lime-700 dark:text-[#bfff00]" aria-live="polite">
                      Set to {prefilledLabel}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 block uppercase tracking-widest font-mono">Budget</label>
                  <select
                    name="budget"
                    required
                    value={formState.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-[#bfff00] focus:outline-none text-neutral-900 dark:text-neutral-300 font-medium transition-all"
                  >
                    <option value="">Select range...</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-2k">$1,000 - $2,000</option>
                    <option value="2k-3k">$2,000 - $3,000</option>
                    <option value="3k-4k">$3,000 - $4,000</option>
                    <option value="4k-5k">$4,000 - $5,000</option>
                    <option value="5k+">$5,000+</option>
                  </select>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 block uppercase tracking-widest font-mono">Timeline</label>
                <select
                  name="timeline"
                  required
                  value={formState.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-[#bfff00] focus:outline-none text-neutral-900 dark:text-neutral-300 font-medium transition-all"
                >
                  <option value="">Select timeline...</option>
                  <option value="urgent">Urgent (1-2 weeks)</option>
                  <option value="soon">Soon (3-4 weeks)</option>
                  <option value="flexible">Flexible (1+ month)</option>
                </select>
              </div>

              {/* Project Details */}
              <div>
                <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 block uppercase tracking-widest font-mono">Project Details</label>
                <textarea
                  name="details"
                  required
                  value={formState.details}
                  onChange={handleInputChange}
                  placeholder="Tell me about your system requirements, technical constraints, and business goals..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-[#bfff00] focus:outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-medium transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 rounded-xl bg-[#bfff00] text-black font-bold hover:bg-[#cfff33] hover:shadow-lg hover:shadow-[#bfff00]/30 transition-all duration-300 mt-6 text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : submitSuccess ? 'Message sent!' : 'Send message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
