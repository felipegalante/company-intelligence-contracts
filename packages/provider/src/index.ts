// @company-intelligence/provider — the stable provider abstraction every Company
// Intelligence implementation satisfies (the private service via the HTTP client, and
// the fixture-backed mock server). Carries no I/O of its own.

import {
  type ApplicationContextRequest,
  type ApplicationContextResult,
  type CompanyIntelligenceHealth,
  type CompanyIntelligenceProviderDescriptor,
  type CompanyIntelRequest,
  type CompanyIntelResult,
  type CompanyResolveInput,
  type CompanyResolveResult,
  type DomainIntelRequest,
  type DomainIntelResult,
} from "@company-intelligence/types";

export interface CompanyIntelligenceProvider {
  /** Resolve a company name/domain to a canonical identity (unknown is valid). */
  resolveCompany(input: CompanyResolveInput): Promise<CompanyResolveResult>;
  /** Company signals + calibration hints. */
  companyIntel(input: CompanyIntelRequest): Promise<CompanyIntelResult>;
  /** Domain/market context signals. */
  domainIntel(input: DomainIntelRequest): Promise<DomainIntelResult>;
  /** Combined application/preparation context (company + domain). */
  applicationContext(input: ApplicationContextRequest): Promise<ApplicationContextResult>;
  /** Liveness/health. */
  health(): Promise<CompanyIntelligenceHealth>;
  /** Synchronous self-description. */
  describe(): CompanyIntelligenceProviderDescriptor;
}
