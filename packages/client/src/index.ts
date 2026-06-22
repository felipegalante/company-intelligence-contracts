// @company-intelligence/client — HTTP client for the Company Intelligence v1 contract.
// Implements CompanyIntelligenceProvider, so it is interchangeable with the mock.

import { type CompanyIntelligenceProvider } from "@company-intelligence/provider";
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

import { HttpTransport, type HttpTransportOptions } from "./transport";

export {
  CompanyIntelligenceHttpError,
  HttpTransport,
  type HttpTransportOptions,
} from "./transport";

export interface CompanyIntelligenceClientOptions extends HttpTransportOptions {
  providerId?: string;
}

export function createCompanyIntelligenceClient(
  options: CompanyIntelligenceClientOptions,
): CompanyIntelligenceProvider {
  const transport = new HttpTransport(options);
  const providerId = options.providerId ?? "company-intelligence-client";

  return {
    resolveCompany(input: CompanyResolveInput): Promise<CompanyResolveResult> {
      return transport.request("POST", "/v1/companies/resolve", input, input.requestId);
    },
    companyIntel(input: CompanyIntelRequest): Promise<CompanyIntelResult> {
      return transport.request("POST", "/v1/companies/intel", input, input.requestId);
    },
    domainIntel(input: DomainIntelRequest): Promise<DomainIntelResult> {
      return transport.request("POST", "/v1/domains/intel", input, input.requestId);
    },
    applicationContext(input: ApplicationContextRequest): Promise<ApplicationContextResult> {
      return transport.request("POST", "/v1/context/application", input, input.requestId);
    },
    health(): Promise<CompanyIntelligenceHealth> {
      return transport.request("GET", "/v1/health");
    },
    describe(): CompanyIntelligenceProviderDescriptor {
      return {
        id: providerId,
        engineVersion: "remote",
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
