# Example — PathMerit integration

PathMerit (built last) uses Company Intelligence for company prep, resume tailoring, and
application strategy, and persists the *results* in its own database (this repo owns no
persistence).

```ts
import { createCompanyIntelligenceClient } from "@company-intelligence/client";

const companyIntel = createCompanyIntelligenceClient({
  baseUrl: process.env.COMPANY_INTELLIGENCE_URL!,
  apiKey: process.env.COMPANY_INTELLIGENCE_API_KEY,
});

const context = await companyIntel.applicationContext({
  company: { name, domain, country },
  roleTitle,
});

// Persist context (with context.metadata: provider, confidence, sources, retrievedAt) in
// PathMerit's company-prep history. Re-fetch when retrievedAt is stale.
```

PathMerit imports `@company-intelligence/{client,types}` (and may use fixtures/mock for local
dev). Calibration hints flow through Rubric Compiler, not directly into PathMerit scoring.
