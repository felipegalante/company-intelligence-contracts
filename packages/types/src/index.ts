// @company-intelligence/types — stable, provider-neutral DTOs for Company Intelligence.

export {
  BUSINESS_MODELS,
  COMPANY_ARCHETYPES,
  COMPANY_STAGES,
  OPERATING_PACES,
  TECHNICAL_PRODUCT_DEPTHS,
  type BusinessModel,
  type CompanyArchetype,
  type CompanyStage,
  type OperatingPace,
  type TechnicalProductDepth,
} from "./enums";

export type {
  CompanyIntelligenceError,
  CompanyIntelligenceMetadata,
  ConfidenceBand,
  ConfidenceScore,
  SourceKind,
  SourceProvenance,
} from "./provenance";

export type { CalibrationHint, CompanySignal, MarketSignal } from "./signals";

export type {
  CompanyAlias,
  CompanyAliasKind,
  CompanyIdentity,
  CompanyIntelRequest,
  CompanyIntelResult,
  CompanyResolveInput,
  CompanyResolveResult,
} from "./company";

export type { DomainIntelRequest, DomainIntelResult } from "./domain";

export type { ApplicationContextRequest, ApplicationContextResult } from "./application";

export type {
  CompanyIntelligenceHealth,
  CompanyIntelligenceProviderDescriptor,
} from "./health";
