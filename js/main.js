/*
 * Tableau Public visualizations are initialized only after their tab is shown.
 * That gives Tableau a real container width when it sizes the view.
 */
const EMBED_HOST = 'https%3A%2F%2Fpublic.tableau.com%2F';
const EMBED_SCRIPT = 'https://public.tableau.com/javascripts/api/viz_v1.js';

const visualizations = {
  heatmap: {
    id: 'viz1792727910757',
    title: 'Book of Mormon theme heatmap',
    image: 'https://public.tableau.com/static/images/Bo/BoMThemes/Sheet1/1_rss.png',
    params: { name: 'BoMThemes/Sheet1' }
  },
  'one-nephi': {
    id: 'viz1792726215120',
    title: 'Themes in 1 Nephi',
    image: 'https://public.tableau.com/static/images/Bo/BoMThemes/Sheet2/1_rss.png',
    params: { name: 'BoMThemes/Sheet2' }
  },
  'theme-rates': {
    id: 'viz1792727875046',
    title: 'Theme rates across Book of Mormon books',
    image: 'https://public.tableau.com/static/images/FD/FDFCB9KJ6/1_rss.png',
    params: { path: 'shared/FDFCB9KJ6' }
  }
};

function addParam(object, name, value) {
  const param = document.createElement('param');
  param.name = name;
  param.value = value;
  object.append(param);
}

function showEmbedError(frame, view) {
  frame.replaceChildren();
  const message = document.createElement('p');
  message.className = 'viz-error';
  message.textContent = `The ${view.title} visualization did not load. Check your internet connection, then refresh the page. You can also open it on Tableau Public from the chart’s Share link.`;
  frame.append(message);
}

function loadVisualization(key) {
  const view = visualizations[key];
  const frame = document.querySelector(`[data-viz="${key}"]`);
  if (!view || !frame || frame.dataset.loaded === 'true') return;

  frame.dataset.loaded = 'true';
  frame.replaceChildren();

  const placeholder = document.createElement('div');
  placeholder.className = 'tableauPlaceholder';
  placeholder.id = view.id;
  placeholder.style.position = 'relative';
  placeholder.style.width = '100%';

  const width = Math.max(frame.clientWidth, 320);
  const height = Math.max(440, Math.round(width * 0.68));
  placeholder.style.height = `${height}px`;

  const object = document.createElement('object');
  object.className = 'tableauViz';
  object.style.display = 'none';
  object.style.width = '100%';
  object.style.height = `${height}px`;

  addParam(object, 'host_url', EMBED_HOST);
  addParam(object, 'embed_code_version', '3');
  addParam(object, 'site_root', '');
  if (view.params.name) addParam(object, 'name', view.params.name);
  if (view.params.path) addParam(object, 'path', view.params.path);
  addParam(object, 'tabs', 'no');
  addParam(object, 'toolbar', 'yes');
  addParam(object, 'static_image', view.image);
  addParam(object, 'animate_transition', 'yes');
  addParam(object, 'display_static_image', 'yes');
  addParam(object, 'display_spinner', 'yes');
  addParam(object, 'display_overlay', 'yes');
  addParam(object, 'display_count', 'yes');
  addParam(object, 'language', 'en-US');
  addParam(object, 'filter', 'publish=yes');
  placeholder.append(object);
  frame.append(placeholder);

  const script = document.createElement('script');
  script.src = EMBED_SCRIPT;
  script.async = true;
  script.onerror = () => showEmbedError(frame, view);
  object.before(script);
}

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function selectTab(tab) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.id === tab.getAttribute('aria-controls');
    panel.hidden = !isActive;
    if (isActive) loadVisualization(panel.querySelector('[data-viz]').dataset.viz);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    tabs[nextIndex].focus();
    selectTab(tabs[nextIndex]);
  });
});

// Load the first chart on page open. Other charts wait until their tabs are selected.
loadVisualization('heatmap');
