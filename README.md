# Many Witnesses, One Christ

A small, no-build website for presenting three interactive Tableau Public views.

## Project files

- `index.html` contains the page content and accessible visualization tabs.
- `css/styles.css` contains the page styling.
- `js/main.js` contains tab behavior and Tableau Public embed setup.

## Run locally in VS Code

1. Open the `bom-tableau-site` folder in VS Code.
2. Install the **Live Server** extension if it is not installed.
3. Open `index.html` and click **Go Live** in the VS Code status bar.
4. The first chart loads on page open. The other charts load when their tabs are selected.

The Tableau charts must be published and viewable on Tableau Public. The embeds use Tableau's generated `viz_v1.js` approach and the view identifiers from the supplied embed codes. The third view uses the supplied shared-view path `shared/FDFCB9KJ6`.

## Editing

- Change chart tab labels, titles, and descriptions in `index.html`.
- Change colors, spacing, and layout in `css/styles.css`.
- Update Tableau view identifiers, images, or embed behavior in `js/main.js`.
- Replace `[your description here]` and `[your name]` with your own writing.
