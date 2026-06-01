# Aiplorer Deployment Notes

Date: 2026-06-01

The repository README describes this project as a Hugo static site powered by
Cloudflare Pages. No root GitHub Pages workflow was found during Phase 1A.

The root `CNAME` file currently contains:

```txt
www.bornstarai.com
```

This does not match `baseURL = "https://aiplorer.com/"`. Under the current
Cloudflare Pages assumption, the file should not affect the Hugo build output,
but the live custom domain must be confirmed in Cloudflare Pages before a
production launch.

Do not guess live DNS settings from the repository alone. Confirm:

- Cloudflare Pages project name and production branch.
- Custom domain entries for `aiplorer.com` and `www.aiplorer.com`.
- Redirect behavior from `www.aiplorer.com` to `aiplorer.com`.
- Whether this repository is also connected to any GitHub Pages deployment.
