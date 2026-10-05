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

  function apply() {
    let matched = 0;
    entries.forEach((entry) => {
      const tagOk = filter === 'all' || entry.dataset.tags.split(' ').includes(filter);
      const textOk = !query || entry.textContent.toLowerCase().includes(query);
      const match = tagOk && textOk;
      if (match) matched++;
      entry.hidden = !(match && matched <= limit);
      entry.querySelectorAll('.cl-item').forEach((item) => {
        const on = filter !== 'all';
        item.classList.toggle('highlight', on && item.dataset.tag === filter);
        item.classList.toggle('faded', on && item.dataset.tag !== filter);
      });
    });
    const shown = Math.min(limit, matched);
    count.textContent = matched ? `Showing ${shown} of ${matched} updates` : '';
    noResults.style.display = matched ? 'none' : 'block';
    moreBtn.hidden = matched <= limit;
    moreBtn.textContent = `Show more (${matched - limit} left) ↓`;
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
