# Example — Rubric Compiler integration

Rubric Compiler calls Company Intelligence for calibration hints and applies them during
scoring (advisory, scaled by confidence). See
[ADR-0002](../../docs/adr/0002-company-market-context-not-owned-by-rubric-compiler.md).

```ts
import { createCompanyIntelligenceClient } from "@company-intelligence/client";

const companyIntel = createCompanyIntelligenceClient({
  baseUrl: process.env.COMPANY_INTELLIGENCE_URL!,
  apiKey: process.env.COMPANY_INTELLIGENCE_API_KEY,
  timeoutMs: 1500,
});

const { calibrationHints, metadata } = await companyIntel.companyIntel({
  company: { name: "Maple Pay", country: "CA" },
});

// Apply hints proportionally to confidence; never fabricate evidence.
for (const hint of calibrationHints) {
  applyDimensionAdjustment(hint.dimension, hint.adjustment * hint.confidence.value);
}
// Record metadata.provider / metadata.degraded on the evaluation result.
```

When Company Intelligence is unavailable, Rubric Compiler degrades to a no-op context provider
(returns `companyIntelProvider: "none"`, `degraded: true`, a warning) and scores without hints.
