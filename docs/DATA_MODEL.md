# Data Model

## Logical model

```text
DimDate 1 ─── * FactDailySales * ─── 1 DimEmployee
                         |
                         | analytical configuration
                         v
                    BranchTargets

FactCategoryPerformance   OperationalActivities   Reminders
```

## FactDailySales grain

One row represents **one employee on one date**.

Key measures include total sales, anonymous channel components, operational-product sales, total customers, and special-channel customers.

## Dimensions

### DimDate

- Date
- Month
- Day of month
- Day name (can be derived)

### DimEmployee

- Employee ID
- Employee display name

The public sample contains fictional identities only.

## Supporting facts/configuration

### FactCategoryPerformance

Grain: one row per category for the demo period.

- Category
- Sales
- Target

### BranchTargets

Stored in `config.json` for the browser implementation.

- Sales target
- Core retail target
- Average basket target
- Operational-product-rate target
- Status thresholds

## Modeling principle

Ratios should be recomputed from aggregated numerators and denominators. For example, branch Average Basket Value should be `SUM(Sales) / SUM(Customers)`, not the average of employee-day basket ratios.
