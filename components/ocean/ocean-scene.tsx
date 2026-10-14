'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { species } from '@/lib/jellyfish'
import { JellyFilters } from './jelly-filters'
import { LivingJellyfish } from './living-jellyfish'
import { MarineSnow } from './marine-snow'

export function OceanScene() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const active = species.find((s) => s.slug === selected)

  function dive(slug: string) {
    if (selected) return
    setSelected(slug)
    window.setTimeout(() => router.push(`/meduza/${slug}`), 1100)
  }

  return (
    <main className="relative h-svh w-full overflow-hidden bg-abyss">
      <JellyFilters />
      <motion.div
        className="absolute inset-0"
        animate={active ? { scale: 2.6 } : { scale: 1 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        style={{
          transformOrigin: active ? `${active.home.left}% ${active.home.top + 18}%` : '50% 50%',
        }}
      >
        <Image
          src="/images/seabed.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-bottom"
        />
        <div
          aria-hidden="true"
          className="god-rays pointer-events-none absolute inset-x-0 top-0 h-3/4 bg-[conic-gradient(from_180deg_at_45%_-10%,transparent_42%,oklch(0.95_0.05_190/0.12)_46%,transparent_49%,oklch(0.95_0.05_190/0.08)_52%,transparent_56%)] mix-blend-screen"
        />
        <div aria-hidden="true" className="caustics pointer-events-none absolute inset-0 mix-blend-screen" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,oklch(0.1_0.025_235/0.75)_100%)]"
        />
        <MarineSnow count={70} />

        {species.map((s, i) => {
          const dimmed = selected !== null && selected !== s.slug
          return (
            <motion.button
              key={s.slug}
              type="button"
              onClick={() => dive(s.slug)}
              onMouseEnter={() => router.prefetch(`/meduza/${s.slug}`)}
              onFocus={() => router.prefetch(`/meduza/${s.slug}`)}
              aria-label={`${s.name} — открыть строение и факты`}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: dimmed ? 0 : 1, y: 0 }}
              transition={{ duration: dimmed ? 0.6 : 1.8, delay: selected ? 0 : 0.3 + i * 0.35, ease: 'easeOut' }}
              className="group absolute cursor-pointer outline-none transition-[filter] duration-500 hover:brightness-125 focus-visible:brightness-125"
              style={{
                left: `${s.home.left}%`,
                top: `${s.home.top}%`,
                width: s.home.width,
                marginLeft: `calc(${s.home.width} / -2)`,
              }}
            >
              <LivingJellyfish
                src={s.image}
                alt=""
                filterIndex={i}
                duration={s.home.duration}
                delay={s.home.delay}
                accent={s.accent}
                priority
              />
              <span className="pointer-events-none absolute -bottom-2 left-1/2 flex -translate-x-1/2 translate-y-full flex-col items-center gap-1 whitespace-nowrap text-center opacity-80 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="font-serif text-lg italic text-white md:text-2xl">{s.altName}</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-100/70 md:text-xs">{s.latin}</span>
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      <motion.header
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 px-6 pb-8 text-center md:pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: selected ? 0 : 1, y: 0 }}
        transition={{ duration: 1.2, delay: selected ? 0 : 1.4 }}
      >
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-100/70">Презентация по биологии · Тип Стрекающие</p>
        <h1 className="text-balance font-serif text-4xl font-medium leading-none text-white md:text-7xl">
          Медузы: <span className="italic text-primary">три жизни</span> в толще воды
        </h1>
        <p className="flex items-center gap-2 text-sm text-cyan-50/80">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Нажмите на медузу, чтобы погрузиться
        </p>
      </motion.header>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-abyss"
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        transition={{ duration: 0.6, delay: selected ? 0.6 : 0 }}
      />
    </main>
  )
}
