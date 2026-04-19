/**
 * OsteoVirtual · Visualizador Interactivo v2
 *
 * Lógica de filtrado:
 *   - Dentro de una misma categoría → OR  (region: piernas OR brazos)
 *   - Entre categorías distintas    → AND (region: X  AND  patologia: Y)
 *
 * Cada filtro ahora es un Set en lugar de un valor único.
 */

/* ══════════════════════════════════════════════════
   ESTADO GLOBAL
══════════════════════════════════════════════════ */
const state = {
  view: 'anatomia',
  filters: {
    region:    new Set(),   // OR entre valores seleccionados
    patologia: new Set(),   // OR entre valores seleccionados
    sexo:      new Set(),   // OR entre valores seleccionados
    epoca:     new Set(),   // OR entre valores seleccionados
    query:     ''
  }
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
  renderView();
  renderResults();
  updateActiveFiltersBar();
});

/* ══════════════════════════════════════════════════
   DEEP LINKING
══════════════════════════════════════════════════ */
function readURLParams() {
  const params = new URLSearchParams(window.location.search);

  const v = params.get('view');
  state.view = (v === 'patologia') ? 'patologia' : 'anatomia';

  // ?region=pelvis  — puede llegar como valor único desde la landing
  const r = params.get('region');
  if (r && VOCABULARIO.region[r]) state.filters.region.add(r);
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
    highlightSkeletonRegions(state.filters.region);
  } else {
    paneB.classList.add('is-visible');
    paneA.classList.remove('is-visible');
    updateViewBtns();
    renderPatologyGrid();
  }
}

/* ══════════════════════════════════════════════════
   SKELETON SVG — multi-select
══════════════════════════════════════════════════ */
function bindSkeletonSVG() {
  document.querySelectorAll('[data-region]').forEach(el => {
    el.addEventListener('click', () => {
      const r = el.dataset.region;
      // Toggle: si ya está en el Set lo quita, si no lo añade
      if (state.filters.region.has(r)) {
        state.filters.region.delete(r);
      } else {
        state.filters.region.add(r);
      }
      highlightSkeletonRegions(state.filters.region);
      syncFilterUI();
      renderResults();
      updateActiveFiltersBar();
    });

    el.addEventListener('mouseenter', e =>
      showSVGTooltip(e, VOCABULARIO.region[el.dataset.region]?.label));
    el.addEventListener('mouseleave', hideSVGTooltip);
  });
}

/**
 * Resalta TODAS las regiones activas (Set) y atenúa el resto.
 * Si el set está vacío, todas las regiones vuelven a su estado normal.
 */
function highlightSkeletonRegions(regionSet) {
  const hasActive = regionSet.size > 0;
  document.querySelectorAll('[data-region]').forEach(el => {
    const key = el.dataset.region;
    const active = regionSet.has(key);
    el.classList.toggle('region--active', active);
    el.classList.toggle('region--dim',    hasActive && !active);
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
   GRID DE PATOLOGÍAS (Vista B) — multi-select
══════════════════════════════════════════════════ */
function renderPatologyGrid() {
  const grid = document.getElementById('patology-grid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.entries(VOCABULARIO.patologia).forEach(([key, meta]) => {
    const count = PIEZAS.filter(p => p.patologia === key).length;
    const isActive = state.filters.patologia.has(key);

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
      if (state.filters.patologia.has(key)) {
        state.filters.patologia.delete(key);
      } else {
        state.filters.patologia.add(key);
      }
      renderPatologyGrid();
      syncFilterUI();
      renderResults();
      updateActiveFiltersBar();
    });
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════
   PANEL DE FILTROS LATERALES — multi-select
══════════════════════════════════════════════════ */
function bindFilters() {
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('change', () => {
      const cat = el.dataset.filter;
      const val = el.value;
      if (el.checked) {
        state.filters[cat].add(val);
      } else {
        state.filters[cat].delete(val);
      }
      renderResults();
      updateActiveFiltersBar();
      if (cat === 'region') highlightSkeletonRegions(state.filters.region);
      if (cat === 'patologia' && state.view === 'patologia') renderPatologyGrid();
    });
  });
}

/**
 * Sincroniza los checkboxes del DOM con el estado actual de los Sets.
 * Se llama tras cambios desde el SVG o desde los tags de las cards.
 */
function syncFilterUI() {
  ['region', 'patologia', 'sexo', 'epoca'].forEach(cat => {
    document.querySelectorAll(`[data-filter="${cat}"]`).forEach(el => {
      el.checked = state.filters[cat].has(el.value);
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
   LÓGICA DE FILTRADO
   OR dentro de cada categoría, AND entre categorías
══════════════════════════════════════════════════ */
function getFilteredPieces() {
  const { region, patologia, sexo, epoca, query } = state.filters;

  return PIEZAS.filter(p => {
    // Cada categoría: si el Set tiene valores, la pieza debe estar en alguno (OR)
    if (region.size    > 0 && !region.has(p.region))       return false;
    if (patologia.size > 0 && !patologia.has(p.patologia))  return false;
    if (sexo.size      > 0 && !sexo.has(p.sexo))            return false;
    if (epoca.size     > 0 && !epoca.has(p.epoca))          return false;

    if (query) {
      const hay = `${p.id} ${p.nombre} ${p.descripcion} ${p.yacimiento}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });
}

/* ══════════════════════════════════════════════════
   RENDER RESULTADOS
══════════════════════════════════════════════════ */
function renderResults() {
  const container = document.getElementById('results-list');
  const countEl   = document.getElementById('results-count');
  if (!container) return;

  const results = getFilteredPieces();
  if (countEl) countEl.textContent = `${results.length} pieza${results.length !== 1 ? 's' : ''}`;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="results-empty">
        <span class="results-empty__icon">🔍</span>
        <p>Sin resultados para esta combinación.</p>
        <button class="btn-clear-all" onclick="clearAllFilters()">Limpiar filtros</button>
      </div>`;
    return;
  }

  container.innerHTML = '';
  results.forEach((pieza, i) => container.appendChild(buildResultCard(pieza, i)));
}

function buildResultCard(pieza, index) {
  const regMeta  = VOCABULARIO.region[pieza.region];
  const patMeta  = VOCABULARIO.patologia[pieza.patologia];
  const sexMeta  = VOCABULARIO.sexo[pieza.sexo];
  const epocMeta = VOCABULARIO.epoca[pieza.epoca];

  const card = document.createElement('article');
  card.className = 'result-card';
  card.style.animationDelay = `${index * 0.055}s`;
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
        <span class="result-tag result-tag--region" data-clickable data-filter-type="region" data-filter-val="${pieza.region}">
          ${regMeta.icon} ${regMeta.label}
        </span>
        <span class="result-tag result-tag--patol" style="--tag-color:${patMeta.color}" data-clickable data-filter-type="patologia" data-filter-val="${pieza.patologia}">
          ${patMeta.icon} ${patMeta.label}
        </span>
        <span class="result-tag result-tag--sexo">
          ${sexMeta.icon} ${sexMeta.label}
        </span>
      </div>
      <a href="${pieza.ficha}" class="result-card__link">
        Ver ficha <span aria-hidden="true">→</span>
      </a>
    </div>
  `;

  // Click en tag dentro de la card = toggle en el Set correspondiente
  card.querySelectorAll('[data-clickable]').forEach(tag => {
    tag.addEventListener('click', () => {
      const cat = tag.dataset.filterType;
      const val = tag.dataset.filterVal;
      if (state.filters[cat].has(val)) {
        state.filters[cat].delete(val);
      } else {
        state.filters[cat].add(val);
      }
      syncFilterUI();
      renderResults();
      updateActiveFiltersBar();
      if (cat === 'region') highlightSkeletonRegions(state.filters.region);
      if (cat === 'patologia' && state.view === 'patologia') renderPatologyGrid();
    });
  });

  return card;
}

/* ══════════════════════════════════════════════════
   BARRA DE FILTROS ACTIVOS — un chip por valor
══════════════════════════════════════════════════ */
function updateActiveFiltersBar() {
  const bar = document.getElementById('active-filters-bar');
  if (!bar) return;

  const chips = [];

  state.filters.region.forEach(v =>
    chips.push({ cat: 'region', val: v, label: VOCABULARIO.region[v].label, icon: VOCABULARIO.region[v].icon }));

  state.filters.patologia.forEach(v =>
    chips.push({ cat: 'patologia', val: v, label: VOCABULARIO.patologia[v].label, icon: VOCABULARIO.patologia[v].icon }));

  state.filters.sexo.forEach(v =>
    chips.push({ cat: 'sexo', val: v, label: VOCABULARIO.sexo[v].label, icon: VOCABULARIO.sexo[v].icon }));

  state.filters.epoca.forEach(v =>
    chips.push({ cat: 'epoca', val: v, label: VOCABULARIO.epoca[v].label, icon: '📅' }));

  if (state.filters.query)
    chips.push({ cat: 'query', val: '', label: `"${state.filters.query}"`, icon: '🔍' });

  bar.innerHTML = '';

  if (chips.length === 0) {
    bar.innerHTML = '<span class="active-filter-hint">Sin filtros · mostrando todo</span>';
    return;
  }

  chips.forEach(chip => {
    const el = document.createElement('button');
    el.className = 'active-filter-chip';
    el.innerHTML = `${chip.icon} ${chip.label} <span class="chip-x">×</span>`;
    el.title = `Quitar "${chip.label}"`;
    el.addEventListener('click', () => {
      if (chip.cat === 'query') {
        state.filters.query = '';
        const inp = document.getElementById('search-input');
        const inpM = document.getElementById('search-input-mob');
        if (inp)  inp.value  = '';
        if (inpM) inpM.value = '';
      } else {
        state.filters[chip.cat].delete(chip.val);
      }
      syncFilterUI();
      renderResults();
      updateActiveFiltersBar();
      if (chip.cat === 'region') highlightSkeletonRegions(state.filters.region);
      if (chip.cat === 'patologia' && state.view === 'patologia') renderPatologyGrid();
    });
    bar.appendChild(el);
  });

  // Botón limpiar todo — solo si hay algo activo
  const clearBtn = document.createElement('button');
  clearBtn.className = 'active-filter-chip active-filter-chip--clear';
  clearBtn.textContent = 'Limpiar todo';
  clearBtn.addEventListener('click', clearAllFilters);
  bar.appendChild(clearBtn);
}

/* ══════════════════════════════════════════════════
   RESET
══════════════════════════════════════════════════ */
function clearAllFilters() {
  state.filters.region    = new Set();
  state.filters.patologia = new Set();
  state.filters.sexo      = new Set();
  state.filters.epoca     = new Set();
  state.filters.query     = '';

  syncFilterUI();
  highlightSkeletonRegions(new Set());

  const inp  = document.getElementById('search-input');
  const inpM = document.getElementById('search-input-mob');
  if (inp)  inp.value  = '';
  if (inpM) inpM.value = '';

  renderResults();
  updateActiveFiltersBar();
  if (state.view === 'patologia') renderPatologyGrid();
}

/**
 * clearFilterCat(cat) — limpia UNA categoría.
 * Llamado desde los botones "Quitar filtro" de cada sección.
 */
function clearFilterCat(cat) {
  state.filters[cat] = new Set();
  syncFilterUI();
  if (cat === 'region') highlightSkeletonRegions(new Set());
  if (cat === 'patologia' && state.view === 'patologia') renderPatologyGrid();
  renderResults();
  updateActiveFiltersBar();
}