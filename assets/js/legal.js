/* legal.js — builds an "On this page" list from the section headings */
(() => {
  const heads = [...document.querySelectorAll('.legal .pcard > h3')];
  if (heads.length < 4) return;
  const list = document.createElement('ol');
  heads.forEach((h) => {
    const label = h.textContent.trim();
    if (!h.id) h.id = label.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id; a.textContent = label;
    li.appendChild(a); list.appendChild(li);
  });
  const nav = document.createElement('nav');
  nav.className = 'toc'; nav.setAttribute('aria-label', 'On this page');
  nav.innerHTML = '<strong>On this page</strong>';
  nav.appendChild(list);
  document.querySelector('.legal-header').after(nav);
})();
