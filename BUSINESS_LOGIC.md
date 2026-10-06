# Business Logic

## Design principle

This repository implements a generalized branch-performance analytical pattern using synthetic data and public-safe terminology.

## Calculation sequence

1. Read employee-day input rows.
2. Calculate row-level Core Retail, Special Channel and customer components.
3. Apply Date and Employee filters.
4. Resolve the active Sales Segment for sales/customer measures.
5. Aggregate numerators and denominators.
6. Adjust the relevant branch sales target to the selected calendar period.
7. Classify sales achievement using config-driven SAFE / WATCH / DANGER thresholds.
8. Calculate employee Sales, Customers and Average Basket in the active segment.
9. Preserve Core Basket and Operational Product Rate as Core Retail metrics.
10. Aggregate category target performance.
11. Render trend, KPI, employee, category, activity and reminder views.

## Sales segments

- **Core Retail** — standard branch-sales component.
- **Special Channel** — alternate sales component derived from anonymous channel inputs.
- **All Sales** — total of both components.

The generalized names avoid exposing proprietary business terminology.

## Target ownership

Sales targets are branch-level measures. Selecting a single employee changes actual results but does not create or imply an allocated employee share of the branch target.

Employee operational performance is assessed through employee-level metrics such as Core Basket and Operational Product Rate.

## Status governance

The implementation reads status rules from `data/sample/config.json`.

Sales classification currently resolves to:

- SAFE ≥ 85%
- WATCH 80%–84.99%
- DANGER < 80%

Point-target metrics are SAFE only when the configured target-attainment factor is met.

## Filtering

Date, Employee and Sales Segment filters recalculate:

- Overview KPIs;
- daily sales trend;
- employee Sales;
- employee Customers;
- employee Average Basket.

Core Basket and Operational Product Rate intentionally remain Core Retail measures.

Category targets and operational schedules are separate reference datasets and are not employee-level facts.

## Data completeness

The sample covers a limited synthetic period. The project does not claim forecasting, causal inference or real month-end prediction.
