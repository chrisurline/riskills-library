import { getAllSkills, getSkillBySlug } from '@/lib/skills'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export async function generateStaticParams() {
  return getAllSkills().map(s => ({ slug: s.slug }))
}

const LICENSE_COLORS: Record<string, string> = {
  MIT: 'bg-green-900/40 text-green-400 border-green-800',
  'Apache-2.0': 'bg-blue-900/40 text-blue-400 border-blue-800',
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = getSkillBySlug(slug)
  if (!skill) notFound()

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const licenseClass = LICENSE_COLORS[skill.license] ?? 'bg-zinc-800 text-zinc-300 border-zinc-700'

  return (
    <div className="space-y-6">
      <div>
        <a href={`${basePath}/`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← All skills
        </a>
      </div>

      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">{skill.name}</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">{skill.description}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0 pt-1">
          <Badge variant="outline" className="bg-zinc-800/50 border-zinc-700 text-zinc-300">
            {skill.category}
          </Badge>
          {skill.license && (
            <Badge variant="outline" className={licenseClass}>
              {skill.license}
            </Badge>
          )}
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 prose prose-invert prose-sm max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-8 prose-h3:text-base prose-h3:mt-6
        prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-zinc-200 prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-zinc-600 prose-blockquote:text-muted-foreground
        prose-strong:text-foreground">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {skill.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
