// A fixture-backed CompanyIntelligenceProvider. Used directly by contract tests and
// behind the mock HTTP server. Returns demo fixtures; unknown inputs degrade
// explicitly rather than inventing claims.

import {
  buildDemoMetadata,
  demoConfidence,
  FIXTURE_ENGINE_VERSION,
  lookupCompany,
  lookupDomain,
  resolveFromCompany,
  unknownCompanyResolve,
  unknownDomain,
} from "@company-intelligence/fixtures";
import { type CompanyIntelligenceProvider } from "@company-intelligence/provider";
import {
  type ApplicationContextRequest,
  type ApplicationContextResult,
  type CompanyIntelRequest,
  type CompanyIntelResult,
} from "@company-intelligence/types";

const MOCK_PROVIDER_ID = "company-intelligence-mock";

function unknownCompanyIntel(req: CompanyIntelRequest): CompanyIntelResult {
  const resolved = unknownCompanyResolve(req.company);
  return {
    identity: resolved.identity,
    stage: "unknown",
    archetype: "unknown",
    operatingPace: "unknown",
    businessModel: "unknown",
    regulatedIndustry: false,
    technicalProductDepth: "unknown",
    signals: [],
    calibrationHints: [],
    metadata: resolved.metadata,
  };
}

export function createMockCompanyIntelligenceProvider(): CompanyIntelligenceProvider {
  return {
    resolveCompany(input) {
      const found = lookupCompany(input);
      return Promise.resolve(found ? resolveFromCompany(found) : unknownCompanyResolve(input));
    },

    companyIntel(input) {
      const found = lookupCompany(input.company);
      return Promise.resolve(found ?? unknownCompanyIntel(input));
    },

    domainIntel(input) {
      return Promise.resolve(lookupDomain(input.domain, input.country) ?? unknownDomain(input.domain, input.country));
    },

    applicationContext(input: ApplicationContextRequest): Promise<ApplicationContextResult> {
      const company = input.company ? lookupCompany(input.company) : null;
      const domain = input.domain ? lookupDomain(input.domain, input.country) : null;
      const degraded = !company && !domain;
      const sources = [
        ...(company?.metadata.sources ?? []),
        ...(domain?.metadata.sources ?? []),
      ];
      return Promise.resolve({
        company: company ?? null,
        domain: domain ?? null,
        preparationInsights: degraded
          ? []
          : ["Prepare for the company's operating pace and domain expectations (demo)."],
        resumeTailoringAngles: degraded
          ? []
          : ["Emphasize experience relevant to the company's archetype and domain (demo)."],
        calibrationHints: [
          ...(company?.calibrationHints ?? []),
          ...(domain?.calibrationHints ?? []),
        ],
        metadata: buildDemoMetadata(
          degraded ? demoConfidence(0.1, "unknown") : demoConfidence(0.7, "medium"),
          sources,
          degraded,
          degraded ? ["No company or domain context available in demo fixtures."] : [],
        ),
      });
    },

    health() {
      return Promise.resolve({ status: "ok" as const, provider: MOCK_PROVIDER_ID, engineVersion: FIXTURE_ENGINE_VERSION });
    },

    describe() {
      return {
        id: MOCK_PROVIDER_ID,
        engineVersion: FIXTURE_ENGINE_VERSION,
        capabilities: {
          resolveCompany: true,
          companyIntel: true,
          domainIntel: true,
          applicationContext: true,
        },
      };
    },
  };
}
