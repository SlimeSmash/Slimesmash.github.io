/* help.js — search on the Help home page, and an "On this page" list on articles */
(() => {
  /* ── Search ── */
  const input = document.getElementById('helpSearch');
  if (input) {
    const out = document.getElementById('helpResults');
    const browse = document.getElementById('helpBrowse');
    const LABELS = { guides: 'Guide', modes: 'Mode', slimes: 'Slime', pets: 'Pet', faq: 'FAQ' };
    let index;
    const load = () => index || (index = fetch('/help/search.json').then((r) => r.json()).catch(() => []));

    const render = async () => {
      const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      out.replaceChildren();
      browse.hidden = terms.length > 0;
      if (!terms.length) return;

      const hits = (await load())
        .map((d) => {
          const title = d.title.toLowerCase(), rest = (d.summary + ' ' + d.text).toLowerCase();
          let score = 0;
          for (const t of terms) {
            if (title.includes(t)) score += 5;
            else if (rest.includes(t)) score += 1;
            else return null;
          }
          return { d, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);

      if (!hits.length) {
        const li = document.createElement('li');
        li.className = 'no-results';
        li.textContent = 'No results. Try different words, or email us.';
        out.append(li);
        return;
      }
      hits.forEach(({ d }) => {
        const li = document.createElement('li'), a = document.createElement('a');
        const meta = document.createElement('span'), name = document.createElement('span'), sum = document.createElement('span');
        a.href = d.url;
        meta.className = 'result-meta'; meta.textContent = LABELS[d.category] || '';
        name.className = 'entry-name'; name.textContent = d.title;
        sum.className = 'entry-sum'; sum.textContent = d.summary || d.text.slice(0, 110) + '…';
        a.append(meta, name, sum); li.append(a); out.append(li);
      });
    };
    input.addEventListener('input', render);
  }

  /* ── Article table of contents ── */
  const slot = document.getElementById('tocSlot');
  const heads = [...document.querySelectorAll('.article-main .prose > h2')];
  if (slot && heads.length >= 3) {
    const box = document.createElement('nav');
    box.className = 'toc-side'; box.setAttribute('aria-label', 'On this page');
    const list = document.createElement('ul');
    heads.forEach((h) => {
      if (!h.id) h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const li = document.createElement('li'), a = document.createElement('a');
      a.href = '#' + h.id; a.textContent = h.textContent;
      li.append(a); list.append(li);
    });
    box.innerHTML = '<strong>On this page</strong>';
    box.append(list); slot.append(box);
  }
})();
