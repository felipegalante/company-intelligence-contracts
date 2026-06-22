# Example — Intelligent Job Board integration

Intelligent Job Board can show company/domain insights on job pages. In local/public mode it
uses `@company-intelligence/fixtures` or the mock server, so the board runs with no private
service.

```ts
import { createCompanyIntelligenceClient } from "@company-intelligence/client";
import { createMockCompanyIntelligenceProvider } from "@company-intelligence/mock-server";

const companyIntel = process.env.COMPANY_INTELLIGENCE_URL
  ? createCompanyIntelligenceClient({ baseUrl: process.env.COMPANY_INTELLIGENCE_URL })
  : createMockCompanyIntelligenceProvider();

const intel = await companyIntel.companyIntel({ company: { name, domain } });
// Show intel.archetype / operatingPace / regulatedIndustry as badges, gated on
// intel.metadata.confidence; render "unknown" gracefully when degraded.
```
