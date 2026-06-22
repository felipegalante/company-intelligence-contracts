// Domain/market intelligence DTOs.

import { type CompanyIntelligenceMetadata } from "./provenance";
import { type CalibrationHint, type MarketSignal } from "./signals";

export interface DomainIntelRequest {
  /** Industry/domain, e.g. "fintech", "healthtech". */
  domain: string;
  /** ISO alpha-2 country/market context. */
  country?: string;
  requestId?: string;
}

export interface DomainIntelResult {
  domain: string;
  country?: string | null;
  regulatedIndustry: boolean;
  signals: MarketSignal[];
  calibrationHints: CalibrationHint[];
  metadata: CompanyIntelligenceMetadata;
}
