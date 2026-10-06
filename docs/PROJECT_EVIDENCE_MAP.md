# Project Evidence Map

| Claim | Primary evidence | Evidence type |
|---|---|---|
| Synthetic-only branch data | `data/sample/`, privacy documentation | Committed data + governance |
| 30 employee-day rows | `daily_sales.csv`, automated tests | Data + test |
| 10 dates / 3 employees | `daily_sales.csv`, automated tests | Data + test |
| 6 categories | `category_sales.csv`, automated tests | Data + test |
| Employee × Date grain | `DATA_DICTIONARY.md`, `docs/DATA_MODEL.md` | Data contract |
| Three global filters | `index.html`, `js/app.js` | Implemented UI |
| Segment-aware employee Sales/Customers/Basket | `js/app.js`, `tests/dashboard.test.js` | Source + regression test |
| Core Basket remains Core metric | `js/app.js`, tests, KPI docs | Source + test |
| Config-driven sales thresholds | `config.json`, `js/app.js`, tests | Config + source + test |
| SAR 124,880 full-sample sales | automated test over `daily_sales.csv` | Executable baseline |
| 1,643 customers | automated test | Executable baseline |
| SAR 91,330 Core Retail sales | automated test | Executable baseline |
| SAR 33,550 Special Channel sales | automated test | Executable baseline |
| Implemented dashboard | `index.html`, CSS, JS, screenshots | Executable artifact |
| GitHub Pages deployment | `.github/workflows/pages.yml` | Deployment workflow |
| SQL runtime backend | No backend/database runtime | **Not claimed** |
| SQL reference model | `sql/schema.sql`, `analysis_queries.sql` | Reference translation |
| Power BI runtime implementation | No PBIP/PBIR/TMDL committed | **Not claimed** |
| Power BI mapping | `docs/POWER_BI_MAPPING.md` | Design reference |

## Evidence rule

Presentation assets and screenshots help explain the project but do not replace implementation evidence. Runtime claims are tied to source files, automated tests, committed data and deployment workflows.
