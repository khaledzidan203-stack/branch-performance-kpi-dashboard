# KPI Definitions

This document defines the public, generalized KPI logic used by **Branch Performance KPI Dashboard**.

| KPI | Definition | Formula | Grain / Scope |
|---|---|---|---|
| Sales Target | Planned sales for the selected period | Monthly Sales Target × Selected Calendar Days / Full Sample Days | Branch / period |
| Actual Sales | Sales recorded in the selected filters | SUM(Sales) | Branch, employee, or segment |
| Achievement % | Attainment of the relevant sales target | Actual Sales / Period Target | Branch / period |
| Customer Count | Number of customer transactions | SUM(Customer Count) | Selected view |
| Average Basket Value | Average sales value per customer | Actual Sales / Customer Count | Selected view |
| Core Retail Sales | Generalized standard-retail component | Total Sales − Channel A − Channel B − Channel C | Row then aggregate |
| Special Channel Sales | Generalized alternate-channel component | Total Sales − Core Retail Sales | Row then aggregate |
| Core Retail Customers | Customers associated with core retail | Total Customers − Special Customers | Row then aggregate |
| Core Retail Basket | Average core-retail sales per core customer | Core Retail Sales / Core Retail Customers | Employee / selected view |
| Operational Product Rate | Operational-product sales as share of core retail | Operational Product Sales / Core Retail Sales | Employee / selected view |
| Category Achievement | Category performance vs category target | Category Sales / Category Target | Category |
| Active Days | Days containing sales activity | DISTINCTCOUNT(Date where Sales > 0) | Selected view |

## Status classifications

### Sales achievement status

- **SAFE:** Achievement ≥ 85%
- **WATCH:** Achievement ≥ 80% and < 85%
- **DANGER:** Achievement < 80%

These thresholds are demonstration settings stored in `data/sample/config.json`.

### Operational-rate status

Operational rate KPIs are treated as point-in-time performance targets rather than sales forecasts:

- **SAFE:** actual rate ≥ configured target
- **DANGER:** actual rate < configured target

A WATCH band is intentionally not applied to these rate metrics in the public demo.

## Division-by-zero rule

If the denominator of a basket/rate calculation is zero, the result is treated as zero. This prevents undefined or infinite values in the dashboard.

## Period target allocation

The sample project uses a calendar-day allocation:

`Period Target = Monthly Target × Selected Days / Full Sample Days`

This is a transparent demonstration assumption; production implementations may instead use working-day weights, day-of-week seasonality, or branch operating calendars.
