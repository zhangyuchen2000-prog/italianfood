# Single-file cache repair

This version embeds the complete card database and app logic directly inside `index.html`.

That means the page no longer depends on `app-r2.js`, `cards-r2.js`, or a service worker. It also unregisters previous service workers and removes their caches when opened.

Upload and replace:

- `index.html`
- `styles-r2.css`
- `manifest-r2.json`
- `icon.svg`
- the complete `images` folder

Old JavaScript and service-worker files may be deleted.
