# Source provenance

Every non-trivial result carries provenance so consumers know where signals came from. See
[ADR-0003](./adr/0003-source-provenance-required.md).

## `CompanyIntelligenceMetadata`

| Field | Meaning |
|---|---|
| `provider` | Which provider produced the result (e.g. `company-intelligence`, `company-intelligence-mock`) |
| `degraded` | True when low-confidence / unknown-fallback |
| `engineVersion` | Implementation version |
| `retrievedAt` | ISO-8601 timestamp |
| `confidence` | `{ value: 0–1, band: high\|medium\|low\|unknown }` |
| `sources[]` | `SourceProvenance` entries backing the result |
| `warnings[]` | Non-fatal warnings (e.g. "could not resolve company") |

## `SourceProvenance.kind`

- `official` — the company's/authority's own data.
- `third-party` — external aggregator/reporter.
- `derived` — inferred by the engine from other signals.
- `demo` — illustrative fixture data (this repo's fixtures), never a real-world claim.

## Unknown is valid

When a company/domain can't be confidently resolved, the result is returned with
`resolved: false` / empty signals, `degraded: true`, a low/unknown confidence band, and a
warning — the API never invents claims to fill gaps.
