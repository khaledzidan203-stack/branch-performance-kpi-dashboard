# Presentation Assets

This directory contains presentation-only visual assets for the Branch Performance KPI Dashboard project.

## Intended use

The primary overview image stored here is used by the repository README to explain the implemented analytical application at a glance.

Recommended filename:

`branch_performance_kpi_dashboard_overview.png`

The overview should represent only repository-supported claims, including:

- synthetic branch-performance data only;
- a 5-page interactive HTML/CSS/Vanilla JavaScript analytical application;
- global Date, Employee, and Sales Segment filters;
- target-versus-actual sales tracking;
- customer-count and Average Basket Value driver analysis;
- employee-level sales, basket, core-basket, and operational-rate metrics;
- category actual-versus-target analysis;
- operational activities and reminders;
- SAFE / WATCH / DANGER management-status logic;
- configurable branch targets stored in `data/sample/config.json`;
- denominator-safe KPI calculations;
- SQL reference schema and analytical queries;
- Power BI mapping/design documentation only;
- zero runtime package dependencies;
- GitHub Pages deployment.

## Evidence boundary

Assets in this directory are presentation summaries only. They are not analytical source data, runtime validation evidence, SQL execution evidence, or Power BI runtime evidence.

Authoritative claims remain defined by the committed synthetic CSV/JSON files, JavaScript implementation, KPI/business-rule documentation, SQL reference model, screenshots, and repository workflows.
