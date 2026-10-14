'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion, useScroll } from 'motion/react'
import { species as allSpecies, type Species } from '@/lib/jellyfish'
import { Reveal } from './reveal'

export function TopBar({ species }: { species: Species }) {
  const { scrollYProgress } = useScroll()
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="h-0.5"
        style={{ scaleX: scrollYProgress, originX: 0, background: species.accent }}
        aria-hidden="true"
      />
      <div className="flex items-center justify-between px-6 py-4 md:px-16">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-white/15 bg-abyss/50 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          На дно
        </Link>
        <span className="hidden font-serif text-lg italic text-white/70 md:block">{species.latin}</span>
      </div>
    </header>
  )
}

export function SpeciesNav({ species }: { species: Species }) {
  const others = allSpecies.filter((s) => s.slug !== species.slug)
  return (
    <section className="relative bg-abyss px-6 pb-24 pt-12 md:px-16" aria-labelledby="next-title">
      <div className="mx-auto max-w-6xl border-t border-white/10 pt-16">
        <Reveal>
          <h2 id="next-title" className="font-serif text-4xl text-white md:text-5xl">
            Следующая медуза
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.15}>
              <Link
                href={`/meduza/${s.slug}`}
                className="group flex items-center gap-6 overflow-hidden rounded-3xl border border-white/10 bg-black p-4 transition-colors hover:border-white/30"
              >
                <div className="relative aspect-[768/1376] w-20 shrink-0 transition-transform duration-700 group-hover:-translate-y-2 md:w-28">
                  <Image src={s.image || '/placeholder.svg'} alt="" fill sizes="112px" className="object-contain" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em]" style={{ color: s.accent }}>
                    {s.latin}
                  </span>
                  <span className="font-serif text-2xl text-white md:text-3xl">{s.name}</span>
                  <span className="text-sm text-cyan-50/60">{s.tagline}</span>
                </div>
                <ArrowUpRight
                  className="size-6 shrink-0 text-white/50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-16 text-center text-xs uppercase tracking-[0.3em] text-cyan-50/40">
          Презентация по биологии · Тип Стрекающие · Класс Сцифоидные
        </p>
      </div>
    </section>
  )
}
