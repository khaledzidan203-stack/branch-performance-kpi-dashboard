'use strict';

const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const fs=require('node:fs');
const path=require('node:path');

const ROOT=path.resolve(__dirname,'..');

const protectedBlobs={
  'js/app.js':'e5b8de2bee871daf57d96b5003145539348c872e',
  'index.html':'cf738b79c6599153f95372df598221345454ad5a',
  'css/styles.css':'108d5c3a51fec4cb8fb9774d7da14fb5c049c580',
  'data/sample/daily_sales.csv':'90c1a1471b0770ac36025fa246e24b756e703ff4',
  'data/sample/category_sales.csv':'a2206b7a6a1d53138dd9c9e4cfe07f04f09c800a',
  'data/sample/config.json':'fb910d4528cf5b1090f49a3ee20a7c219e11b6b9',
  'data/sample/activities.json':'52271adcf4f9fad514d5b2e093ea8b3f62fcf213',
  'data/sample/reminders.json':'01a9c35717d6cf108a806f017594bb90d8bbf44d',
  'sql/schema.sql':'a85a9e76b881ee6bf02f7019f0ec60a8cb5b55df',
  'sql/analysis_queries.sql':'1e7fdc7df1e387c27cd0e8a40bdf3fd276db3fe1',
  'screenshots/dashboard-overview.png':'b0edcc0f5e36f5f87754483daf276e3570c64276',
  'screenshots/employee-performance.png':'468fee052bf75d603a7319daf86de88d50d9d95c'
};

const requiredFiles=[
  'README.md',
  'PROJECT_NOTES.md',
  'KPI_DEFINITIONS.md',
  'BUSINESS_LOGIC.md',
  'docs/README.md',
  'docs/PROJECT_INDEX.md',
  'docs/CASE_STUDY.md',
  'docs/TECHNICAL_WALKTHROUGH.md',
  'docs/PROJECT_EVIDENCE_MAP.md',
  'docs/FINAL_RELEASE_VALIDATION.md',
  'docs/ENVIRONMENT_BASELINE.md',
  'docs/POWER_BI_MAPPING.md',
  'docs/assets/Branch Performance KPI Dashboard.png',
  'screenshots/dashboard-overview.png',
  'screenshots/employee-performance.png',
  'tests/dashboard.test.js'
];

function file(rel){
  return path.join(ROOT,rel);
}

function gitBlobSha(rel){
  const data=fs.readFileSync(file(rel));
  const header=Buffer.from(`blob ${data.length}\0`);
  return crypto.createHash('sha1').update(Buffer.concat([header,data])).digest('hex');
}

for(const rel of requiredFiles){
  assert.ok(fs.existsSync(file(rel)),`Missing required file: ${rel}`);
}

for(const [rel,expected] of Object.entries(protectedBlobs)){
  assert.ok(fs.existsSync(file(rel)),`Missing protected file: ${rel}`);
  const actual=gitBlobSha(rel);
  assert.equal(actual,expected,`Protected analytical artifact changed: ${rel}`);
}

const readme=fs.readFileSync(file('README.md'),'utf8');
assert.ok(readme.includes('Branch%20Performance%20KPI%20Dashboard.png'),'README hero image link missing');
assert.ok(readme.includes('## Automated validation'),'README validation section missing');
assert.ok(!readme.includes('Featured Portfolio'),'Old cross-project portfolio block remains in README');
assert.ok(!readme.includes('Primary roles demonstrated'),'Old role-targeting wording remains in README');

const index=fs.readFileSync(file('index.html'),'utf8');
assert.ok(!index.includes('Analytics Portfolio Demo'),'Old portfolio-demo label remains in application');
assert.ok(!index.includes('Portfolio demonstration.'),'Old portfolio footer remains in application');

const app=fs.readFileSync(file('js/app.js'),'utf8');
assert.ok(app.includes('state.config?.statusRules?.sales'),'Sales status is not config-driven');
assert.ok(app.includes('segmentCustomers'),'Segment-aware customer logic missing');
assert.ok(app.includes('employeeMetrics'),'Employee filter-aware metric helper missing');

const config=JSON.parse(fs.readFileSync(file('data/sample/config.json'),'utf8'));
assert.equal(config.statusRules.sales.safe,0.85);
assert.equal(config.statusRules.sales.watch,0.80);
assert.equal(config.statusRules.operationalRate.safe,1.0);

assert.ok(!fs.existsSync(file('PORTFOLIO_NOTES.md')),'PORTFOLIO_NOTES.md should be replaced by PROJECT_NOTES.md');

console.log('PASS | protected dashboard core');
console.log('PASS | presentation and documentation contract');
console.log('PASS | config-driven KPI rules');
console.log('PASS | segment-aware employee metric implementation');
console.log('REPOSITORY VALIDATION PASS');
