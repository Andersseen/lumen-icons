# Contributing to Lumen Icons

Thank you for your interest in contributing! This document will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feat/my-feature`

## Development Workflow

```bash
# Start the dev server
pnpm run dev

# Run quality checks (lint + typecheck + unit tests + package checks)
pnpm run check

# Run individual checks
pnpm run lint
pnpm run typecheck
pnpm run test:unit
pnpm run test:e2e
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/). Your commit messages must follow this format:

```
<type>(<scope>): <description>
```

**Types:**
- `feat`: A new icon or feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD changes

**Examples:**
```
feat(icons): add lmn-arrow-left icon
fix(check): correct viewBox dimensions
docs(readme): update installation guide
test(icons): add accessibility tests for heart icon
```

## Pre-commit Hooks

We use Husky + lint-staged. Before each commit:
- ESLint auto-fix runs on staged files
- Commit message is validated against Conventional Commits

## Adding a New Icon

1. Create `packages/icons/src/icons/my-icon.ts`
2. Add the component following existing patterns (see `CLAUDE.md`)
3. Run `pnpm run sync:icons` to update the library barrel and demo catalog
4. Add focused tests if the icon has custom animation or unusual SVG structure
5. Run `pnpm run check` to verify everything passes

Animation is optional API surface. Every icon must be fully visible when `animate` is false; stroke-draw hiding such as `stroke-dashoffset` belongs inside `.is-animated` selectors only.

## Pull Request Process

1. Ensure all quality checks pass: `pnpm run check`
2. Update documentation if needed
3. Fill out the PR template completely
4. Request review from code owners
5. Ensure CI passes before merging

## Code Style

- **Standalone components** always
- **OnPush** change detection everywhere
- **Signals API** (`input()`, `output()`, `inject()`)
- **Host bindings** via `host: {}` metadata
- No `console.log` in library code
- Use `import type` for type-only imports

## Questions?

Open an issue or start a discussion. We're happy to help!
