# Third-party games

Everything under `/demos` is third-party open-source software. Each game was code-audited
before inclusion (every external URL, network call, script injection, `eval`, cookie and
storage use, tracker and ad snippet reviewed) and is pinned to the exact upstream commit
below, so what runs here cannot change when the upstream author pushes new code. Only the
files each game actually loads at runtime are included.

| Game | Upstream | Pinned commit | Licence |
|---|---|---|---|
| `mykonos/` | https://github.com/boona13/mykonos-island-voxels | `ca5faee` | MIT (code and art) |
| `hextris/` | https://github.com/Hextris/hextris | `3f4847d` | GPL-3.0 |
| `three-quake/` | https://github.com/mrdoob/three-quake | `6d6177b11f81f390d8e527dd5dd738d981eb13fa` | GPL-2.0 (code); id Software shareware `pak0.pak` |

## Modifications

- `mykonos/`: unmodified. Files copied as the upstream `netlify-build.mjs` would, limited
  to the 84 the game requests at runtime.
- `hextris/` (GPL-3.0 section 5: modified versions, changes listed here):
  1. removed the Google AdSense script (`index.html`);
  2. removed Google Analytics (`index.html` and `js/initialization.js`);
  3. removed a call that sent each game-over score to `http://54.183.184.126/`
     (`js/main.js`, `checkGameOver`);
  4. removed an auto-running block that injected a remote script from
     `http://hextris.io/a.js` into the page (`js/main.js`);
  5. replaced the Google Fonts stylesheet with a self-hosted copy of Exo 2
     (`style/exo2/`, SIL Open Font License 1.1, from `@fontsource/exo-2@5.2.5`);
  6. hid the share buttons, app-store badges and "share my score" button
     (`style/portfolio-overrides.css`) and removed the "buy the ad-free version"
     line from the pause messages (`js/view.js`).
  The game source is the unminified JavaScript in `hextris/js`, so the GPL source ships
  with the game. Not copied: `CNAME`, `README.md`, and the empty decoy `a.js`.
- `three-quake/`: import map points at a vendored Three.js 0.183.0 (MIT, `vendor/`)
  instead of a CDN. `maps/`, `server/` and `tests/` were not copied. The game source is the
  unminified JavaScript in `three-quake/src`. Quake by id Software; port by mrdoob.

Each game is a separate program embedded in an iframe; the GPL licences of Hextris and
three-quake apply to those games only, not to the rest of this site.
