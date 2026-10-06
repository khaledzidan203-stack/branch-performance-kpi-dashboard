# Architecture

## Overview

The project is a static analytical web application. It has no backend or authentication because it only uses synthetic local files.

```text
Synthetic CSV / JSON
        |
        v
Data loading + parsing (js/app.js)
        |
        v
Row-level Core/Special calculations
        |
        v
Filter context
Date / Employee / Sales Segment
        |
        v
Aggregated numerators + denominators
        |
        v
Config-driven target and status rules
        |
        v
HTML KPI cards / SVG trend / tables / action views
```

## Components

- `index.html` — semantic layout and five-page navigation.
- `css/styles.css` — responsive design system.
- `js/app.js` — loading, transformation, filter context, KPI logic and rendering.
- `data/sample/` — synthetic analytical source data and configuration.
- `tests/dashboard.test.js` — automated analytical regression tests.
- `scripts/validate_repository.js` — repository/evidence contract.
- `docs/` — business and technical documentation.
- `sql/` — optional relational reference model and analytical queries.

## Data flow

1. Browser requests CSV/JSON files from the static server.
2. JavaScript parses records in memory.
3. Derived Core/Special fields are calculated.
4. Date and Employee filters select rows.
5. Sales Segment determines active sales/customer numerators.
6. Ratios are calculated from aggregated numerators and denominators.
7. Status logic reads configuration.
8. DOM and SVG outputs are redrawn.

## Deployment

GitHub Pages publishes the static repository through `.github/workflows/pages.yml`.

## Validation

A separate repository-validation workflow executes the analytical test suite and static repository contract.

## Security and privacy

The project contains no server endpoints, credentials, secrets, APIs, personal records or real company datasets.
