// Signals + scoring-calibration hints. Company Intelligence outputs interpreted
// signals (not just raw facts) plus optional hints that downstream scorers (Rubric
// Compiler) can apply.

import { type ConfidenceScore } from "./provenance";

export interface CompanySignal {
  /** Signal key, e.g. "operatingPace", "companyStage". */
  key: string;
  label: string;
  /** Interpreted value (often one of the enum values, as a string). */
  value: string;
  confidence: ConfidenceScore;
  rationale?: string;
}

export interface MarketSignal {
  /** Signal key, e.g. "regulatoryIntensity", "hiringBar". */
  key: string;
  label: string;
  value: string;
  confidence: ConfidenceScore;
  rationale?: string;
}

export interface CalibrationHint {
  /** The scoring dimension this hint nudges (e.g. "seniorityScope"). */
  dimension: string;
  /** Signed adjustment a consumer MAY apply during scoring. */
  adjustment: number;
  rationale: string;
  confidence: ConfidenceScore;
}
