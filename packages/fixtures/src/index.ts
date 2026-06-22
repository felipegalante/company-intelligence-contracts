// @company-intelligence/fixtures — public demo fixtures. All provenance is marked
// `kind: "demo"` and the data is illustrative (clearly-demo company names), never a
// real-world claim. Statically typed against @company-intelligence/types.

import {
  type ApplicationContextResult,
  type CompanyIntelligenceMetadata,
  type CompanyIntelResult,
  type CompanyResolveInput,
  type CompanyResolveResult,
  type ConfidenceBand,
  type ConfidenceScore,
  type DomainIntelResult,
  type SourceProvenance,
} from "@company-intelligence/types";

export const FIXTURE_ENGINE_VERSION = "company-intelligence-mock@0.1.0";
export const FIXTURE_RETRIEVED_AT = "2026-01-01T00:00:00.000Z";

function conf(value: number, band: ConfidenceBand): ConfidenceScore {
  return { value, band };
}

function demoSource(id: string, title: string): SourceProvenance {
  return {
    id,
    kind: "demo",
    title,
    retrievedAt: FIXTURE_RETRIEVED_AT,
    confidence: conf(0.9, "high"),
  };
}

function meta(
  confidence: ConfidenceScore,
  sources: SourceProvenance[],
  degraded = false,
  warnings: string[] = [],
): CompanyIntelligenceMetadata {
  return {
    provider: "company-intelligence-mock",
    degraded,
    engineVersion: FIXTURE_ENGINE_VERSION,
    retrievedAt: FIXTURE_RETRIEVED_AT,
    confidence,
    sources,
    warnings,
  };
}

/** Public helper: build a demo confidence score. */
export function demoConfidence(value: number, band: ConfidenceBand): ConfidenceScore {
  return conf(value, band);
}

/** Public helper: build demo result metadata. */
export function buildDemoMetadata(
  confidence: ConfidenceScore,
  sources: SourceProvenance[] = [],
  degraded = false,
  warnings: string[] = [],
): CompanyIntelligenceMetadata {
  return meta(confidence, sources, degraded, warnings);
}

// ---- company fixtures ------------------------------------------------------

export const fintechCanadaCompany: CompanyIntelResult = {
  identity: {
    id: "demo-maple-pay",
    canonicalName: "Maple Pay (demo)",
    aliases: [{ name: "MaplePay", kind: "brand" }],
    domain: "maplepay.example.ca",
    country: "CA",
    resolved: true,
    confidence: conf(0.86, "high"),
  },
  stage: "series-b",
  archetype: "scaleup",
  operatingPace: "fast",
  businessModel: "fintech",
  regulatedIndustry: true,
  technicalProductDepth: "high",
  signals: [
    { key: "operatingPace", label: "Operating pace", value: "fast", confidence: conf(0.8, "high"), rationale: "Frequent product releases (demo)." },
    { key: "regulatoryIntensity", label: "Regulatory intensity", value: "high", confidence: conf(0.85, "high"), rationale: "Canadian fintech is regulated (demo)." },
  ],
  calibrationHints: [
    { dimension: "businessOrientation", adjustment: 0.05, rationale: "Fintech values business/risk awareness (demo).", confidence: conf(0.6, "medium") },
    { dimension: "stakeholderFit", adjustment: 0.03, rationale: "Regulated env rewards compliance-aware communication (demo).", confidence: conf(0.55, "medium") },
  ],
  metadata: meta(conf(0.84, "high"), [demoSource("demo:maple-pay", "Maple Pay demo profile")]),
};

export const bigTechCompany: CompanyIntelResult = {
  identity: {
    id: "demo-hyperscale",
    canonicalName: "Hyperscale (demo)",
    aliases: [{ name: "HYP", kind: "ticker" }],
    domain: "hyperscale.example.com",
    country: "US",
    resolved: true,
    confidence: conf(0.92, "high"),
  },
  stage: "public",
  archetype: "big-tech",
  operatingPace: "moderate",
  businessModel: "b2b-saas",
  regulatedIndustry: false,
  technicalProductDepth: "high",
  signals: [
    { key: "hiringBar", label: "Hiring bar", value: "high", confidence: conf(0.8, "high"), rationale: "Large-scale systems focus (demo)." },
    { key: "scope", label: "Role scope", value: "broad", confidence: conf(0.7, "medium"), rationale: "Big-tech scope tends to be broad (demo)." },
  ],
  calibrationHints: [
    { dimension: "architecture", adjustment: 0.06, rationale: "Big-tech weights system design (demo).", confidence: conf(0.65, "medium") },
    { dimension: "seniorityScope", adjustment: 0.04, rationale: "Leveling is scope-driven (demo).", confidence: conf(0.6, "medium") },
  ],
  metadata: meta(conf(0.9, "high"), [demoSource("demo:hyperscale", "Hyperscale demo profile")]),
};

export const startupCompany: CompanyIntelResult = {
  identity: {
    id: "demo-velocity-labs",
    canonicalName: "Velocity Labs (demo)",
    aliases: [],
    domain: "velocitylabs.example.io",
    country: "US",
    resolved: true,
    confidence: conf(0.7, "medium"),
  },
  stage: "seed",
  archetype: "startup",
  operatingPace: "fast",
  businessModel: "b2b-saas",
  regulatedIndustry: false,
  technicalProductDepth: "medium",
  signals: [
    { key: "operatingPace", label: "Operating pace", value: "fast", confidence: conf(0.75, "medium"), rationale: "Early-stage startups move fast (demo)." },
    { key: "breadth", label: "Generalist demand", value: "high", confidence: conf(0.7, "medium"), rationale: "Small teams favor generalists (demo)." },
  ],
  calibrationHints: [
    { dimension: "multiplierCommunication", adjustment: 0.05, rationale: "Startups reward ownership + breadth (demo).", confidence: conf(0.55, "medium") },
  ],
  metadata: meta(conf(0.68, "medium"), [demoSource("demo:velocity-labs", "Velocity Labs demo profile")]),
};

const COMPANY_INDEX: Array<{ keys: string[]; result: CompanyIntelResult }> = [
  { keys: ["maple pay", "maplepay", "maplepay.example.ca"], result: fintechCanadaCompany },
  { keys: ["hyperscale", "hyp", "hyperscale.example.com"], result: bigTechCompany },
  { keys: ["velocity labs", "velocitylabs", "velocitylabs.example.io"], result: startupCompany },
];

function normalizeKey(value?: string): string {
  return (value ?? "").trim().toLowerCase();
}

/** Look up a demo company by name or domain; null when unknown. */
export function lookupCompany(input: CompanyResolveInput): CompanyIntelResult | null {
  const name = normalizeKey(input.name);
  const domain = normalizeKey(input.domain);
  for (const entry of COMPANY_INDEX) {
    if (entry.keys.includes(name) || (domain && entry.keys.includes(domain))) return entry.result;
  }
  return null;
}

/** Unknown-company fallback — valid, low-confidence, never invents claims. */
export function unknownCompanyResolve(input: CompanyResolveInput): CompanyResolveResult {
  return {
    identity: {
      id: "unknown",
      canonicalName: input.name ?? input.domain ?? "unknown",
      aliases: [],
      domain: input.domain ?? null,
      country: input.country ?? null,
      resolved: false,
      confidence: conf(0.1, "unknown"),
    },
    metadata: meta(conf(0.1, "unknown"), [], true, ["Company could not be resolved from demo fixtures."]),
  };
}

export function resolveFromCompany(result: CompanyIntelResult): CompanyResolveResult {
  return { identity: result.identity, metadata: result.metadata };
}

// ---- domain fixtures -------------------------------------------------------

export const fintechCanadaDomain: DomainIntelResult = {
  domain: "fintech",
  country: "CA",
  regulatedIndustry: true,
  signals: [
    { key: "regulatoryIntensity", label: "Regulatory intensity", value: "high", confidence: conf(0.85, "high"), rationale: "Canadian fintech is regulated (demo)." },
    { key: "compliancePremium", label: "Compliance premium", value: "high", confidence: conf(0.7, "medium"), rationale: "Compliance-aware candidates valued (demo)." },
  ],
  calibrationHints: [
    { dimension: "businessOrientation", adjustment: 0.05, rationale: "Risk/compliance awareness matters (demo).", confidence: conf(0.6, "medium") },
  ],
  metadata: meta(conf(0.8, "high"), [demoSource("demo:fintech-ca", "Fintech CA demo context")]),
};

export const healthtechUsDomain: DomainIntelResult = {
  domain: "healthtech",
  country: "US",
  regulatedIndustry: true,
  signals: [
    { key: "regulatoryIntensity", label: "Regulatory intensity", value: "high", confidence: conf(0.82, "high"), rationale: "HIPAA / health data is regulated (demo)." },
    { key: "domainExpertise", label: "Domain expertise premium", value: "high", confidence: conf(0.7, "medium"), rationale: "Health domain knowledge valued (demo)." },
  ],
  calibrationHints: [
    { dimension: "stakeholderFit", adjustment: 0.04, rationale: "Clinical/compliance stakeholders (demo).", confidence: conf(0.55, "medium") },
  ],
  metadata: meta(conf(0.78, "high"), [demoSource("demo:healthtech-us", "Healthtech US demo context")]),
};

const DOMAIN_INDEX: Array<{ domain: string; country: string; result: DomainIntelResult }> = [
  { domain: "fintech", country: "CA", result: fintechCanadaDomain },
  { domain: "healthtech", country: "US", result: healthtechUsDomain },
];

/** Look up a demo domain/market context; null when unknown. */
export function lookupDomain(domain: string, country?: string): DomainIntelResult | null {
  const d = normalizeKey(domain);
  const c = normalizeKey(country);
  const exact = DOMAIN_INDEX.find((e) => e.domain === d && (!c || e.country.toLowerCase() === c));
  if (exact) return exact.result;
  const byDomain = DOMAIN_INDEX.find((e) => e.domain === d);
  return byDomain ? byDomain.result : null;
}

export function unknownDomain(domain: string, country?: string): DomainIntelResult {
  return {
    domain,
    country: country ?? null,
    regulatedIndustry: false,
    signals: [],
    calibrationHints: [],
    metadata: meta(conf(0.1, "unknown"), [], true, ["Domain context not available in demo fixtures."]),
  };
}

// ---- application context fixture ------------------------------------------

export const fintechCanadaApplicationContext: ApplicationContextResult = {
  company: fintechCanadaCompany,
  domain: fintechCanadaDomain,
  preparationInsights: [
    "Be ready to discuss handling regulated financial data (demo).",
    "Expect questions on reliability and auditability (demo).",
  ],
  resumeTailoringAngles: [
    "Emphasize compliance-aware engineering and data security (demo).",
    "Highlight high-availability / payments-adjacent experience (demo).",
  ],
  calibrationHints: [...fintechCanadaCompany.calibrationHints, ...fintechCanadaDomain.calibrationHints],
  metadata: meta(conf(0.8, "high"), [
    demoSource("demo:maple-pay", "Maple Pay demo profile"),
    demoSource("demo:fintech-ca", "Fintech CA demo context"),
  ]),
};
