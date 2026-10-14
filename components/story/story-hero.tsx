'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import type { Species } from '@/lib/jellyfish'
import { LivingJellyfish } from '@/components/ocean/living-jellyfish'
import { MarineSnow } from '@/components/ocean/marine-snow'

export function StoryHero({ species, index }: { species: Species; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const jellyScale = useTransform(scrollYProgress, [0, 1], [1, 0.55])
  const jellyX = useTransform(scrollYProgress, [0.25, 1], ['0vw', '22vw'])
  const jellyY = useTransform(scrollYProgress, [0, 1], ['0svh', '-8svh'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const introOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])
  const introY = useTransform(scrollYProgress, [0.35, 0.6], [60, 0])

  return (
    <section ref={ref} className="relative h-[220vh]" aria-labelledby="species-title">
      <div className="sticky top-0 h-svh overflow-hidden bg-abyss">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 35%, ${species.accent}33, transparent 70%)` }}
        />
        <MarineSnow count={45} seed={index + 3} />

        <motion.div
          className="absolute left-1/2 top-[6svh] aspect-[768/1376] h-[88svh] -translate-x-1/2"
          style={{ scale: jellyScale, x: jellyX, y: jellyY }}
        >
          <motion.div
            className="h-full"
            initial={{ scale: 1.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <LivingJellyfish
              src={species.image}
              alt={`${species.name} (${species.latin})`}
              filterIndex={index}
              accent={species.accent}
              className="h-full w-full"
              priority
              sizes="50vh"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-16 text-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: species.accent }}>
              {species.tagline}
            </p>
            <h1 id="species-title" className="text-balance font-serif text-5xl font-medium leading-none text-white md:text-8xl">
              {species.name}
            </h1>
            <p className="font-serif text-xl italic text-cyan-50/70 md:text-2xl">{species.latin}</p>
            <ChevronDown className="mt-4 size-6 animate-bounce text-cyan-50/60" aria-hidden="true" />
            <span className="sr-only">Прокрутите вниз</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-y-0 left-0 flex w-full items-center px-6 md:w-1/2 md:px-16"
          style={{ opacity: introOpacity, y: introY }}
        >
          <div className="max-w-lg rounded-2xl border border-white/10 bg-abyss/60 p-6 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none md:border-0">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-cyan-100/60">Знакомство · {species.altName}</p>
            <p className="text-pretty font-serif text-2xl leading-snug text-white md:text-4xl">{species.intro}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
