# ryan-site

This repo is the personal/marketing site codebase for Ryan, but ownership and hosting must be verified before deploy.

## Critical Ownership Rule

- The current git remote is `https://github.com/sray91/ryan-site.git`
- Do not assume Ryan directly controls the production Vercel project or deploy target
- Verify ownership, account, and destination before deploying or changing env/domain settings

## Stack

- Next.js
- Sanity CMS
- Vercel-oriented app dependencies

## Before Changes

- Check git remotes
- Check whether the task is code-only, content-only, or deployment-affecting
- Check whether the request is for `ryancahalane.com`, a preview deployment, or a local-only change

## Guardrails

- Treat `ryancahalane.com` as verify-first
- Do not change domains, env vars, or deploy targets on assumption
- Keep secrets in env files, not committed files

## Verification

- For UI/content work, verify local rendering
- For deploy work, explicitly confirm the destination account/project before pushing or deploying
