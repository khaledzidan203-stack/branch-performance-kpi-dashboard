# Power BI Mapping

> **Implementation status — design reference only.** This document explains how the browser analytical model could be translated into Power BI. The repository does not contain a committed PBIP/PBIR/TMDL or PBIX runtime implementation.

## Suggested tables

- `FactDailySales`
- `DimDate`
- `DimEmployee`
- `FactCategoryPerformance`
- `BranchTargets`

## Suggested relationships

- `DimDate[Date]` 1:* `FactDailySales[Date]`
- `DimEmployee[EmployeeID]` 1:* `FactDailySales[EmployeeID]`

## Example measures

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
DIVIDE (
    SUM ( FactDailySales[OperationalProductSales] ),
    [Core Retail Sales],
    0
)
```

A Power BI implementation should also reproduce the segment-specific sales/customer logic and the config-governed status thresholds rather than hard-code conflicting rules.

## Recommended report pages

1. Executive Overview
2. Employee Performance
3. Category Performance
4. Operations / Actions
5. KPI Definitions / Data Quality

## Evidence boundary

The current implemented reporting artifact is the HTML/CSS/JavaScript dashboard. This document is not Power BI runtime evidence.
