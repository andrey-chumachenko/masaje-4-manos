# Project Git workflow

- Keep commits authored with the repository's configured `ChumDesign` Git identity.
- Before pushing to GitHub, switch the active GitHub CLI account to `andrey-chumachenko` with `gh auth switch --user andrey-chumachenko`.
- Push the requested branch, then restore the default active GitHub CLI account with `gh auth switch --user chumdesign`.
- Do not attempt to push this repository while `chumdesign` is the active GitHub CLI account: that account currently receives HTTP 403 for `andrey-chumachenko/masaje-4-manos`.
