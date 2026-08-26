# Portfolio Notes

## What I built

I designed and implemented an end-to-end branch KPI dashboard as a public portfolio project. I translated operational reporting requirements into KPI definitions, a lightweight analytical data model, reusable calculations, interactive filters, management-status rules, visual summaries, and documentation.

I also converted the original working concept into a public-safe version by replacing private business terminology and all operational records with realistic synthetic examples.

## Analytical skills demonstrated

- Defining KPIs from business questions.
- Separating branch-level targets from employee-level performance measures.
- Calculating target achievement and exception status.
- Decomposing sales through customer count and Average Basket Value.
- Aggregating daily data across employee and segment dimensions.
- Comparing category actuals with category targets.
- Building trend analysis and filter-aware metrics.
- Designing denominator-safe calculations.
- Translating dashboard logic into SQL and Power BI modeling concepts.
- Documenting assumptions so a stakeholder can audit the analysis.

## Business problems solved

The project demonstrates how a branch manager or business analyst can centralize several operational questions:

- Are sales tracking against plan?
- Is performance driven by customer traffic or customer value?
- Which employee metrics need attention?
- Which categories are behind target?
- Which operational activities and reminders should be reviewed next?
- How do results change when the user changes the analysis period or segment?

## Technologies used

- HTML5
- CSS3
- JavaScript
- CSV
- JSON
- SVG
- SQL (reference implementation)
- Power BI modeling/DAX concepts (documented mapping)
- Git/GitHub-ready documentation

## Interview discussion points

- Why branch sales targets should not automatically be divided across employees.
- Why rate KPIs can require a different status rule than sales forecast KPIs.
- How customer count and basket value help diagnose the drivers behind sales.
- Why ratios should be calculated from aggregated numerators and denominators instead of averaging row-level percentages.
- How I generalized sensitive business rules before publishing a portfolio project.
- How the browser implementation could be migrated to Power BI, SQL, or an enterprise data warehouse.
- How I would extend the model with working-day weighting, seasonality, historical comparisons, and automated data-quality tests.
