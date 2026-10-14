'use client'

import { motion } from 'motion/react'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 50,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <Reveal className="mb-12 flex flex-col gap-3 md:mb-16">
      <p className="text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>
        {eyebrow}
      </p>
      <h2 className="text-balance font-serif text-4xl font-medium leading-tight text-white md:text-6xl">{title}</h2>
    </Reveal>
  )
}
