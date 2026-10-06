# KPI Definitions

This document defines the KPI logic implemented by **Branch Performance KPI Dashboard**.

| KPI | Definition | Formula | Grain / Scope |
|---|---|---|---|
| Sales Target | Planned sales for the selected period | Monthly Sales Target × Selected Calendar Days / Full Sample Days | Branch / selected segment / period |
| Actual Sales | Sales under the active Date, Employee and Sales Segment filters | SUM(Selected Segment Sales) | Selected view |
| Achievement % | Attainment of the relevant selected-segment target | Actual Sales / Period Target | Selected view |
| Customer Count | Customers associated with the selected sales segment | SUM(Selected Segment Customers) | Selected view |
| Average Basket Value | Average selected-segment sales per selected-segment customer | Actual Sales / Customer Count | Selected view |
| Core Retail Sales | Standard-retail component | Total Sales − Channel A − Channel B − Channel C | Row then aggregate |
| Special Channel Sales | Alternate-channel component | Total Sales − Core Retail Sales | Row then aggregate |
| Core Retail Customers | Customers associated with Core Retail | Total Customers − Special Customers | Row then aggregate |
| Core Retail Basket | Average Core Retail sales per Core Retail customer | Core Retail Sales / Core Retail Customers | Core metric |
| Operational Product Rate | Operational-product sales as share of Core Retail | Operational Product Sales / Core Retail Sales | Core metric |
| Category Achievement | Category performance versus category target | Category Sales / Category Target | Category |
| Active Days | Days with positive selected-segment sales | DISTINCTCOUNT(Date) | Selected view |

## Sales Segment behavior

The active Sales Segment filter controls:

- Actual Sales;
- Customer Count;
- Average Basket;
- period target selection;
- daily trend;
- employee Sales / Customers / Average Basket.

**Core Retail Basket** and **Operational Product Rate** remain Core Retail measures even when Special Channel is selected. Their business meaning is not silently redefined by the filter.

## Status classifications

Thresholds are read from `data/sample/config.json`.

### Sales achievement status

- **SAFE:** Achievement ≥ configured `statusRules.sales.safe` (currently 85%)
- **WATCH:** Achievement ≥ configured `statusRules.sales.watch` and below SAFE (currently 80%–84.99%)
- **DANGER:** Achievement below WATCH

### Point-target status

Employee Core Basket and Operational Product Rate use the configured point-target attainment factor:

- **SAFE:** actual ≥ target × `statusRules.operationalRate.safe`
- **DANGER:** otherwise

The current configuration requires 100% target attainment.

## Division-by-zero rule

If a denominator is zero, the result is treated as zero. This prevents Infinity/NaN in the analytical UI.

## Period target allocation

The synthetic implementation uses:

`Period Target = Monthly Target × Selected Calendar Days / Full Sample Days`

This is a transparent demo assumption. A production implementation could use working-day weights, day-of-week seasonality or branch operating calendars.
