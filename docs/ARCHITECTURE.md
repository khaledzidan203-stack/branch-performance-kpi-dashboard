# Architecture

## Overview

The public project is a static analytical web application. It has no backend and no authentication because it only uses synthetic local files.

```text
Synthetic CSV / JSON
        |
        v
Data loading + parsing (js/app.js)
        |
        v
Row-level calculations
        |
        v
Filter context (date / employee / segment)
        |
        v
Aggregations + KPI rules
        |
        v
HTML KPI cards / SVG trend / tables / activity views
```

## Components

- `index.html` — semantic page layout and dashboard navigation.
- `css/styles.css` — responsive design system.
- `js/app.js` — loading, transformation, aggregation, KPI logic, filtering, and rendering.
- `data/sample/` — synthetic analytical source data.
- `docs/` — business and technical documentation.
- `sql/` — optional relational reference model and analytical queries.

## Data flow

1. Browser requests CSV/JSON files from the local static server.
2. JavaScript parses the records in memory.
3. Derived row fields are calculated once per rendered view.
4. Filter context is applied.
5. KPI aggregates are calculated from filtered numerators and denominators.
6. The DOM and SVG trend are redrawn.

## Security and privacy

The project contains no server endpoints, credentials, secrets, APIs, personal records, or real company datasets. The `.gitignore` also blocks common private-data folders and environment files.
