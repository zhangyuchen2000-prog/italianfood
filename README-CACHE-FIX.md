# Cache-proof repair

The blank card was caused by the new `index.html` being combined with an older cached or missing JavaScript file.

Upload these new files to the repository root:

- `index.html`
- `styles-r2.css`
- `cards-r2.js`
- `app-r2.js`
- `manifest-r2.json`
- `sw-r2.js`
- `icon.svg`

Keep the existing `images` folder. You do not need to upload the images again if the rebuilt images are already present.

The filenames are deliberately new so an old service worker cannot return the earlier incompatible app files.
