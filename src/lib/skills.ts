import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SKILLS_DIR = path.join(process.cwd(), 'skills')

export interface Skill {
  slug: string
  name: string
  description: string
  license: string
  category: string
  content: string
}

const CATEGORY_MAP: Record<string, string> = {
  'claude-api': 'AI',
  'mcp-builder': 'AI',
  'skill-creator': 'Skills',
}

function parseDescription(raw: unknown): string {
  if (typeof raw === 'string') return raw.trim().replace(/\n/g, ' ')
  return ''
}

export function getAllSkills(): Skill[] {
  if (!fs.existsSync(SKILLS_DIR)) return []

  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
  const skills: Skill[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const slug = entry.name
    if (slug === 'example') continue

    const skillFile = path.join(SKILLS_DIR, slug, 'SKILL.md')
    if (!fs.existsSync(skillFile)) continue

    const raw = fs.readFileSync(skillFile, 'utf-8')
    const { data, content } = matter(raw)

    skills.push({
      slug,
      name: data.name || slug,
      description: parseDescription(data.description),
      license: data.license || '',
      category: CATEGORY_MAP[slug] || 'Other',
      content,
    })
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name))
}

export function getSkillBySlug(slug: string): Skill | null {
  return getAllSkills().find(s => s.slug === slug) ?? null
}

export function getAllCategories(skills: Skill[]): string[] {
  return [...new Set(skills.map(s => s.category))].sort()
}
