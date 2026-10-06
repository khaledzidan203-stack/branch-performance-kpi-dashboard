# Technical Walkthrough — 60–90 Seconds

**0–10 seconds — Scope**

This is a dependency-free branch-performance analytical application built with HTML, CSS and Vanilla JavaScript over synthetic CSV/JSON data.

**10–25 seconds — Data grain**

The main fact table is Employee × Date. The committed sample has 30 employee-day rows across 10 dates and three fictional employees. Categories, targets, activities and reminders are separate supporting datasets.

**25–45 seconds — KPI logic**

The application decomposes sales into Core Retail and Special Channel, calculates customers and basket value, and compares period-adjusted sales with configured targets. Ratios use aggregated numerators and denominators.

**45–60 seconds — Filter behavior**

Date, Employee and Sales Segment filters recalculate Overview KPIs, trend and employee metrics. Sales, Customers and Average Basket follow the selected segment; Core Basket and Operational Product Rate remain explicitly Core Retail measures.

**60–75 seconds — Governance**

SAFE/WATCH/DANGER thresholds are read from `config.json`, avoiding duplicated business-rule constants. Automated Node tests cover source baselines, segment filtering, threshold boundaries and denominator-safe calculations.

**75–90 seconds — Delivery**

The application is deployed through GitHub Pages. SQL provides an optional reference model, while Power BI documentation shows how the design could be translated but does not claim a PBIP/PBIR runtime implementation.
