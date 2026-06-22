// Health + provider self-description.

export interface CompanyIntelligenceHealth {
  status: "ok" | "degraded" | "unavailable";
  provider: string;
  engineVersion: string;
}

export interface CompanyIntelligenceProviderDescriptor {
  id: string;
  engineVersion: string;
  capabilities: {
    resolveCompany: boolean;
    companyIntel: boolean;
    domainIntel: boolean;
    applicationContext: boolean;
  };
}
