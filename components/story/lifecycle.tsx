'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { lifecycle, type Species } from '@/lib/jellyfish'
import { Reveal, SectionHeading } from './reveal'

export function Lifecycle({ species }: { species: Species }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const { accent } = species

  return (
    <section className="relative bg-abyss px-6 py-24 md:px-16 md:py-36" aria-labelledby="lifecycle-title">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="03 · Жизненный цикл" title="Чередование поколений: полип и медуза" accent={accent} />

        <ol ref={ref} className="relative flex flex-col gap-14 pl-12 md:pl-20">
          <span aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-white/10 md:left-8" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px md:left-8"
            style={{ scaleY: lineScale, originY: 0, background: accent }}
          />
          {lifecycle.map((step, i) => (
            <li key={step.stage} className="relative">
              <motion.span
                aria-hidden="true"
                className="absolute -left-8 top-1 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border text-xs font-semibold md:-left-12"
                initial={{ scale: 0, borderColor: 'rgba(255,255,255,0.2)' }}
                whileInView={{ scale: 1, borderColor: accent }}
                viewport={{ once: true, margin: '-30% 0px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <span
                  className="flex size-8 items-center justify-center rounded-full bg-abyss"
                  style={{ color: accent }}
                >
                  {i + 1}
                </span>
              </motion.span>
              <Reveal y={30}>
                <h3 className="font-serif text-3xl text-white md:text-4xl">{step.stage}</h3>
                <p className="mt-2 max-w-xl text-pretty leading-relaxed text-cyan-50/75">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16">
          <p
            className="rounded-2xl border-l-2 bg-white/[0.03] p-6 font-serif text-xl italic leading-relaxed text-white md:text-2xl"
            style={{ borderColor: accent }}
          >
            {species.lifecycleNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
