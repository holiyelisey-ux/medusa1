function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function MarineSnow({ count = 60, seed = 7 }: { count?: number; seed?: number }) {
  const rand = seeded(seed)
  const particles = Array.from({ length: count }, (_, i) => {
    const size = 1 + rand() * 3
    return {
      id: i,
      left: rand() * 100,
      top: 60 + rand() * 60,
      size,
      duration: 18 + rand() * 30,
      delay: -rand() * 40,
      drift: (rand() - 0.5) * 120,
      opacity: 0.25 + rand() * 0.55,
      blur: size > 3 ? 1.5 : 0,
    }
  })

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="marine-snow absolute rounded-full bg-cyan-50"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              '--dur': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
              '--o': p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
