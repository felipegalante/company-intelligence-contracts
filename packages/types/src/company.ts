// Company identity + company intelligence DTOs.

import {
  type BusinessModel,
  type CompanyArchetype,
  type CompanyStage,
  type OperatingPace,
  type TechnicalProductDepth,
} from "./enums";
import { type CompanyIntelligenceMetadata, type ConfidenceScore } from "./provenance";
import { type CalibrationHint, type CompanySignal } from "./signals";

export type CompanyAliasKind = "legal" | "brand" | "ticker" | "domain" | "former" | "other";

export interface CompanyAlias {
  name: string;
  kind: CompanyAliasKind;
}

export interface CompanyResolveInput {
  name?: string;
  /** Primary web domain, e.g. "stripe.com". */
  domain?: string;
  /** ISO alpha-2 country hint. */
  country?: string;
  requestId?: string;
}

export interface CompanyIdentity {
  /** Canonical company id (stable once resolved). */
  id: string;
  canonicalName: string;
  aliases: CompanyAlias[];
  domain?: string | null;
  /** ISO alpha-2. */
  country?: string | null;
  /** False when the company could not be confidently resolved. */
  resolved: boolean;
  confidence: ConfidenceScore;
}

export interface CompanyResolveResult {
  identity: CompanyIdentity;
  metadata: CompanyIntelligenceMetadata;
}

export interface CompanyIntelRequest {
  company: CompanyResolveInput;
  requestId?: string;
}

export interface CompanyIntelResult {
  identity: CompanyIdentity;
  stage: CompanyStage;
  archetype: CompanyArchetype;
  operatingPace: OperatingPace;
  businessModel: BusinessModel;
  regulatedIndustry: boolean;
  technicalProductDepth: TechnicalProductDepth;
  signals: CompanySignal[];
  /** Optional scoring-calibration hints for Rubric Compiler. */
  calibrationHints: CalibrationHint[];
  metadata: CompanyIntelligenceMetadata;
}
