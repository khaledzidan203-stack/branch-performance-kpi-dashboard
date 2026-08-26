# Data Dictionary

All fields below belong to synthetic portfolio datasets.

## `data/sample/daily_sales.csv`

| Column | Type | Description |
|---|---|---|
| date | date | Transaction summary date |
| employee_id | text | Synthetic employee key |
| employee_name | text | Fictional display name |
| total_sales | decimal | Total recorded sales value |
| covered_sales | decimal | Generalized covered-sales component retained for calculation demonstration |
| channel_a | decimal | Generalized alternate sales channel A |
| channel_b | decimal | Generalized alternate sales channel B |
| channel_c | decimal | Generalized alternate sales channel C |
| push_sales | decimal | Synthetic operational-product sales |
| total_customers | integer | Total customer transactions |
| special_customers | integer | Customers associated with generalized special-channel sales |

## Derived fields in `js/app.js`

| Field | Formula |
|---|---|
| cash | total_sales − (covered_sales + channel_a + channel_b + channel_c) |
| core | cash + covered_sales |
| special | total_sales − core |
| core_customers | total_customers − special_customers |
| basket | total_sales / total_customers |
| core_basket | core / core_customers |
| operational_product_rate | push_sales / core |

## `data/sample/category_sales.csv`

| Column | Type | Description |
|---|---|---|
| category | text | Synthetic retail category |
| sales | decimal | Synthetic category sales |
| target | decimal | Synthetic category target |

## `data/sample/config.json`

| Path | Type | Description |
|---|---|---|
| project | text | Public project title |
| month | text | Demo month |
| branch | text | Fictional branch name |
| currency | text | Reporting currency |
| targets.sales | decimal | Branch sales target |
| targets.coreSales | decimal | Core-retail target |
| targets.averageBasket | decimal | Employee operational basket target used in demo |
| targets.pushRate | decimal | Operational-product-rate target |
| statusRules.sales.safe | decimal | SAFE sales threshold |
| statusRules.sales.watch | decimal | WATCH sales threshold |
| statusRules.operationalRate.safe | decimal | Full-achievement threshold for operational rate KPIs |

## `activities.json`

`date`, `type`, `title`, `owner`, `priority` describe synthetic upcoming operational actions.

## `reminders.json`

`title`, `status`, and `due` describe synthetic recurring follow-up items.
