# Skills Library

A searchable, GitHub Pages-hosted library of reusable agent skills and tools.

## Setup (one-time)

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push any commit to `main` — the site builds and deploys automatically

Live at: https://chrisurline.github.io/riskills-library/

## Adding a skill

1. Create a new directory under `skills/your-skill-name/`
2. Add a `SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: your-skill-name
   description: One sentence describing what this skill does
   license: MIT
   ---
   (skill content below)
   ```
3. Add the slug → category mapping in `src/lib/skills.ts`
4. Commit and push — the site rebuilds automatically

## Local development

```bash
npm install
npm run dev
```
