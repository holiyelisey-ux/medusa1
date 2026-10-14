'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { Fish, MapPin, ShieldAlert } from 'lucide-react'
import type { Species, Stat } from '@/lib/jellyfish'
import { Reveal, SectionHeading } from './reveal'

function Counter({ stat, accent }: { stat: Stat; accent: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, stat.value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    })
    return () => controls.stop()
  }, [inView, stat.value])

  const formatted = value.toLocaleString('ru-RU', {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  })

  return (
    <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
      <span ref={ref} className="font-serif text-5xl font-medium tabular-nums md:text-6xl" style={{ color: accent }}>
        {stat.prefix && <span className="text-2xl text-white/60 md:text-3xl">{stat.prefix}</span>}
        {formatted}
        <span className="text-3xl md:text-4xl">{stat.suffix}</span>
      </span>
      <span className="text-sm text-cyan-50/70">{stat.label}</span>
    </div>
  )
}

export function Passport({ species }: { species: Species }) {
  const { accent } = species
  return (
    <section className="relative bg-abyss px-6 py-24 md:px-16 md:py-36" aria-labelledby="passport-title">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="01 · Паспорт вида" title="Систематика и ключевые цифры" accent={accent} />

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <ol className="relative flex flex-col" aria-label="Классификация">
            {species.classification.map((c, i) => (
              <motion.li
                key={c.rank}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
                style={{ paddingLeft: `${i * 10}px` }}
              >
                <span className="text-xs uppercase tracking-[0.25em] text-cyan-50/50">{c.rank}</span>
                <span
                  className={i === species.classification.length - 1 ? 'font-serif text-2xl italic' : 'text-right text-white'}
                  style={i === species.classification.length - 1 ? { color: accent } : undefined}
                >
                  {c.value}
                </span>
              </motion.li>
            ))}
          </ol>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {species.stats.map((s) => (
              <Counter key={s.label} stat={s} accent={accent} />
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { icon: MapPin, title: 'Где обитает', text: species.habitat },
            { icon: Fish, title: 'Чем питается', text: species.diet },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.15}>
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                <card.icon className="size-6" style={{ color: accent }} aria-hidden="true" />
                <h3 className="font-serif text-2xl text-white">{card.title}</h3>
                <p className="text-pretty leading-relaxed text-cyan-50/75">{card.text}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <ShieldAlert className="size-6" style={{ color: accent }} aria-hidden="true" />
              <h3 className="font-serif text-2xl text-white">Опасность для человека</h3>
              <div className="flex gap-1.5" role="img" aria-label={`Уровень опасности ${species.danger.level} из 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.span
                    key={i}
                    className="h-2 flex-1 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                    style={{
                      originX: 0,
                      background: i < species.danger.level ? accent : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
              <p className="text-pretty leading-relaxed text-cyan-50/75">{species.danger.text}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
