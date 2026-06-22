# ADR-0002 — Company/market context is not owned by Rubric Compiler

**Status:** Accepted

## Context

Rubric Compiler scores resume↔job fit. It needs company/domain/market context to calibrate
scoring, but it should not *own* that intelligence — the same context is consumed by Resume ATS
Intelligence (report), Intelligent Job Board (job pages), and PathMerit (prep/tailoring).

## Decision

Company Intelligence is a **separate service** behind this contract. Rubric Compiler consumes
it as a client and applies the returned `CalibrationHint[]` during scoring; it does not embed a
company-intelligence implementation. Until the service is wired (Steps 06–07), Rubric Compiler
uses a no-op context provider that returns explicit "unavailable" metadata.

## Consequences

- Company intelligence evolves independently of scoring.
- Calibration hints are advisory and carry confidence + provenance, so a scorer can choose
  whether/how much to apply them.
- No duplication of company/domain logic across consumers.
