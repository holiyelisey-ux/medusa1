'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import type { Species } from '@/lib/jellyfish'
import { cn } from '@/lib/utils'

export function Anatomy({ species }: { species: Species }) {
  const ref = useRef<HTMLElement>(null)
  const parts = species.anatomy
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(parts.length - 1, Math.max(0, Math.floor(v * parts.length)))
    setActive((prev) => (prev === next ? prev : next))
  })

  const part = parts[active]
  const { accent } = species

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${parts.length * 70 + 100}svh` }}
      aria-labelledby="anatomy-title"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-abyss px-6 pt-20 md:px-16 md:pt-24">
        <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>
              02 · Строение
            </p>
            <h2 id="anatomy-title" className="font-serif text-3xl font-medium text-white md:text-5xl">
              Анатомия медузы
            </h2>
          </div>
          <p className="font-serif text-3xl tabular-nums text-white/40 md:text-5xl" aria-hidden="true">
            <span style={{ color: accent }}>{String(active + 1).padStart(2, '0')}</span>
            {' / '}
            {String(parts.length).padStart(2, '0')}
          </p>
        </div>
        <div className="mx-auto mt-4 h-px w-full max-w-6xl bg-white/10">
          <motion.div className="h-full" style={{ width: progressWidth, background: accent }} />
        </div>

        <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col items-center gap-4 py-6 md:flex-row md:gap-12">
          <div className="relative flex min-h-0 flex-1 items-center justify-center self-stretch">
            <motion.div
              className="relative aspect-[768/1376] h-full max-h-full"
              animate={{ scale: 1.15 }}
              style={{ originX: part.x / 100, originY: part.y / 100 }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            >
              <Image
                src={species.image || '/placeholder.svg'}
                alt={`Строение: ${species.name}`}
                fill
                sizes="(max-width: 768px) 60vw, 40vw"
                className="object-contain [mask-image:linear-gradient(to_bottom,#000_68%,transparent_97%)]"
              />
              {parts.map((p, i) => {
                const isActive = i === active
                const labelLeft = p.x > 50
                return (
                  <div
                    key={p.id}
                    className="absolute"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        'absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition-all duration-500',
                        isActive ? 'scale-125' : 'scale-75 opacity-40',
                      )}
                      style={{ background: isActive ? accent : 'transparent' }}
                    />
                    {isActive && (
                      <span
                        className="absolute size-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                        style={{ background: `${accent}55` }}
                      />
                    )}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          key={p.id}
                          className={cn(
                            'absolute top-0 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap',
                            labelLeft ? 'right-3 flex-row-reverse' : 'left-3',
                          )}
                          initial={{ opacity: 0, x: labelLeft ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <span className="h-px w-8 md:w-16" style={{ background: accent }} />
                          <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white md:text-sm">
                            {p.name}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-6 md:w-[42%]">
            <div className="relative min-h-40 md:min-h-56" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col gap-3"
                >
                  <h3 className="font-serif text-3xl text-white md:text-5xl">{part.name}</h3>
                  <p className="text-pretty leading-relaxed text-cyan-50/80 md:text-lg">{part.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <ul className="hidden flex-wrap gap-2 md:flex" aria-label="Части тела">
              {parts.map((p, i) => (
                <li
                  key={p.id}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs transition-colors duration-300',
                    i === active ? 'text-abyss' : 'border-white/15 text-cyan-50/60',
                  )}
                  style={i === active ? { background: accent, borderColor: accent } : undefined}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
