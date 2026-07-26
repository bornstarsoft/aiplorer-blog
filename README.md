# Aiplorer Blog

This is a Hugo static blog powered by Cloudflare Pages with the Ananke theme.

## Production validation

Check that every published legacy post resolves to one unique production URL
before building:

```bash
node scripts/validate-production-post-urls.mjs
hugo --cleanDestinationDir --gc --minify
```

The URL validator uses Hugo's published page graph, so draft, future, expired,
and `ignoreFiles` behavior matches the production build.
