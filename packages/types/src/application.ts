// Application-context DTOs: job-seeker preparation insights combining company +
// domain/market context. Used by PathMerit (prep, tailoring, strategy) and Resume
// ATS Intelligence (report context).

import { type CompanyIntelResult } from "./company";
import { type DomainIntelResult } from "./domain";
import { type CompanyIntelligenceMetadata } from "./provenance";
import { type CalibrationHint } from "./signals";

export interface ApplicationContextRequest {
  company?: { name?: string; domain?: string; country?: string };
  /** Industry/domain, when no specific company is given. */
  domain?: string;
  country?: string;
  /** Target role title, for prep insights. */
  roleTitle?: string;
  requestId?: string;
}

export interface ApplicationContextResult {
  company?: CompanyIntelResult | null;
  domain?: DomainIntelResult | null;
  /** Job-seeker preparation insights (interview prep, what to emphasize). */
  preparationInsights: string[];
  /** Angles for tailoring a resume to this company/domain. */
  resumeTailoringAngles: string[];
  calibrationHints: CalibrationHint[];
  metadata: CompanyIntelligenceMetadata;
}
