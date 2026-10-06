# Testing

## Automated analytical tests

Run:

```bash
node tests/dashboard.test.js
```

The suite validates:

- 30 daily rows;
- 10 dates;
- 3 employees;
- 6 categories;
- row-level Core/Special decomposition;
- full-sample sales/customer baselines;
- Core and Special totals;
- employee All/Core/Special segment behavior;
- Core Basket semantic stability across segment filters;
- Operational Product Rate semantic stability across segment filters;
- config-driven sales threshold boundaries;
- config-driven point-target behavior;
- category totals.

## Repository contract

Run:

```bash
node scripts/validate_repository.js
```

This checks required files, protected synthetic/reference artifacts, presentation-neutral wording and implementation contracts.

Both commands run automatically in GitHub Actions.

## Manual functional checks

- Dashboard loads all CSV/JSON sample files.
- Date filter changes KPI values and trend points.
- Employee filter isolates one fictional employee.
- Segment filter switches All / Core / Special metrics.
- Employee Sales / Customers / Average Basket follow the selected segment.
- Core Basket and Product Rate remain Core Retail metrics.
- Category achievement bars equal Sales / Target.
- Activities and reminders render correctly.

## Boundary expectations

- Sales achievement 79.99% ⇒ DANGER
- Sales achievement 80.00% ⇒ WATCH
- Sales achievement 84.99% ⇒ WATCH
- Sales achievement 85.00% ⇒ SAFE
- Point-target attainment below configured requirement ⇒ DANGER
- Full configured point-target attainment ⇒ SAFE
- Zero denominator ⇒ zero, not Infinity/NaN

## Privacy checks

- no real company names;
- no real employees or customers;
- no credentials or connection strings;
- no internal URLs;
- no production datasets.
