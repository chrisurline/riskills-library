import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Skill } from '@/lib/skills'

const CATEGORY_COLORS: Record<string, string> = {
  Security:    'bg-red-900/30 text-red-400 border-red-800/60',
  Development: 'bg-blue-900/30 text-blue-400 border-blue-800/60',
  Browser:     'bg-purple-900/30 text-purple-400 border-purple-800/60',
  Research:    'bg-yellow-900/30 text-yellow-400 border-yellow-800/60',
  AI:          'bg-cyan-900/30 text-cyan-400 border-cyan-800/60',
  Media:       'bg-pink-900/30 text-pink-400 border-pink-800/60',
  Productivity:'bg-orange-900/30 text-orange-400 border-orange-800/60',
  Design:      'bg-violet-900/30 text-violet-400 border-violet-800/60',
  Skills:      'bg-green-900/30 text-green-400 border-green-800/60',
  Other:       'bg-zinc-800/50 text-zinc-400 border-zinc-700',
}

export function SkillCard({ skill }: { skill: Skill }) {
  const categoryClass = CATEGORY_COLORS[skill.category] ?? CATEGORY_COLORS.Other
  const truncated = skill.description.length > 120
    ? skill.description.slice(0, 117) + '...'
    : skill.description

  return (
    <Link href={`/skills/${skill.slug}`} className="group block h-full">
      <Card className="h-full border-border bg-card transition-colors group-hover:border-zinc-500 group-hover:bg-zinc-800/50">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold leading-tight group-hover:text-white transition-colors">
              {skill.name}
            </CardTitle>
            <Badge variant="outline" className={`${categoryClass} text-xs shrink-0`}>
              {skill.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{truncated}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
