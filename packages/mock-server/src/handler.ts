// Framework-agnostic mock Company Intelligence API, backed by the fixture provider.

import { type CompanyIntelligenceProvider } from "@company-intelligence/provider";
import {
  type ApplicationContextRequest,
  type CompanyIntelRequest,
  type CompanyResolveInput,
  type DomainIntelRequest,
} from "@company-intelligence/types";

import { createMockCompanyIntelligenceProvider } from "./provider";

export interface MockResponse {
  status: number;
  json: unknown;
}

export interface MockHandlerOptions {
  provider?: CompanyIntelligenceProvider;
}

export interface MockHandler {
  handle(method: string, path: string, body?: unknown): Promise<MockResponse>;
}

export function createMockHandler(options: MockHandlerOptions = {}): MockHandler {
  const provider = options.provider ?? createMockCompanyIntelligenceProvider();

  async function handle(method: string, path: string, body?: unknown): Promise<MockResponse> {
    const route = `${method.toUpperCase()} ${path.split("?")[0]}`;
    try {
      switch (route) {
        case "GET /v1/health":
          return { status: 200, json: await provider.health() };
        case "POST /v1/companies/resolve":
          return { status: 200, json: await provider.resolveCompany(body as CompanyResolveInput) };
        case "POST /v1/companies/intel":
          return { status: 200, json: await provider.companyIntel(body as CompanyIntelRequest) };
        case "POST /v1/domains/intel":
          return { status: 200, json: await provider.domainIntel(body as DomainIntelRequest) };
        case "POST /v1/context/application":
          return {
            status: 200,
            json: await provider.applicationContext(body as ApplicationContextRequest),
          };
        default:
          return { status: 404, json: { error: "not_found", route } };
      }
    } catch (error) {
      return { status: 400, json: { error: "bad_request", message: (error as Error).message } };
    }
  }

  return { handle };
}
