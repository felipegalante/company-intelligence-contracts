# Example — Resume ATS Intelligence integration

Resume ATS Intelligence surfaces company/domain context in the generated report. In
local/demo mode it can use `@company-intelligence/fixtures` or the mock server; in production
it calls the private service via the client.

```ts
import { createCompanyIntelligenceClient } from "@company-intelligence/client";

const companyIntel = createCompanyIntelligenceClient({ baseUrl: process.env.COMPANY_INTELLIGENCE_URL! });

const context = await companyIntel.applicationContext({
  company: { name: companyName, country },
  domain: inferredDomain,
  country,
  roleTitle,
});

// Render context.preparationInsights + context.resumeTailoringAngles in the report,
// and show context.metadata.confidence / sources so users see provenance.
```

Resume ATS Intelligence remains no-account / no-persistence; it does not store the company
context beyond the generated report artifact.
