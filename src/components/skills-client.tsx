'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { SkillCard } from '@/components/skill-card'
import type { Skill } from '@/lib/skills'

interface Props {
  skills: Skill[]
  categories: string[]
}

const CATEGORY_COLORS: Record<string, string> = {
  Security:    'border-red-800/60 text-red-400 hover:bg-red-900/30',
  Development: 'border-blue-800/60 text-blue-400 hover:bg-blue-900/30',
  Browser:     'border-purple-800/60 text-purple-400 hover:bg-purple-900/30',
  Research:    'border-yellow-800/60 text-yellow-400 hover:bg-yellow-900/30',
  AI:          'border-cyan-800/60 text-cyan-400 hover:bg-cyan-900/30',
  Media:       'border-pink-800/60 text-pink-400 hover:bg-pink-900/30',
  Productivity:'border-orange-800/60 text-orange-400 hover:bg-orange-900/30',
  Design:      'border-violet-800/60 text-violet-400 hover:bg-violet-900/30',
  Skills:      'border-green-800/60 text-green-400 hover:bg-green-900/30',
}

const CATEGORY_ACTIVE: Record<string, string> = {
  Security:    'bg-red-900/40 border-red-700 text-red-300',
  Development: 'bg-blue-900/40 border-blue-700 text-blue-300',
  Browser:     'bg-purple-900/40 border-purple-700 text-purple-300',
  Research:    'bg-yellow-900/40 border-yellow-700 text-yellow-300',
  AI:          'bg-cyan-900/40 border-cyan-700 text-cyan-300',
  Media:       'bg-pink-900/40 border-pink-700 text-pink-300',
  Productivity:'bg-orange-900/40 border-orange-700 text-orange-300',
  Design:      'bg-violet-900/40 border-violet-700 text-violet-300',
  Skills:      'bg-green-900/40 border-green-700 text-green-300',
}

export function SkillsClient({ skills, categories }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return skills.filter(skill => {
      const matchesCategory = !activeCategory || skill.category === activeCategory
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [skills, query, activeCategory])

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search skills..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="max-w-sm bg-zinc-900 border-zinc-700 focus:border-zinc-500"
      />

      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={`cursor-pointer transition-colors ${
            activeCategory === null
              ? 'bg-zinc-700 border-zinc-500 text-white'
              : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          All {activeCategory === null && `(${filtered.length})`}
        </Badge>
        {categories.map(cat => {
          const isActive = activeCategory === cat
          const count = skills.filter(s => s.category === cat).length
          return (
            <Badge
              key={cat}
              variant="outline"
              className={`cursor-pointer transition-colors ${
                isActive
                  ? (CATEGORY_ACTIVE[cat] ?? 'bg-zinc-700 border-zinc-500 text-white')
                  : (CATEGORY_COLORS[cat] ?? 'border-zinc-700 text-zinc-400 hover:bg-zinc-800')
              }`}
              onClick={() => setActiveCategory(isActive ? null : cat)}
            >
              {cat} ({count})
            </Badge>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm py-8 text-center">No skills match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(skill => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      )}
    </div>
  )
}
