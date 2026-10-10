export default function AnimatedOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1 - Hero section - Lime Green */}
      <div
        className="absolute w-96 h-96 rounded-full blur-[120px] opacity-[0.08] dark:opacity-[0.08] animate-drift mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #bfff00 0%, transparent 70%)',
          top: '10%',
          left: '10%',
          '--drift-x': '40px',
          '--drift-y': '50px',
        } as any}
      />

      {/* Orb 2 - Middle section - Blue */}
      <div
        className="absolute w-96 h-96 rounded-full blur-[120px] opacity-[0.06] dark:opacity-[0.06] animate-drift-slow mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #3399ff 0%, transparent 70%)',
          top: '40%',
          right: '5%',
          '--drift-x': '-30px',
          '--drift-y': '-40px',
        } as any}
      />

      {/* Orb 3 - Bottom section - Lime Green */}
      <div
        className="absolute w-80 h-80 rounded-full blur-[120px] opacity-[0.05] dark:opacity-[0.05] animate-drift mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #bfff00 0%, transparent 70%)',
          bottom: '10%',
          left: '50%',
          '--drift-x': '20px',
          '--drift-y': '-30px',
        } as any}
      />
    </div>
  )
}
