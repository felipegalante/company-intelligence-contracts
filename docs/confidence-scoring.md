# Confidence + scoring-calibration hints

## ConfidenceScore

Every signal and every result carries a `ConfidenceScore`:

```ts
interface ConfidenceScore { value: number; /* 0–1 */ band: "high" | "medium" | "low" | "unknown"; }
```

Consumers should treat `value` as the machine-readable strength and `band` as a coarse bucket
for UI/thresholding. Low/unknown confidence is normal — surface it, don't hide it.

## CalibrationHint

Company and domain results may include `CalibrationHint[]`:

```ts
interface CalibrationHint {
  dimension: string;   // the scoring dimension to nudge, e.g. "architecture"
  adjustment: number;  // signed nudge a scorer MAY apply
  rationale: string;
  confidence: ConfidenceScore;
}
```

## How a scorer should consume hints

Hints are **advisory**, not authoritative:

1. Match `dimension` to your scoring dimensions; ignore unknown dimensions.
2. Scale `adjustment` by `confidence.value` (and your own policy) — never apply a low-confidence
   hint at full strength.
3. Keep the base score explainable; record which hints were applied and why.
4. Never let a hint fabricate a signal the candidate didn't demonstrate — hints calibrate
   weighting, they don't add evidence.

Rubric Compiler is the primary consumer (see
[ADR-0002](./adr/0002-company-market-context-not-owned-by-rubric-compiler.md)).
