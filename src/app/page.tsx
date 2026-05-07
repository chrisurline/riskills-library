import { getAllSkills, getAllCategories } from '@/lib/skills'
import { SkillsClient } from '@/components/skills-client'

export default function Home() {
  const skills = getAllSkills()
  const categories = getAllCategories(skills)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agent Skills Library</h1>
        <p className="mt-2 text-muted-foreground">
          Reusable skills and tools your agents can pick up and use. {skills.length} skills available.
        </p>
      </div>
      <SkillsClient skills={skills} categories={categories} />
    </div>
  )
}
