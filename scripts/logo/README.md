# Logo

Generates the Raja Valampuri logo set in `public/brand/`: a crown over a
right-turning (valampuri) conch, with the name set in Cinzel (SIL Open Font
License, see `fonts/OFL.txt`) and converted to outlines.

```sh
python3 -m venv .venv && .venv/bin/pip install fonttools==4.53.1
.venv/bin/python scripts/logo/build.py public/brand
```

PNG versions were rendered from the SVGs with headless Chrome; re-render them
if you change the design.
