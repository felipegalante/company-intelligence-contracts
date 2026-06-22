# ADR-0001 — The Company Intelligence public boundary

**Status:** Accepted

## Context

Company/domain/market context (identity resolution, employer signals, market signals,
calibration hints) is needed by multiple products and engines. It must have a single owner and
a stable public contract, separate from any one consumer.

## Decision

`company-intelligence-contracts` is the **public boundary**: stable DTOs
(`@company-intelligence/types`), a provider interface (`@company-intelligence/provider`), an
HTTP client (`@company-intelligence/client`), the OpenAPI contract, demo fixtures, a
fixture-backed mock server, and reusable contract tests. The private implementation lives at
`github.com/pathmerit/company-intelligence` and implements this contract.

This repo contains **no** real data gathering/scraping, credentials, or private source lists.

## Consequences

- Consumers (Rubric Compiler, Resume ATS Intelligence, Intelligent Job Board, PathMerit)
  depend on the contract, not the implementation.
- The mock server + contract tests let consumers build and test before the private service
  exists.
- The private service is guarded by the same `@company-intelligence/contract-tests`.
