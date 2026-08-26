-- 1) Branch KPI summary
SELECT
    SUM(TotalSales) AS ActualSales,
    SUM(TotalCustomers) AS CustomerCount,
    CASE WHEN SUM(TotalCustomers) = 0 THEN 0
         ELSE SUM(TotalSales) * 1.0 / SUM(TotalCustomers) END AS AverageBasketValue
FROM FactDailySales;

-- 2) Employee performance using aggregated numerators/denominators
SELECT
    e.EmployeeName,
    SUM(f.TotalSales) AS Sales,
    SUM(f.TotalCustomers) AS Customers,
    CASE WHEN SUM(f.TotalCustomers) = 0 THEN 0
         ELSE SUM(f.TotalSales) * 1.0 / SUM(f.TotalCustomers) END AS AverageBasketValue,
    SUM(f.TotalSales - f.ChannelA - f.ChannelB - f.ChannelC) AS CoreRetailSales,
    SUM(f.TotalCustomers - f.SpecialCustomers) AS CoreCustomers
FROM FactDailySales f
JOIN DimEmployee e ON e.EmployeeID = f.EmployeeID
GROUP BY e.EmployeeName
ORDER BY Sales DESC;

-- 3) Category target achievement
SELECT
    CategoryName,
    Sales,
    Target,
    CASE WHEN Target = 0 THEN 0 ELSE Sales / Target END AS AchievementPct
FROM FactCategoryPerformance
ORDER BY AchievementPct DESC;
