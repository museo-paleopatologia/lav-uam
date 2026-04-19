/**
 * OsteoVirtual · Visualizador Interactivo
 * Gestiona: deep linking, vistas A/B, filtros combinados, render de resultados
 */

/* ══════════════════════════════════════════════════
   ESTADO GLOBAL
══════════════════════════════════════════════════ */
const state = {
  view: 'anatomia',          // 'anatomia' | 'patologia'
  filters: {
    region: null,
    patologia: null,
    sexo: null,
    epoca: null,
    query: ''
  },
  highlightRegion: null      // región resaltada en el SVG
};

/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  readURLParams();
  bindViewToggle();
  bindFilters();
  bindSearchBox();
  bindSkeletonSVG();
  bindMobilePanel();
  renderView();
  renderResults();
  updateActiveFiltersBar();
});

/* ══════════════════════════════════════════════════
   DEEP LINKING — lee ?view=anatomia | ?view=patologia
══════════════════════════════════════════════════ */
function readURLParams() {
  const params = new URLSearchParams(window.location.search);
  const v = params.get('view');
  if (v === 'patologia') state.view = 'patologia';
  else                   state.view = 'anatomia';

  /* Región preseleccionada por un chip de la landing */
  const r = params.get('region');
  if (r && VOCABULARIO.region[r]) state.filters.region = r;
}

/* ══════════════════════════════════════════════════
   TOGGLE VISTA A / B
══════════════════════════════════════════════════ */
function bindViewToggle() {
  document.querySelectorAll('[data-view-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.view = btn.dataset.viewBtn;
      renderView();
      updateViewBtns();
      renderResults();
    });
  });
}

function updateViewBtns() {
  document.querySelectorAll('[data-view-btn]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.viewBtn === state.view);
  });
}

/* ══════════════════════════════════════════════════
   RENDER VISTA (A = Esqueleto / B = Grid patologías)
══════════════════════════════════════════════════ */
function renderView() {
  const paneA = document.getElementById('view-anatomy');
  const paneB = document.getElementById('view-pathology');

  if (state.view === 'anatomia') {
    paneA.classList.add('is-visible');
    paneB.classList.remove('is-visible');
    updateViewBtns();
    highlightSkeletonRegion(state.filters.region);
  } else {
    paneB.classList.add('is-visible');
    paneA.classList.remove('is-visible');
    updateViewBtns();
    renderPatologyGrid();
  }
}

/* ══════════════════════════════════════════════════
   SKELETON SVG — click en regiones
══════════════════════════════════════════════════ */
function bindSkeletonSVG() {
  document.querySelectorAll('[data-region]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const r = el.dataset.region;
      if (state.filters.region === r) {
        state.filters.region = null; // deselect toggle
      } else {
        state.filters.region = r;
      }
      highlightSkeletonRegion(state.filters.region);
      syncFilterUI();
      renderResults();
      updateActiveFiltersBar();
      /* En móvil, auto-scroll a resultados */
      if (window.innerWidth < 1024) {
        document.getElementById('results-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    /* Hover tooltip */
    el.addEventListener('mouseenter', (e) => showSVGTooltip(e, VOCABULARIO.region[el.dataset.region]?.label));
    el.addEventListener('mouseleave', hideSVGTooltip);
  });
}

function highlightSkeletonRegion(regionKey) {
  document.querySelectorAll('[data-region]').forEach(el => {
    const isActive = el.dataset.region === regionKey;
    el.classList.toggle('region--active', isActive);
    el.classList.toggle('region--dim',    regionKey && !isActive);
  });
}

/* ── SVG Tooltip ── */
let tooltipEl = null;
function showSVGTooltip(e, text) {
  if (!text) return;
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'svg-tooltip';
    document.body.appendChild(tooltipEl);
  }
  tooltipEl.textContent = text;
  tooltipEl.style.opacity = '1';
  moveSVGTooltip(e);
  document.addEventListener('mousemove', moveSVGTooltip);
}
function moveSVGTooltip(e) {
  if (!tooltipEl) return;
  tooltipEl.style.left = (e.clientX + 14) + 'px';
  tooltipEl.style.top  = (e.clientY - 10) + 'px';
}
function hideSVGTooltip() {
  if (tooltipEl) tooltipEl.style.opacity = '0';
  document.removeEventListener('mousemove', moveSVGTooltip);
}

/* ══════════════════════════════════════════════════
   GRID DE PATOLOGÍAS (Vista B)
══════════════════════════════════════════════════ */
function renderPatologyGrid() {
  const grid = document.getElementById('patology-grid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.entries(VOCABULARIO.patologia).forEach(([key, meta]) => {
    const count = PIEZAS.filter(p => p.patologia === key).length;
    const isActive = state.filters.patologia === key;
    const card = document.createElement('button');
    card.className = 'patol-card' + (isActive ? ' is-active' : '');
    card.dataset.patologia = key;
    card.style.setProperty('--patol-color', meta.color);
    card.innerHTML = `
      <span class="patol-card__icon">${meta.icon}</span>
      <span class="patol-card__label">${meta.label}</span>
      <span class="patol-card__count">${count} pieza${count !== 1 ? 's' : ''}</span>
    `;
    card.addEventListener('click', () => {
      state.filters.patologia = (state.filters.patologia === key) ? null : key;
      renderPatologyGrid();
      syncFilterUI();
      renderResults();
      updateActiveFiltersBar();
    });
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════
   PANEL DE FILTROS LATERALES
══════════════════════════════════════════════════ */
function bindFilters() {
  /* Filtros tipo checkbox estilizado */
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('change', () => {
      const cat = el.dataset.filter;
      const val = el.value;
      if (el.type === 'checkbox') {
        state.filters[cat] = el.checked ? val : null;
        /* Deselect siblings */
        if (el.checked) {
          document.querySelectorAll(`[data-filter="${cat}"]`).forEach(s => {
            if (s !== el) s.checked = false;
          });
        }
      }
      renderResults();
      updateActiveFiltersBar();
      if (cat === 'region') highlightSkeletonRegion(state.filters.region);
    });
  });
}

function syncFilterUI() {
  /* Sync checkboxes with state */
  Object.entries(state.filters).forEach(([cat, val]) => {
    document.querySelectorAll(`[data-filter="${cat}"]`).forEach(el => {
      if (el.type === 'checkbox') {
        el.checked = (el.value === val);
      }
    });
  });
}

/* ══════════════════════════════════════════════════
   BUSCADOR
══════════════════════════════════════════════════ */
function bindSearchBox() {
  const input = document.getElementById('search-input');
  if (!input) return;
  input.addEventListener('input', () => {
    state.filters.query = input.value.toLowerCase().trim();
    renderResults();
    updateActiveFiltersBar();
  });
}

/* ══════════════════════════════════════════════════
   LÓGICA DE FILTRADO COMBINADO
══════════════════════════════════════════════════ */
function getFilteredPieces() {
  return PIEZAS.filter(p => {
    const { region, patologia, sexo, epoca, query } = state.filters;
    if (region    && p.region    !== region)    return false;
    if (patologia && p.patologia !== patologia)  return false;
    if (sexo      && p.sexo      !== sexo)       return false;
    if (epoca     && p.epoca     !== epoca)      return false;
    if (query) {
      const haystack = `${p.id} ${p.nombre} ${p.descripcion} ${p.yacimiento}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

/* ══════════════════════════════════════════════════
   RENDER PANEL DE RESULTADOS
══════════════════════════════════════════════════ */
function renderResults() {
  const container = document.getElementById('results-list');
  const countEl   = document.getElementById('results-count');
  if (!container) return;

  const results = getFilteredPieces();
  countEl.textContent = `${results.length} pieza${results.length !== 1 ? 's' : ''}`;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="results-empty">
        <span class="results-empty__icon">🔍</span>
        <p>Sin resultados para esta combinación de filtros.</p>
        <button class="btn-clear-all" onclick="clearAllFilters()">Limpiar filtros</button>
      </div>`;
    return;
  }

  container.innerHTML = '';
  results.forEach((pieza, i) => {
    const card = buildResultCard(pieza, i);
    container.appendChild(card);
  });
}

function buildResultCard(pieza, index) {
  const regMeta  = VOCABULARIO.region[pieza.region];
  const patMeta  = VOCABULARIO.patologia[pieza.patologia];
  const sexMeta  = VOCABULARIO.sexo[pieza.sexo];
  const epocMeta = VOCABULARIO.epoca[pieza.epoca];

  const card = document.createElement('article');
  card.className = 'result-card';
  card.style.animationDelay = `${index * 0.06}s`;
  card.style.setProperty('--accent', patMeta.color);

  card.innerHTML = `
    <div class="result-card__accent-bar"></div>
    <div class="result-card__body">
      <header class="result-card__header">
        <span class="result-card__id">${pieza.id}</span>
        <span class="result-card__epoch">${epocMeta.label}</span>
      </header>
      <h3 class="result-card__title">${pieza.nombre}</h3>
      <p class="result-card__desc">${pieza.descripcion}</p>
      <div class="result-card__meta">
        <span class="result-tag result-tag--region" title="Región" data-clickable data-filter-type="region" data-filter-val="${pieza.region}">
          ${regMeta.icon} ${regMeta.label}
        </span>
        <span class="result-tag result-tag--patol" style="--tag-color:${patMeta.color}" title="Patología" data-clickable data-filter-type="patologia" data-filter-val="${pieza.patologia}">
          ${patMeta.icon} ${patMeta.label}
        </span>
        <span class="result-tag result-tag--sexo" title="Sexo">
          ${sexMeta.icon} ${sexMeta.label}
        </span>
      </div>
      <a href="${pieza.ficha}" class="result-card__link">
        Ver ficha completa <span aria-hidden="true">→</span>
      </a>
    </div>
  `;

  /* Click en tags de la card = aplica filtro */
  card.querySelectorAll('[data-clickable]').forEach(tag => {
    tag.addEventListener('click', () => {
      const cat = tag.dataset.filterType;
      const val = tag.dataset.filterVal;
      state.filters[cat] = (state.filters[cat] === val) ? null : val;
      syncFilterUI();
      renderResults();
      updateActiveFiltersBar();
      if (cat === 'region') highlightSkeletonRegion(state.filters.region);
    });
  });

  return card;
}

/* ══════════════════════════════════════════════════
   BARRA DE FILTROS ACTIVOS
══════════════════════════════════════════════════ */
function updateActiveFiltersBar() {
  const bar = document.getElementById('active-filters-bar');
  if (!bar) return;

  const chips = [];
  const { region, patologia, sexo, epoca, query } = state.filters;

  if (region)    chips.push({ cat: 'region',    label: VOCABULARIO.region[region].label,         icon: VOCABULARIO.region[region].icon });
  if (patologia) chips.push({ cat: 'patologia', label: VOCABULARIO.patologia[patologia].label,   icon: VOCABULARIO.patologia[patologia].icon });
  if (sexo)      chips.push({ cat: 'sexo',      label: VOCABULARIO.sexo[sexo].label,             icon: VOCABULARIO.sexo[sexo].icon });
  if (epoca)     chips.push({ cat: 'epoca',     label: VOCABULARIO.epoca[epoca].label,           icon: '📅' });
  if (query)     chips.push({ cat: 'query',     label: `"${query}"`,                             icon: '🔍' });

  bar.innerHTML = '';

  if (chips.length === 0) {
    bar.innerHTML = '<span class="active-filter-hint">Sin filtros activos · Mostrando todo</span>';
    return;
  }

  chips.forEach(chip => {
    const el = document.createElement('button');
    el.className = 'active-filter-chip';
    el.innerHTML = `${chip.icon} ${chip.label} <span class="chip-x">×</span>`;
    el.addEventListener('click', () => {
      if (chip.cat === 'query') {
        state.filters.query = '';
        document.getElementById('search-input').value = '';
      } else {
        state.filters[chip.cat] = null;
      }
      syncFilterUI();
      renderResults();
      updateActiveFiltersBar();
      if (chip.cat === 'region') highlightSkeletonRegion(null);
    });
    bar.appendChild(el);
  });

  const clearAll = document.createElement('button');
  clearAll.className = 'active-filter-chip active-filter-chip--clear';
  clearAll.textContent = 'Limpiar todo';
  clearAll.addEventListener('click', clearAllFilters);
  bar.appendChild(clearAll);
}

/* ══════════════════════════════════════════════════
   RESET FILTROS
══════════════════════════════════════════════════ */
function clearAllFilters() {
  state.filters = { region: null, patologia: null, sexo: null, epoca: null, query: '' };
  syncFilterUI();
  highlightSkeletonRegion(null);
  const input = document.getElementById('search-input');
  if (input) input.value = '';
  renderResults();
  updateActiveFiltersBar();
  if (state.view === 'patologia') renderPatologyGrid();
}

/* ══════════════════════════════════════════════════
   MOBILE PANEL — paneles flotantes
══════════════════════════════════════════════════ */
function bindMobilePanel() {
  const btnFilters = document.getElementById('mob-btn-filters');
  const btnResults = document.getElementById('mob-btn-results');
  const panelFilters = document.getElementById('filters-panel');
  const panelResults = document.getElementById('results-panel');
  const overlays = document.querySelectorAll('.panel-overlay');

  function openPanel(panel) {
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeAll() {
    panelFilters.classList.remove('is-open');
    panelResults.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (btnFilters) btnFilters.addEventListener('click', () => openPanel(panelFilters));
  if (btnResults) btnResults.addEventListener('click', () => openPanel(panelResults));

  overlays.forEach(o => o.addEventListener('click', closeAll));

  /* Close buttons inside panels */
  document.querySelectorAll('[data-close-panel]').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });
}