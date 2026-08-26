-- Optional relational reference model for the synthetic portfolio project.
CREATE TABLE DimEmployee (
    EmployeeID VARCHAR(20) PRIMARY KEY,
    EmployeeName VARCHAR(100) NOT NULL
);

CREATE TABLE DimDate (
    DateKey DATE PRIMARY KEY,
    YearNumber INT NOT NULL,
    MonthNumber INT NOT NULL,
    DayNumber INT NOT NULL
);

CREATE TABLE FactDailySales (
    DateKey DATE NOT NULL,
    EmployeeID VARCHAR(20) NOT NULL,
    TotalSales DECIMAL(18,2) NOT NULL,
    CoveredSales DECIMAL(18,2) NOT NULL,
    ChannelA DECIMAL(18,2) NOT NULL,
    ChannelB DECIMAL(18,2) NOT NULL,
    ChannelC DECIMAL(18,2) NOT NULL,
    OperationalProductSales DECIMAL(18,2) NOT NULL,
    TotalCustomers INT NOT NULL,
    SpecialCustomers INT NOT NULL,
    PRIMARY KEY (DateKey, EmployeeID),
    FOREIGN KEY (DateKey) REFERENCES DimDate(DateKey),
    FOREIGN KEY (EmployeeID) REFERENCES DimEmployee(EmployeeID)
);

CREATE TABLE FactCategoryPerformance (
    CategoryName VARCHAR(100) PRIMARY KEY,
    Sales DECIMAL(18,2) NOT NULL,
    Target DECIMAL(18,2) NOT NULL
);
