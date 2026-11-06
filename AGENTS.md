# BookNook — OpenCode Instructions

Single-package Next 16.4.5 + React 19 App Router app (TypeScript strict, Tailwind v4). No monorepo, no tests, no CI, no DB/API routes/env yet — UI shell only.

## Commands (npm only — `package-lock.json` is the lockfile)

- `npm run dev` — `next dev` (Turbopack), http://localhost:3000
- `npm run lint && npx tsc --noEmit && npm run build` — full check; only `dev`/`build`/`start`/`lint` scripts exist
- No formatter, test runner, pre-commit, or CI hooks — do not assume them

## Entrypoints & boundaries

- `src/app/layout.tsx` (`RootLayout`, Geist fonts) → `src/app/page.tsx` (`Home`, currently empty) → `src/app/globals.css` (all tokens/theme)
- `@/*` → `./src/*` (`tsconfig.json`). `next-env.d.ts` is generated/gitignored — never hand-edit
- `src/components/ui/*` — shadcn (`base-nova`, `components.json`) primitives; add UI via shadcn CLI to keep registry/aliases in sync; do not hand-roll primitives

## Gotchas an agent will miss

- `next.config.ts`: `cacheComponents`, `partialPrefetching`, `reactCompiler` all on; CSS via `@tailwindcss/turbopack`. Assume static/cacheable by default; skip manual `useMemo`/`React.memo` (compiler handles it); opt into dynamic APIs explicitly
- Tailwind v4: no `tailwind.config.*`. Theme defined in `@theme inline` + `:root`/`.dark` in `src/app/globals.css`; dark uses custom-variant — edit CSS, not config
- UI is `@base-ui/react`-based (not Radix) with `class-variance-authority` + `lucide-react`. Primitives import `cn` from `@/lib/utils`, not `clsx`/`tailwind-merge`
- Shiki (`src/lib/highlighter.tsx`): lazy-loads only listed languages via a singleton — unlisted languages return `null`
- `README.md` is vanilla `create-next-app` boilerplate — trust `package.json`/config over it
