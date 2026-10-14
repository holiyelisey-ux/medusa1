import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSpecies, species } from '@/lib/jellyfish'
import { JellyFilters } from '@/components/ocean/jelly-filters'
import { StoryHero } from '@/components/story/story-hero'
import { Passport } from '@/components/story/passport'
import { Anatomy } from '@/components/story/anatomy'
import { Lifecycle } from '@/components/story/lifecycle'
import { Facts } from '@/components/story/facts'
import { SpeciesNav, TopBar } from '@/components/story/species-nav'

export function generateStaticParams() {
  return species.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getSpecies(slug)
  if (!s) return {}
  return {
    title: `${s.name} (${s.latin}) — строение и факты`,
    description: s.intro,
  }
}

export default async function SpeciesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSpecies(slug)
  if (!s) notFound()
  const index = species.findIndex((x) => x.slug === slug)

  return (
    <main className="bg-abyss">
      <JellyFilters />
      <TopBar species={s} />
      <StoryHero species={s} index={index} />
      <Passport species={s} />
      <Anatomy species={s} />
      <Lifecycle species={s} />
      <Facts species={s} />
      <SpeciesNav species={s} />
    </main>
  )
}
