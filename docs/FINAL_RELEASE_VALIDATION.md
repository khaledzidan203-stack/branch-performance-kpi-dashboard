# Final Release Validation

## Release scope

This hardening release improves analytical correctness, automated validation and project presentation without changing the committed synthetic source data, CSS design, SQL reference model or screenshots.

## Technical corrections

1. Sales status thresholds now come from `data/sample/config.json`.
2. Point-target status logic reads the configured attainment rule.
3. The Employee table now applies the selected Sales Segment to Sales, Customers and Average Basket.
4. Core Basket and Operational Product Rate remain explicitly Core Retail metrics.

## Automated checks

The Node test suite validates:

- 30 daily rows;
- 10 distinct dates;
- 3 employees;
- 6 categories;
- row-level Core/Special decomposition;
- SAR 124,880 full-sample sales;
- 1,643 customers;
- SAR 91,330 Core Retail sales;
- SAR 33,550 Special Channel sales;
- employee All/Core/Special segment behavior;
- Core metric stability across segment filters;
- config-driven sales status boundaries;
- config-driven point-target status;
- category totals.

Repository validation additionally checks required documentation, application artifacts, protected source-data/reference files and neutral presentation wording.

## Runtime boundary

The browser dashboard is implemented and deployable through GitHub Pages.

The SQL files are reference-model artifacts and are not a deployed backend.

The Power BI document is a mapping/design reference only. No PBIP/PBIR/TMDL or Power BI Desktop execution artifact is claimed.

## Privacy boundary

All data is synthetic. No real company, employee, customer or transaction data is included.
