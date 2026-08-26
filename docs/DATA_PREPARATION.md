# Data Preparation

## Source validation

The public data is generated specifically for demonstration. Before calculation, the application converts numeric text fields to numbers and treats non-numeric values as zero.

## Row-level transformations

For each daily employee record:

```text
Cash-like component = Total Sales - (CoveredSales + Channel A + Channel B + Channel C)
Core Retail Sales    = Cash-like component + CoveredSales
Special Channel      = Total Sales - Core Retail Sales
Core Customers       = Total Customers - Special Customers
Average Basket       = Total Sales / Total Customers
Core Basket          = Core Retail Sales / Core Customers
Operational Rate     = Operational Product Sales / Core Retail Sales
```

The labels are intentionally generalized for a public portfolio.

## Aggregation

The application aggregates raw numerators and denominators first, then computes ratios. This avoids unweighted-average errors.

## Period targets

The sample uses calendar-day proportional allocation. If 5 of 10 sample days are selected, the period sales target is 50% of the configured target.

## Recommended production checks

A production pipeline should add checks for duplicate employee-date rows, negative values where not allowed, missing customer counts, invalid date ranges, late-arriving transactions, and target versioning.
