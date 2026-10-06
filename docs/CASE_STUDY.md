# Case Study — Branch Performance Intelligence

## Context

A branch-performance dashboard needs to answer more than whether sales are high or low. Management needs to understand target attainment, customer volume, basket value, employee performance, category gaps and operational actions in the same workflow.

This project implements that workflow using a synthetic, dependency-free browser application.

## Analytical problem

The design separates several questions:

1. Are selected-period sales tracking against the appropriate target?
2. Is performance driven by customer count or value per customer?
3. How do results change by employee and sales segment?
4. Which employee-level operational measures are below target?
5. Which categories are furthest from plan?
6. Which operational actions and reminders should be reviewed next?

## Data model

The central dataset is `daily_sales.csv` at:

**Employee × Date**

The synthetic sample contains:

- 30 employee-day rows;
- 10 dates;
- 3 fictional employees;
- 6 categories;
- branch-level configuration;
- activity and reminder reference datasets.

## Calculation design

Rows are decomposed into:

- Total Sales;
- Core Retail Sales;
- Special Channel Sales;
- Total Customers;
- Core Retail Customers;
- Special Customers;
- Operational Product Sales.

Ratios are always recalculated from aggregated numerators and denominators.

## Filter semantics

Date, Employee and Sales Segment filters affect the Overview and employee analysis.

The Sales Segment filter changes employee:

- Sales;
- Customers;
- Average Basket.

Core Basket and Operational Product Rate intentionally remain Core Retail measures. They are not redefined when Special Channel is selected.

Category performance and operational schedules are reference datasets and remain outside employee-level filter grain.

## Configuration governance

Sales thresholds and point-target behavior are loaded from `data/sample/config.json`.

Current rules:

- SAFE ≥ 85% sales achievement;
- WATCH ≥ 80% and < 85%;
- DANGER < 80%;
- point-target metrics are SAFE only at full target attainment.

The implementation now reads those values from configuration rather than duplicating the sales thresholds in JavaScript.

## Current synthetic baseline

For the full sample:

- Actual Sales: SAR 124,880
- Sales Target: SAR 124,000
- Achievement: 100.71%
- Customers: 1,643
- Average Basket: SAR 76.01
- Core Retail Sales: SAR 91,330
- Special Channel Sales: SAR 33,550
- Operational Product Rate: 10.64%
- Category Sales: SAR 115,010
- Aggregate Category Achievement: 93.50%

## Hardening finding

The original employee table did not apply the Sales Segment filter to Sales, Customers or Average Basket even though the project documentation described employee calculations as filter-aware.

The current implementation fixes that inconsistency and adds automated regression coverage for All / Core / Special employee metrics.

## Delivery architecture

The dashboard uses:

- HTML5
- CSS3
- Vanilla JavaScript
- CSV / JSON
- inline SVG
- GitHub Pages

It has no runtime package dependencies.

## Engineering outcome

The project demonstrates a compact branch-performance management pattern:

**target tracking → sales drivers → employee KPIs → category gaps → operational actions**

while keeping metric definitions explicit and testable.
