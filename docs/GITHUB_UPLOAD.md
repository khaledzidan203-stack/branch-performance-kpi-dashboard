# GitHub Upload Instructions

## Method A — GitHub website

1. Sign in to GitHub.
2. Click **New repository**.
3. Repository name: `branch-performance-kpi-dashboard`.
4. Description: `Interactive retail branch KPI dashboard using synthetic data, HTML/CSS/JavaScript, SQL and Power BI modeling documentation.`
5. Choose **Public**.
6. Do **not** initialize with another README, license, or `.gitignore` because these are already included.
7. Create the repository.
8. Use **Add file → Upload files** and upload the **contents** of this project folder, preserving subfolders.
9. Commit to `main`.

For a large folder tree, the Git command-line method is more reliable.

## Method B — Git command line

From inside the project folder:

```bash
git init
git add .
git commit -m "Initial portfolio release"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/branch-performance-kpi-dashboard.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Enable GitHub Pages

The repository includes `.github/workflows/pages.yml`.

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push to `main` or manually run the Pages workflow from **Actions**.
5. After deployment, add the published Pages URL to the repository **About** section.

## Recommended repository metadata

**Topics:**

`data-analytics`, `business-analysis`, `dashboard`, `kpi`, `javascript`, `html`, `css`, `sql`, `power-bi`, `retail-analytics`, `portfolio-project`

## Final recruiter-facing check

Before sharing the link:

- confirm the README screenshots render;
- confirm the GitHub Pages link opens;
- test filters on desktop and mobile width;
- confirm every dataset is synthetic;
- confirm there are no secrets in commit history;
- pin the repository on your GitHub profile.
