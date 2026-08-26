# Testing Checklist

## Functional tests

- Dashboard loads all CSV/JSON sample files.
- Date filter changes KPI values and trend points.
- Employee filter isolates one fictional employee.
- Segment filter switches between All Sales, Core Retail, and Special Channel.
- Customer Count is aggregated correctly.
- Average Basket = aggregated Sales / aggregated Customers.
- Operational Product Rate = aggregated operational-product sales / aggregated Core Retail Sales.
- Employee operational status is SAFE only when the configured target is fully met.
- Category achievement bars match Sales / Target.
- Activities and reminders load from JSON.

## Boundary tests

- Sales achievement 79.99% => DANGER.
- Sales achievement 80.00% => WATCH.
- Sales achievement 84.99% => WATCH.
- Sales achievement 85.00% => SAFE.
- Operational target achievement 99.99% => DANGER.
- Operational target achievement 100.00% => SAFE.
- Zero denominator => zero rate, not Infinity/NaN.

## Privacy tests

- No real company names.
- No real employees or customers.
- No credentials or connection strings.
- No internal URLs.
- No production datasets.
