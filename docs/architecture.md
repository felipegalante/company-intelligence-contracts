# Architecture

```
Consumers (Rubric Compiler, Resume ATS Intelligence, Intelligent Job Board, PathMerit)
        │  depend on the contract, not the implementation
        ▼
@company-intelligence/provider  ── CompanyIntelligenceProvider interface
        ├── @company-intelligence/client       → (HTTP) private Company Intelligence service
        └── @company-intelligence/mock-server  → fixture-backed, in-process / local HTTP
```

## Packages

```
types          (no deps; DTOs + signal enums + provenance/confidence)
provider       → types
client         → provider, types       (HTTP, implements the provider)
fixtures       → types                  (demo data + lookups)
mock-server    → provider, types, fixtures (fixture-backed provider + HTTP handler)
contract-tests → provider, types (+ client/mock-server in its own tests)
```

## Ownership

**Owns (contract only):** public types, provider interface, client, OpenAPI, demo fixtures,
mock server, contract tests.

**Does not own:** the private implementation, real data gathering/scraping, credentials,
private source lists, or any product/user persistence. Those live in
`github.com/pathmerit/company-intelligence` and in the consuming products.

## Company vs market (domain) context

- **Company context** (`/v1/companies/*`) is about a *specific* employer — identity, stage,
  archetype, pace, regulated flag, technical depth.
- **Domain/market context** (`/v1/domains/intel`) is about an *industry/market* — regulatory
  intensity, hiring norms — independent of a specific company.
- **Application context** (`/v1/context/application`) combines both into prep insights and
  resume-tailoring angles for a job seeker.
