// @company-intelligence/contract-tests — a reusable vitest suite asserting any
// CompanyIntelligenceProvider satisfies the v1 contract: response shape + required
// provenance metadata, and that unknown inputs degrade rather than invent claims.
// Run it against the mock server (via the client) and the private service.

import { type CompanyIntelligenceProvider } from "@company-intelligence/provider";
import { type CompanyIntelligenceMetadata } from "@company-intelligence/types";
import { describe, expect, it } from "vitest";

export interface CompanyContractInputs {
  knownCompanyName: string;
  knownDomain: string;
  knownCountry: string;
}

export const defaultCompanyContractInputs: CompanyContractInputs = {
  knownCompanyName: "Maple Pay",
  knownDomain: "fintech",
  knownCountry: "CA",
};

function assertMetadata(metadata: CompanyIntelligenceMetadata): void {
  expect(typeof metadata.provider).toBe("string");
  expect(typeof metadata.degraded).toBe("boolean");
  expect(typeof metadata.engineVersion).toBe("string");
  expect(typeof metadata.retrievedAt).toBe("string");
  expect(metadata.confidence.value).toBeGreaterThanOrEqual(0);
  expect(metadata.confidence.value).toBeLessThanOrEqual(1);
  expect(["high", "medium", "low", "unknown"]).toContain(metadata.confidence.band);
  expect(Array.isArray(metadata.sources)).toBe(true);
  expect(Array.isArray(metadata.warnings)).toBe(true);
}

export function runCompanyIntelligenceContract(
  label: string,
  make: () => CompanyIntelligenceProvider | Promise<CompanyIntelligenceProvider>,
  inputs: CompanyContractInputs = defaultCompanyContractInputs,
): void {
  describe(`company-intelligence contract: ${label}`, () => {
    it("reports health", async () => {
      const provider = await make();
      const health = await provider.health();
      expect(["ok", "degraded"]).toContain(health.status);
      expect(typeof health.provider).toBe("string");
    });

    it("describes itself", async () => {
      const provider = await make();
      const descriptor = provider.describe();
      expect(descriptor.capabilities.companyIntel).toBe(true);
    });

    it("resolves a known company with provenance", async () => {
      const provider = await make();
      const result = await provider.resolveCompany({ name: inputs.knownCompanyName });
      expect(typeof result.identity.id).toBe("string");
      expect(typeof result.identity.resolved).toBe("boolean");
      assertMetadata(result.metadata);
    });

    it("degrades (not invents) for an unknown company", async () => {
      const provider = await make();
      const result = await provider.resolveCompany({ name: "Definitely Not A Real Company 12345" });
      expect(result.identity.resolved).toBe(false);
      expect(result.metadata.degraded).toBe(true);
      assertMetadata(result.metadata);
    });

    it("returns company intel signals + calibration hints", async () => {
      const provider = await make();
      const result = await provider.companyIntel({ company: { name: inputs.knownCompanyName } });
      expect(Array.isArray(result.signals)).toBe(true);
      expect(Array.isArray(result.calibrationHints)).toBe(true);
      expect(typeof result.regulatedIndustry).toBe("boolean");
      assertMetadata(result.metadata);
    });

    it("returns domain/market intel", async () => {
      const provider = await make();
      const result = await provider.domainIntel({
        domain: inputs.knownDomain,
        country: inputs.knownCountry,
      });
      expect(result.domain).toBe(inputs.knownDomain);
      expect(Array.isArray(result.signals)).toBe(true);
      assertMetadata(result.metadata);
    });

    it("returns application context", async () => {
      const provider = await make();
      const result = await provider.applicationContext({
        company: { name: inputs.knownCompanyName },
        domain: inputs.knownDomain,
        country: inputs.knownCountry,
        roleTitle: "Senior Backend Engineer",
      });
      expect(Array.isArray(result.preparationInsights)).toBe(true);
      expect(Array.isArray(result.resumeTailoringAngles)).toBe(true);
      expect(Array.isArray(result.calibrationHints)).toBe(true);
      assertMetadata(result.metadata);
    });
  });
}
