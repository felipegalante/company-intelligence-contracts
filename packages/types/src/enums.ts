// Interpretation-friendly company/market signal enums. "unknown" is always valid —
// the API never invents a value it cannot support with provenance.

export const COMPANY_STAGES = [
  "pre-seed",
  "seed",
  "series-a",
  "series-b",
  "series-c-plus",
  "growth",
  "public",
  "bootstrapped",
  "unknown",
] as const;
export type CompanyStage = (typeof COMPANY_STAGES)[number];

export const COMPANY_ARCHETYPES = [
  "startup",
  "scaleup",
  "big-tech",
  "enterprise",
  "agency",
  "non-profit",
  "government",
  "unknown",
] as const;
export type CompanyArchetype = (typeof COMPANY_ARCHETYPES)[number];

export const OPERATING_PACES = ["fast", "moderate", "deliberate", "unknown"] as const;
export type OperatingPace = (typeof OPERATING_PACES)[number];

export const BUSINESS_MODELS = [
  "b2b-saas",
  "b2c",
  "marketplace",
  "fintech",
  "ecommerce",
  "services",
  "hardware",
  "deep-tech",
  "other",
  "unknown",
] as const;
export type BusinessModel = (typeof BUSINESS_MODELS)[number];

export const TECHNICAL_PRODUCT_DEPTHS = ["low", "medium", "high", "unknown"] as const;
export type TechnicalProductDepth = (typeof TECHNICAL_PRODUCT_DEPTHS)[number];
