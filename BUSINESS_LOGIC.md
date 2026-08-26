# Business Logic

## Public design principle

This repository preserves the analytical pattern of a branch KPI management application while replacing business-specific labels, values, and rules with generalized portfolio-safe examples.

## Calculation sequence

1. Read employee-day input rows.
2. Calculate row-level sales segments and customer metrics.
3. Apply global filters (date, employee, segment).
4. Aggregate filtered rows.
5. Adjust monthly sales targets to the selected calendar period.
6. Calculate target achievement and management status.
7. Calculate employee basket and operational-rate measures.
8. Aggregate category target performance.
9. Render trend, KPI, employee, category, activity, and reminder views.

## Sales segments

The public application uses two generalized analytical segments:

- **Core Retail** — a standard branch-sales component.
- **Special Channel** — an alternate sales component derived from three anonymous input channels.

These names intentionally avoid exposing proprietary company terminology.

## Target ownership

Sales targets are branch-level measures. Selecting a single employee changes the actual results shown but does not create or imply an employee share of the branch target.

Employee performance is assessed using employee-level operational metrics such as basket and product-rate performance.

## Status logic

Sales status uses management thresholds defined in configuration:

- SAFE ≥ 85%
- WATCH 80%–84.99%
- DANGER < 80%

Employee operational metrics use full target attainment:

- SAFE when actual ≥ target
- DANGER when actual < target

## Filtering

Date, employee, and sales-segment filters recalculate the analytical view. Filters affect KPI cards, the daily trend, and employee calculations.

Category targets and operational schedules remain reference datasets and are not employee-level facts.

## Data completeness

The sample data covers a limited fictional period. The project does not claim to predict a real month-end outcome. It demonstrates calculations and dashboard behavior only.
