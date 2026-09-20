# Turnip

A small farm-app UI in the 2020 plush style: cool gray canvas, extra-bold Nunito, 3D mascots, magenta pills.

This repo is a demo site plus two ways to reuse the look. Pick one.

- **[DESIGN.md](./DESIGN.md)** - standalone visual spec
- **[skill/SKILL.md](./skill/SKILL.md)** - standalone agent skill (`plush-ui`)

Do not load both. Either file is enough.

![Turnip dashboard](docs/dashboard.png)

Farm and account screens:

![Farm](docs/farm.png)
![Your Page](docs/user.png)

## Run the site

```bash
npm install
npm run dev
```

Then open the local URL Vite prints.

## Install the skill

The skill is named `plush-ui`. It is self-contained. Copy `skill/SKILL.md` into your agent skills folder.

**Grok**

```bash
mkdir -p ~/.grok/skills/plush-ui
curl -fsSL https://raw.githubusercontent.com/aaronjmars/turnip-ui/main/skill/SKILL.md \
  -o ~/.grok/skills/plush-ui/SKILL.md
```

**Claude Code**

```bash
mkdir -p ~/.claude/skills/plush-ui
curl -fsSL https://raw.githubusercontent.com/aaronjmars/turnip-ui/main/skill/SKILL.md \
  -o ~/.claude/skills/plush-ui/SKILL.md
```

From a local clone, copy instead of curl:

```bash
mkdir -p ~/.grok/skills/plush-ui
cp skill/SKILL.md ~/.grok/skills/plush-ui/SKILL.md
```

Then say `/plush-ui` or "build a settings page in plush-ui style".

## Use DESIGN.md instead

If you would rather not install a skill, point an agent at [DESIGN.md](./DESIGN.md) and ask it to build a page from that spec. Same language, no skill file required.
