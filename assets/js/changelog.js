/* changelog.js — filter, search and "show more" over server-rendered entries.
   Entries are rendered by Liquid from _data/changelog.json, so the content is
   in the HTML for crawlers and works with JavaScript disabled. */
(() => {
  const entries = [...document.querySelectorAll('.tl-entry')];
  if (!entries.length) return;

  const INITIAL = 4, STEP = 3;
  let limit = INITIAL, filter = 'all', query = '';

  const $ = (id) => document.getElementById(id);
  const moreBtn = $('loadMoreBtn'), noResults = $('noResults'), count = $('updateCount');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const releases = entries.map((entry) => {
    const items = [...entry.querySelectorAll('.cl-item')];
    const header = `${entry.querySelector('.tl-header').textContent} ${entry.querySelector('.build-badges')?.textContent || ''}`.toLowerCase();
    return { entry, items, header, tags: new Set(items.map((item) => item.dataset.tag)) };
  });

  const tagCounts = new Map([['all', 0]]);
  releases.forEach(({ items }) => items.forEach((item) => {
    tagCounts.set('all', tagCounts.get('all') + 1);
    tagCounts.set(item.dataset.tag, (tagCounts.get(item.dataset.tag) || 0) + 1);
  }));
  filterBtns.forEach((btn) => {
    const countEl = btn.querySelector('.filter-count');
    if (countEl) countEl.textContent = ` ${tagCounts.get(btn.dataset.filter) || 0}`;
  });

  function apply() {
    let matchedReleases = 0, matchedNotes = 0;
    releases.forEach(({ entry, items, header, tags }) => {
      const tagOk = filter === 'all' || tags.has(filter);
      const headerMatches = Boolean(query && header.includes(query));
      const visibleItems = items.filter((item) => {
        const itemMatches = (filter === 'all' || item.dataset.tag === filter)
          && (!query || headerMatches || item.textContent.toLowerCase().includes(query));
        item.hidden = !itemMatches;
        return itemMatches;
      });
      const match = tagOk && (!query || headerMatches || visibleItems.length > 0);
      if (match) {
        matchedReleases++;
        matchedNotes += visibleItems.length;
      }
      entry.hidden = !(match && matchedReleases <= limit);
    });
    const shown = Math.min(limit, matchedReleases);
    count.textContent = matchedReleases
      ? `Showing ${shown} of ${matchedReleases} releases · ${matchedNotes} matching notes`
      : '';
    noResults.style.display = matchedReleases ? 'none' : 'block';
    moreBtn.hidden = matchedReleases <= limit;
    moreBtn.textContent = `Show ${Math.min(STEP, matchedReleases - limit)} more releases ↓`;
  }

  filterBtns.forEach((btn) => btn.addEventListener('click', () => {
    filter = btn.dataset.filter; limit = INITIAL;
    filterBtns.forEach((b) => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', b === btn); });
    apply();
  }));
  $('searchInput').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); limit = INITIAL; apply(); });
  moreBtn.addEventListener('click', () => { limit += STEP; apply(); });

  apply();
})();
