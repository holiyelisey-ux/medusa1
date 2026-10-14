'use client'

import { motion } from 'motion/react'
import type { Species } from '@/lib/jellyfish'
import { SectionHeading } from './reveal'

export function Facts({ species }: { species: Species }) {
  const { accent } = species
  return (
    <section className="relative bg-abyss px-6 py-24 md:px-16 md:py-36" aria-labelledby="facts-title">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="04 · Интересные факты" title="Удивительное о виде" accent={accent} />
        <div className="grid gap-6 md:grid-cols-2">
          {species.facts.map((fact, i) => (
            <motion.article
              key={fact.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
              initial={{ opacity: 0, y: 80, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, delay: (i % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: accent }}
              />
              <span className="font-serif text-6xl leading-none" style={{ color: accent }} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-serif text-3xl text-white">{fact.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-cyan-50/75">{fact.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
