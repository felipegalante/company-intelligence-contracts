# Overview

Company Intelligence provides **company and domain/market context** to the PathMerit
ecosystem: who a company is (identity resolution), what kind of company it is (stage,
archetype, operating pace, business model, regulated industry, technical depth), what its
market looks like, and **scoring-calibration hints** that a scorer can apply.

This repository is the **public contract** for that capability — types, provider interface,
HTTP client, OpenAPI, demo fixtures, mock server, and contract tests. The private
implementation lives at `github.com/pathmerit/company-intelligence`.

## Consumers

| Consumer | Uses Company Intelligence for |
|---|---|
| Rubric Compiler | Calibration hints to adjust scoring |
| Resume ATS Intelligence | Company/domain context in the generated report |
| Intelligent Job Board | Company/domain insights on job pages |
| PathMerit | Company prep, resume tailoring, application strategy |

## Operations

| Operation | Endpoint |
|---|---|
| Health | `GET /v1/health` |
| Resolve company | `POST /v1/companies/resolve` |
| Company intel | `POST /v1/companies/intel` |
| Domain intel | `POST /v1/domains/intel` |
| Application context | `POST /v1/context/application` |

See [`architecture.md`](./architecture.md), [`source-provenance.md`](./source-provenance.md),
[`confidence-scoring.md`](./confidence-scoring.md), and [`market-context.md`](./market-context.md).
