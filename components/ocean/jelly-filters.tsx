const filters = [
  { id: 'jelly-wave-0', seed: 3, freq: ['0.006 0.018', '0.008 0.024', '0.006 0.018'], dur: '7s' },
  { id: 'jelly-wave-1', seed: 11, freq: ['0.005 0.016', '0.007 0.022', '0.005 0.016'], dur: '9s' },
  { id: 'jelly-wave-2', seed: 23, freq: ['0.006 0.02', '0.0075 0.026', '0.006 0.02'], dur: '8s' },
]

export function JellyFilters() {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
      <defs>
        {filters.map((f) => (
          <filter key={f.id} id={f.id} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency={f.freq[0]} numOctaves={2} seed={f.seed} result="noise">
              <animate attributeName="baseFrequency" dur={f.dur} values={f.freq.join(';')} repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={14} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
      </defs>
    </svg>
  )
}
