# Power BI Mapping

The static JavaScript dashboard can be reproduced in Power BI using the same public data model.

## Suggested tables

- `FactDailySales`
- `DimDate`
- `DimEmployee`
- `FactCategoryPerformance`
- `BranchTargets`

## Suggested relationships

- `DimDate[Date]` 1:* `FactDailySales[Date]`
- `DimEmployee[EmployeeID]` 1:* `FactDailySales[EmployeeID]`

## Example DAX measures

```DAX
Actual Sales =
SUM ( FactDailySales[TotalSales] )

Customer Count =
SUM ( FactDailySales[TotalCustomers] )

Average Basket Value =
DIVIDE ( [Actual Sales], [Customer Count], 0 )

Core Retail Sales =
SUMX (
    FactDailySales,
    FactDailySales[TotalSales]
        - FactDailySales[ChannelA]
        - FactDailySales[ChannelB]
        - FactDailySales[ChannelC]
)

Core Customers =
SUM ( FactDailySales[TotalCustomers] )
    - SUM ( FactDailySales[SpecialCustomers] )

Core Basket =
DIVIDE ( [Core Retail Sales], [Core Customers], 0 )

Operational Product Rate =
DIVIDE ( SUM ( FactDailySales[OperationalProductSales] ), [Core Retail Sales], 0 )

Achievement % =
DIVIDE ( [Actual Sales], [Period Sales Target], 0 )

Sales Status =
SWITCH (
    TRUE(),
    [Achievement %] >= 0.85, "SAFE",
    [Achievement %] >= 0.80, "WATCH",
    "DANGER"
)
```

## Recommended report pages

1. Executive Overview
2. Employee Performance
3. Category Performance
4. Operations / Actions
5. KPI Definitions / Data Quality

## Recommended visuals

- KPI cards for target, sales, achievement, customer count, and basket.
- Line chart for daily trend.
- Matrix for employee performance.
- Bar chart for category achievement.
- Slicers for date, employee, and sales segment.
- Conditional formatting for SAFE/WATCH/DANGER.
