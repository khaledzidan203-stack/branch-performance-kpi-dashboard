# Branch Performance KPI Dashboard

## Target Tracking, Sales Drivers, Employee KPIs & Operational Action

[![Repository Validation](https://github.com/khaledzidan203-stack/branch-performance-kpi-dashboard/actions/workflows/repository-validation.yml/badge.svg)](https://github.com/khaledzidan203-stack/branch-performance-kpi-dashboard/actions/workflows/repository-validation.yml)
[![Deploy static dashboard to GitHub Pages](https://github.com/khaledzidan203-stack/branch-performance-kpi-dashboard/actions/workflows/pages.yml/badge.svg)](https://github.com/khaledzidan203-stack/branch-performance-kpi-dashboard/actions/workflows/pages.yml)

Branch Performance KPI Dashboard is a dependency-free analytical web application for monitoring a synthetic retail branch across sales targets, customer volume, basket value, employee performance, category achievement and operational actions.

> **Data boundary:** every branch, employee, customer count, transaction value, category, activity and reminder in this repository is synthetic. No real company, employee, customer or transaction data is included.

<img src="docs/assets/Branch%20Performance%20KPI%20Dashboard.png" alt="Branch Performance KPI Dashboard overview" width="100%">

> **Visual evidence note:** the infographic is a presentation schematic. The implemented application currently contains five pages and three global filters: Date, Employee and Sales Segment. Exact KPI logic is governed by `js/app.js`, `data/sample/config.json` and the KPI documentation.

**Start here:** [Case study](docs/CASE_STUDY.md) · [Technical walkthrough](docs/TECHNICAL_WALKTHROUGH.md) · [Evidence map](docs/PROJECT_EVIDENCE_MAP.md) · [Project index](docs/PROJECT_INDEX.md) · [Final validation](docs/FINAL_RELEASE_VALIDATION.md)

## Project at a glance

| Area | Current implementation |
|---|---|
| Application | Static HTML/CSS/Vanilla JavaScript analytical dashboard |
| Runtime dependencies | None |
| Synthetic period | 1–10 July 2026 |
| Daily fact grain | Employee × Date |
| Employees | 3 fictional employees |
| Daily sales rows | 30 |
| Categories | 6 |
| Global filters | Date range · Employee · Sales Segment |
| Pages | Overview · Employees · Categories · Operations · Methodology |
| Deployment | GitHub Pages |
| SQL | Optional relational reference model + analytical queries |
| Power BI | Mapping/design documentation only; no PBIP/PBIR/TMDL runtime artifact |
| Automated validation | Node-based KPI/data regression suite + repository quality gate |

## Business problem

A branch manager needs more than one sales total. Performance should be decomposed into:

- **target attainment** — is the selected period on plan?
- **customer volume** — how many customers contributed to sales?
- **basket value** — how much value came from each customer?
- **employee performance** — which employee-level KPIs need attention?
- **category performance** — which categories are ahead of or behind target?
- **operational actions** — what activities and reminders should be reviewed next?

The project keeps these questions separate while letting the user change the active date period, employee and sales segment.

## Analytical flow

```text
Synthetic CSV / JSON
        ↓
Browser loading & parsing
        ↓
Row-level sales/customer decomposition
        ↓
Global filter context
Date · Employee · Sales Segment
        ↓
Aggregated KPI calculations
        ↓
Target / status rules from config.json
        ↓
Interactive HTML / SVG / tables
        ↓
Management review & operational actions
```

All calculations run in the browser. No backend, database server or external chart library is required for the deployed dashboard.

## Global filter behavior

The three implemented filters are:

1. **Date From / Date To**
2. **Employee**
3. **Sales Segment** — All Sales / Core Retail / Special Channel

The Overview KPI cards, daily trend and employee table recalculate from the active filter context.

The employee table now respects the selected sales segment for:

- Sales
- Customers
- Average Basket

The following remain intentionally **Core Retail metrics** regardless of the selected sales segment:

- Core Basket
- Operational Product Rate

This preserves their defined business meaning instead of silently redefining them under a Special Channel filter.

Category performance and operational schedules use separate reference datasets and are not employee-level facts.

## KPI framework

### Sales performance

- **Actual Sales** = selected segment sales under the active filter context
- **Period Target** = configured monthly target × selected calendar days / full sample days
- **Achievement %** = Actual Sales / Period Target
- **Customer Count** = selected segment customer count
- **Average Basket** = selected segment sales / selected segment customers
- **Active Days** = distinct days with positive selected-segment sales

### Core Retail metrics

- **Core Retail Sales** = Total Sales − Channel A − Channel B − Channel C
- **Core Retail Customers** = Total Customers − Special Customers
- **Core Basket** = Core Retail Sales / Core Retail Customers
- **Operational Product Rate** = Operational Product Sales / Core Retail Sales

Ratios are calculated from aggregated numerators and denominators rather than averaging row-level percentages.

## Config-driven management status

The dashboard reads thresholds from `data/sample/config.json`.

Current synthetic configuration:

| Rule | Threshold |
|---|---:|
| Sales SAFE | ≥ 85% |
| Sales WATCH | ≥ 80% and < 85% |
| Sales DANGER | < 80% |
| Point-target metrics | SAFE only when the configured target is fully achieved |

The JavaScript no longer duplicates the sales thresholds as hard-coded business logic. Status classification reads the configuration directly.

## Current synthetic baseline

For the full 1–10 July sample:

| Metric | Value |
|---|---:|
| Actual Sales | SAR 124,880 |
| Branch Sales Target | SAR 124,000 |
| Achievement | 100.71% |
| Customers | 1,643 |
| Average Basket | SAR 76.01 |
| Core Retail Sales | SAR 91,330 |
| Special Channel Sales | SAR 33,550 |
| Operational Product Rate | 10.64% |
| Category Sales | SAR 115,010 |
| Category Targets | SAR 123,000 |
| Aggregate Category Achievement | 93.50% |

These values describe the committed synthetic sample only.

## Dashboard pages

### 1. Overview

Shows:

- Actual Sales
- relevant period target
- Achievement %
- Customer Count
- Average Basket
- Operational Product Rate
- Active Days
- daily sales trend

### 2. Employees

Shows filter-aware employee Sales, Customers and Average Basket, alongside Core Basket and Operational Product Rate with status classification.

### 3. Categories

Compares six synthetic categories against category targets.

### 4. Operations

Displays upcoming synthetic activities and recurring reminders.

### 5. Methodology

Explains KPI formulas and status logic inside the application.

## Data model

### Daily sales fact

Grain:

**one employee on one date**

Fields include total sales, anonymous channel components, operational-product sales, total customers and special-channel customers.

### Supporting datasets

- `category_sales.csv` — one row per category for the demo period
- `config.json` — branch metadata, targets and status rules
- `activities.json` — synthetic operational actions
- `reminders.json` — synthetic recurring reminders

See [Data Model](docs/DATA_MODEL.md) and [Data Dictionary](DATA_DICTIONARY.md).

## Implemented front-end architecture

```text
index.html
   ├── css/styles.css
   ├── js/app.js
   └── data/sample/
          ├── daily_sales.csv
          ├── category_sales.csv
          ├── config.json
          ├── activities.json
          └── reminders.json
```

The dashboard uses native HTML, CSS, JavaScript and inline SVG rendering.

## SQL boundary

The `sql/` directory contains:

- `schema.sql` — optional relational reference model
- `analysis_queries.sql` — example branch, employee and category analytics

This is a **reference translation of the analytical model**, not the runtime engine behind the browser application.

## Power BI boundary

`docs/POWER_BI_MAPPING.md` describes how the same analytical design could be reproduced in Power BI with a date dimension, employee dimension, daily-sales fact and DAX measures.

There is currently **no committed PBIP/PBIR/TMDL or PBIX runtime implementation**. Power BI is therefore documented as a mapping/design reference only.

## Automated validation

The repository quality gate verifies:

- 30 daily rows;
- 10 distinct dates;
- 3 fictional employees;
- 6 categories;
- full-sample sales/customer/core/special baselines;
- row-level decomposition;
- denominator-safe calculations;
- employee Sales Segment filter behavior;
- Core Basket / Product Rate semantic stability;
- config-driven sales thresholds;
- config-driven point-target status logic;
- required presentation/documentation files;
- protected synthetic data and reference SQL artifacts.

The test suite uses Node's built-in modules only. There are no npm runtime dependencies.

## Screenshots

### Overview

![Dashboard overview](screenshots/dashboard-overview.png)

### Employee performance

![Employee performance](screenshots/employee-performance.png)

These screenshots are retained examples from the implemented dashboard.

## Quick Start

Because the browser loads local CSV/JSON files, serve the repository over HTTP.

### Python

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

### VS Code

Open `index.html` with Live Server.

### Run analytical tests

```bash
node tests/dashboard.test.js
node scripts/validate_repository.js
```

No `npm install` is required.

## Repository structure

```text
index.html                  interactive application shell
css/styles.css              responsive dashboard design
js/app.js                   analytical engine + filters + rendering
data/sample/                synthetic CSV/JSON inputs
tests/dashboard.test.js     KPI and filter regression tests
scripts/                    repository contract validation
screenshots/                retained implemented-dashboard evidence
sql/                        optional relational reference model
docs/                       technical and business documentation
docs/assets/                presentation assets
.github/workflows/          validation + GitHub Pages deployment
```

## Documentation

- [Project Index](docs/PROJECT_INDEX.md)
- [Case Study](docs/CASE_STUDY.md)
- [Technical Walkthrough](docs/TECHNICAL_WALKTHROUGH.md)
- [Project Evidence Map](docs/PROJECT_EVIDENCE_MAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Business Requirements](docs/BUSINESS_REQUIREMENTS.md)
- [Data Model](docs/DATA_MODEL.md)
- [Data Preparation](docs/DATA_PREPARATION.md)
- [KPI Definitions](KPI_DEFINITIONS.md)
- [Business Logic](BUSINESS_LOGIC.md)
- [Testing](docs/TESTING.md)
- [Privacy & Synthetic Data](docs/PRIVACY_AND_SYNTHETIC_DATA.md)
- [Power BI Mapping](docs/POWER_BI_MAPPING.md)
- [Final Release Validation](docs/FINAL_RELEASE_VALIDATION.md)

## Limitations

- The dataset is intentionally small and synthetic.
- The demo uses calendar-day target allocation rather than working-day weighting.
- Category data is period-level reference data rather than date/employee-grained fact data.
- Operational activities and reminders are illustrative.
- The browser CSV parser assumes the controlled sample schema and is not a general RFC-complete CSV parser.
- SQL is a reference implementation, not the dashboard runtime.
- Power BI is design/mapping documentation only.
- No forecasting or causal inference is claimed.

Licensed under the [MIT License](LICENSE).
