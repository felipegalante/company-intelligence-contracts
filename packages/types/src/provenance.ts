// Provenance + confidence + result metadata. Every non-trivial Company Intelligence
// result must carry sources[], retrievedAt, confidence, provider, and warnings so
// consumers can tell where a signal came from and how much to trust it.

export type ConfidenceBand = "high" | "medium" | "low" | "unknown";

export interface ConfidenceScore {
  /** 0–1. */
  value: number;
  band: ConfidenceBand;
}

export type SourceKind = "official" | "third-party" | "derived" | "demo";

export interface SourceProvenance {
  id: string;
  kind: SourceKind;
  title?: string;
  url?: string;
  /** ISO-8601 timestamp the source was retrieved. */
  retrievedAt: string;
  confidence: ConfidenceScore;
}

export interface CompanyIntelligenceMetadata {
  /** Stable provider id, e.g. "company-intelligence" or "company-intelligence-mock". */
  provider: string;
  /** True when the result is degraded / low-confidence / unknown-fallback. */
  degraded: boolean;
  engineVersion: string;
  /** ISO-8601 timestamp the result was produced. */
  retrievedAt: string;
  /** Overall confidence in the result. */
  confidence: ConfidenceScore;
  /** The sources backing the result (demo fixtures use kind: "demo"). */
  sources: SourceProvenance[];
  warnings: string[];
  requestId?: string;
}

export interface CompanyIntelligenceError {
  code: string;
  message: string;
  retryable: boolean;
  details?: Record<string, unknown>;
}
