# Security Rules

These rules are non-negotiable. They apply to every file, every commit, every deploy.

## Secrets

- NEVER put API keys, passwords, tokens, or session secrets in tracked files.
- ALWAYS use environment variables for sensitive values.
- ALWAYS confirm `.env` is in `.gitignore` before the first commit.
- If a secret is committed by accident, rotate it immediately and scrub history.

## Environment files

- `.env` — local secrets, gitignored, never tracked.
- `.env.example` — placeholder values only, safe to commit.
- Treat `service_role`, admin, and machine-to-machine keys as bombs. Never expose them to the browser.

## Commits and pushes

- Scan staged changes for secret-shaped strings before every commit.
- Never run `git push --force` to a shared branch unless every reviewer agrees.
- Never bypass commit hooks with `--no-verify` to ship faster — fix the underlying failure.

## Logging

- Never log API keys, tokens, passwords, or PII.
- Redact sensitive request bodies before writing to disk or shipping to a log service.

## Dependencies

- Ask before adding any new dependency.
- Pin versions for anything that handles auth, crypto, or payments.
- Audit `package.json` after merges for unexpected additions.

## Incident response

If you find an exposed secret:

1. Stop. Do not commit anything else.
2. Rotate the secret at its source (provider dashboard).
3. Remove it from history with `git filter-repo` or BFG Repo-Cleaner.
4. Notify anyone who may have pulled the leak.
