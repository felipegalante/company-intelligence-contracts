# company-intelligence-contracts

Public **contracts + SDK + fixtures + mock server + contract tests** for the private
**Company Intelligence** API in the PathMerit ecosystem.

Company Intelligence owns company identity resolution, employer/company signals,
domain/market context, source provenance, confidence scoring, and **scoring-calibration
hints**. This repository owns only the *public contract* for it — the stable types, the
provider interface, an HTTP client, the OpenAPI contract, demo fixtures, a fixture-backed mock
server, and reusable contract tests.

> It does **not** contain the private implementation, any real data gathering/scraping,
> credentials, or private source lists. The private service lives at
> `github.com/pathmerit/company-intelligence` and implements this contract.

## Why a separate contract repo

Company/domain/market context has many consumers, so it must not stay buried inside Rubric
Compiler:

- **Rubric Compiler** uses calibration hints to adjust scoring.
- **Resume ATS Intelligence** surfaces company/domain context in the generated report.
- **Intelligent Job Board** can show company/domain insights on job pages.
- **PathMerit** uses it for company prep, resume tailoring, and application strategy.

## Packages

| Package | Purpose |
|---|---|
| `@company-intelligence/types` | Stable DTOs: identities, signals, calibration hints, provenance, confidence |
| `@company-intelligence/provider` | The `CompanyIntelligenceProvider` interface |
| `@company-intelligence/client` | HTTP client implementing the provider |
| `@company-intelligence/fixtures` | Public demo fixtures (clearly marked demo provenance) |
| `@company-intelligence/mock-server` | Fixture-backed mock Company Intelligence API |
| `@company-intelligence/contract-tests` | Reusable contract tests (shape + provenance) |

## Modeling principles

- **Signals, not just facts** — company stage, archetype, operating pace, business model,
  regulated-industry flags, technical-product depth, and candidate calibration hints.
- **Provenance required** — every non-trivial result carries `sources[]`, `retrievedAt`,
  `confidence`, `provider`, and `warnings`.
- **Unknown is valid** — the API supports unknown/low-confidence results without inventing
  claims.

## Development

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @company-intelligence/mock-server dev
```

Uses pnpm workspaces + Turborepo; each package is consumed as TypeScript source within the
workspace and builds to `dist/` (ESM + CJS + types) via `tsup`.
