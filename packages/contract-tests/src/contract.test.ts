// Runs the reusable contract suite against (1) the fixture-backed mock provider and
// (2) the mock server reached through the HTTP client with an in-process fetch shim —
// the same suite the private Company Intelligence service must also pass.

import { createCompanyIntelligenceClient } from "@company-intelligence/client";
import { createMockCompanyIntelligenceProvider, createMockHandler } from "@company-intelligence/mock-server";

import { runCompanyIntelligenceContract } from "./contract";

// (1) Fixture-backed mock provider — direct, in-process.
runCompanyIntelligenceContract("mock provider", () => createMockCompanyIntelligenceProvider());

// (2) Mock server reached through the client (fetch shimmed to the handler).
const handler = createMockHandler();
const mockFetch = (async (input, init) => {
  const url = new URL(typeof input === "string" ? input : input.toString());
  const method = init?.method ?? "GET";
  const body = init?.body ? JSON.parse(String(init.body)) : undefined;
  const result = await handler.handle(method, url.pathname, body);
  return new Response(JSON.stringify(result.json), {
    status: result.status,
    headers: { "content-type": "application/json" },
  });
}) as typeof fetch;

runCompanyIntelligenceContract("mock-server via client", () =>
  createCompanyIntelligenceClient({ baseUrl: "http://mock.local", fetch: mockFetch }),
);
