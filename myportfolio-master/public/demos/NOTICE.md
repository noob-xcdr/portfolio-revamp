# Third-party demos

Everything under `/demos` is third-party open-source software, served unmodified except
for the changes listed below. Each was code-audited before inclusion (no `eval`,
`new Function`, WebSocket/XHR/beacon calls, cookies or storage access in the shipped
code, no remote-script loading) and is pinned to the exact commit shown, so what runs
here cannot change when the upstream author pushes new code.

| Demo | Upstream | Pinned commit | Licence |
|---|---|---|---|
| `fly-brain/` | https://github.com/Lulzx/fly-brain | `ba0b4f815c00e81a2ef1f36165df2b1891e5e39c` | MIT |
| `three-quake/` | https://github.com/mrdoob/three-quake | `6d6177b11f81f390d8e527dd5dd738d981eb13fa` | GPL-2.0 (code); id Software shareware `pak0.pak` |
| `claude-of-duty/` | https://github.com/mshumer/Claude-of-Duty | `d9b237b75c9304ab8d9ef4cfa0c3568c7c11a853` | MIT |

## Attribution

- **fly-brain**: connectome data is the Male CNS v1.0 (Janelia FlyEM and Google
  Research, CC BY 4.0, https://male-cns.janelia.org). Body model: flybody (Apache-2.0).
  Eye model: flyvis (MIT). Physics: MuJoCo WebAssembly (Google DeepMind, Apache-2.0).
  Full credits: https://github.com/Lulzx/fly-brain/blob/main/docs/guide/sources.md
- **three-quake**: Quake by id Software; Three.js port by mrdoob. The game source is
  the unminified JavaScript in `three-quake/src`, so the GPL source is shipped with the
  game. It is a separate program embedded in an iframe and does not change the licence
  of the rest of this site. Three.js 0.183.0 (MIT) is vendored in `three-quake/vendor`.
- **claude-of-duty**: by mshumer; MIT. Its in-game menu uses its own working title.

## Modifications

- `fly-brain/arena.html`: removed the `coi-serviceworker.js` shim (the host sends real
  COOP/COEP headers instead) and pointed two links at the upstream site.
  Built with `BASE_PATH=/demos/fly-brain/ vite build`; only the 34 files the arena
  requests are included.
- `three-quake/index.html`: import map points at the vendored Three.js instead of a CDN.
  `maps/`, `server/` and `tests/` were not copied.
- `claude-of-duty/`: built with `vite build --base /demos/claude-of-duty/`; sourcemap
  and its reference removed.
