# ADR-0003 — Source provenance + confidence are required

**Status:** Accepted

## Context

Company/market intelligence is inherently uncertain and partly derived. Consumers must be able
to tell where a signal came from and how much to trust it, and must not be handed invented
claims presented as fact.

## Decision

Every non-trivial result carries `CompanyIntelligenceMetadata`: `provider`, `degraded`,
`engineVersion`, `retrievedAt`, a `confidence` score (`value` 0–1 + `band`), `sources[]`
(each with a `kind` — `official` / `third-party` / `derived` / `demo`), and `warnings[]`.
**Unknown is a valid result**: when a company/domain can't be confidently resolved, the API
returns a low-confidence, `degraded: true` result with a warning — never a fabricated one. Demo
fixtures mark provenance `kind: "demo"`.

## Consequences

- Consumers can gate on confidence and surface provenance.
- The contract tests assert the metadata block on every response.
- Calibration hints can be applied proportionally to confidence.
