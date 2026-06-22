# Market (domain) context

Domain/market context is about an **industry/market**, independent of any specific company. It
answers questions like "how regulated is fintech in Canada?" or "what does the healthtech US
market reward?" — useful even when the specific employer is unknown.

## Request / result

```
POST /v1/domains/intel
{ "domain": "fintech", "country": "CA" }
→ DomainIntelResult { domain, country, regulatedIndustry, signals[], calibrationHints[], metadata }
```

## Market signals

`MarketSignal`s are interpretation-friendly (not raw facts):

- `regulatoryIntensity` — how regulated the market is.
- `compliancePremium` / `domainExpertise` — what the market tends to reward.
- …extensible; each signal carries its own confidence + rationale.

## Company vs market

- Use **company intel** when you have a specific employer (`/v1/companies/intel`).
- Use **market intel** when you only know the industry/market (`/v1/domains/intel`).
- Use **application context** (`/v1/context/application`) to combine both into job-seeker prep
  insights and resume-tailoring angles.

## Unknown markets

A market with no fixture/data returns an empty, `degraded: true`, low-confidence result with a
warning — never invented signals.
