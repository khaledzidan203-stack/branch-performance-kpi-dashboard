# Environment Baseline

## Browser runtime

The implemented dashboard requires a modern browser and a simple HTTP server so local CSV/JSON files can be fetched.

Runtime package dependencies: **none**.

## Validation environment

GitHub Actions uses Node.js to execute:

- `tests/dashboard.test.js`
- `scripts/validate_repository.js`

No npm packages are installed.

## Deployment

GitHub Pages deployment is managed by:

`.github/workflows/pages.yml`

## SQL boundary

The SQL files are an optional relational reference translation. They are not required to run the web dashboard.

## Power BI boundary

Power BI is documented as a mapping/design reference. No Power BI runtime environment is required for the implemented application.
