# Project Notes

## Purpose

Branch Performance KPI Dashboard is a synthetic branch-performance analytical application focused on target tracking, sales drivers, employee KPIs, category performance and operational action.

## Design choices

1. **Synthetic-first publication** — all branch, employee, transaction, category and operational records are fictional.
2. **Transparent browser analytics** — calculations are implemented in readable Vanilla JavaScript rather than hidden behind a backend.
3. **Explicit data grain** — the main daily sales fact is Employee × Date.
4. **Config-governed thresholds** — sales and point-target status rules are stored in `data/sample/config.json`.
5. **Segment-aware analysis** — All / Core / Special sales segments affect sales/customer/basket metrics.
6. **Metric-semantic protection** — Core Basket and Operational Product Rate remain Core Retail metrics even when another sales segment is selected.
7. **Denominator-safe ratios** — zero denominators return zero rather than invalid values.
8. **Separation of runtime and reference layers** — the HTML/JavaScript dashboard is implemented; SQL and Power BI are reference translations/design documentation.

## Implemented analytical layers

- interactive HTML/CSS/JavaScript application;
- synthetic CSV/JSON data;
- KPI and filter logic;
- employee/category/operations views;
- automated Node regression tests;
- repository quality gate;
- GitHub Pages deployment;
- SQL reference model;
- Power BI mapping documentation.

## Current limitation

The sample is intentionally small and covers a short fictional period. It demonstrates analytical design and interaction behavior, not forecasting or real operational performance.
