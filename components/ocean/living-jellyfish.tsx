import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt: string
  filterIndex: number
  duration?: number
  delay?: number
  accent: string
  className?: string
  priority?: boolean
  sizes?: string
}

export function LivingJellyfish({
  src,
  alt,
  filterIndex,
  duration = 10,
  delay = 0,
  accent,
  className,
  priority,
  sizes = '(max-width: 768px) 30vw, 22vw',
}: Props) {
  return (
    <div
      className={cn('jelly-float relative', className)}
      style={{ '--dur': `${duration}s`, '--delay': `${-delay}s` } as React.CSSProperties}
    >
      <div className="jelly-sway">
        <div className="jelly-pulse relative aspect-[768/1376] w-full">
          <div
            aria-hidden="true"
            className="absolute inset-x-[10%] top-[8%] h-[35%] rounded-full opacity-40 blur-3xl"
            style={{ background: accent }}
          />
          <Image
            src={src || '/placeholder.svg'}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-contain [mask-image:linear-gradient(to_bottom,#000_68%,transparent_97%)]"
            style={{ filter: `url(#jelly-wave-${filterIndex % 3})` }}
          />
        </div>
      </div>
    </div>
  )
}
