'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const analytics=require('../js/app.js');

const ROOT=path.resolve(__dirname,'..');
const config=JSON.parse(fs.readFileSync(path.join(ROOT,'data/sample/config.json'),'utf8'));
const dailyText=fs.readFileSync(path.join(ROOT,'data/sample/daily_sales.csv'),'utf8');
const categoryText=fs.readFileSync(path.join(ROOT,'data/sample/category_sales.csv'),'utf8');

analytics.state.config=config;

const daily=analytics.parseCSV(dailyText).map(analytics.calcRow);
const categories=analytics.parseCSV(categoryText);

function approx(actual,expected,tolerance=1e-9){
  assert.ok(Math.abs(actual-expected)<=tolerance, `Expected ${actual} ≈ ${expected}`);
}

function metricsFor(rows,segment){
  analytics.state.filters.segment=segment;
  return analytics.employeeMetrics(rows);
}

// Source-data contract
assert.equal(daily.length,30);
assert.equal(new Set(daily.map(r=>r.date)).size,10);
assert.equal(new Set(daily.map(r=>r.employee_id)).size,3);
assert.equal(categories.length,6);

// Row-level decomposition
const first=daily[0];
assert.equal(first.total,4380);
assert.equal(first.core,3200);
assert.equal(first.special,1180);
assert.equal(first.nwcc,45);
approx(first.basket,4380/57);
approx(first.coreBasket,3200/45);

// Portfolio baseline
assert.equal(daily.reduce((s,r)=>s+r.total,0),124880);
assert.equal(daily.reduce((s,r)=>s+r.cc,0),1643);
assert.equal(daily.reduce((s,r)=>s+r.core,0),91330);
assert.equal(daily.reduce((s,r)=>s+r.special,0),33550);
approx(daily.reduce((s,r)=>s+r.push,0)/91330,0.10642724187014124);

// Employee segment filter contract
const e1=daily.filter(r=>r.employee_id==='E01');

const e1All=metricsFor(e1,'All');
assert.equal(e1All.sales,47690);
assert.equal(e1All.customers,623);

const e1Core=metricsFor(e1,'Core');
assert.equal(e1Core.sales,34725);
assert.equal(e1Core.customers,486);

const e1Special=metricsFor(e1,'Special');
assert.equal(e1Special.sales,12965);
assert.equal(e1Special.customers,137);

// Core-only operational metrics intentionally remain stable across sales-segment filters
approx(e1All.coreBasket,e1Core.coreBasket);
approx(e1Core.coreBasket,e1Special.coreBasket);
approx(e1All.pushRate,e1Core.pushRate);
approx(e1Core.pushRate,e1Special.pushRate);

// Config-driven status thresholds
analytics.state.filters.segment='All';
assert.equal(analytics.salesStatus(config.statusRules.sales.safe),'SAFE');
assert.equal(analytics.salesStatus(config.statusRules.sales.watch),'WATCH');
assert.equal(analytics.salesStatus(config.statusRules.sales.watch-0.0001),'DANGER');

const originalSafe=config.statusRules.sales.safe;
const originalWatch=config.statusRules.sales.watch;
config.statusRules.sales.safe=0.90;
config.statusRules.sales.watch=0.85;
assert.equal(analytics.salesStatus(0.87),'WATCH');
config.statusRules.sales.safe=originalSafe;
config.statusRules.sales.watch=originalWatch;

// Point-target rule also reads configuration
assert.equal(analytics.pointTargetStatus(config.targets.pushRate,config.targets.pushRate),'SAFE');
const originalOperational=config.statusRules.operationalRate.safe;
config.statusRules.operationalRate.safe=1.10;
assert.equal(analytics.pointTargetStatus(config.targets.pushRate,config.targets.pushRate),'DANGER');
config.statusRules.operationalRate.safe=originalOperational;

// Category baseline
assert.equal(categories.reduce((s,r)=>s+Number(r.sales),0),115010);
assert.equal(categories.reduce((s,r)=>s+Number(r.target),0),123000);

console.log('DASHBOARD ANALYTICAL TESTS PASS');
