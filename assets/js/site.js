/* site.js — loaded on every page: theme, mobile menu, back-to-top, scrollspy */
(() => {
  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);

  /* Theme (initial value is applied by an inline script in <head> to avoid a flash) */
  const COLORS = { dark: '#0f1117', light: '#f4f7f2' };
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const themeBtn = $('themeBtn');
  const syncTheme = () => {
    const t = root.dataset.theme;
    themeMeta?.setAttribute('content', COLORS[t]);
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };
  syncTheme();
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    syncTheme();
  });

  /* Mobile menu */
  const menuBtn = $('hamburgerBtn'), menu = $('mobileMenu'), overlay = $('mobileOverlay');
  const setMenu = (open) => {
    menuBtn.classList.toggle('active', open);
    menu.classList.toggle('active', open);
    overlay.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', open);
  };
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('active')));
  overlay.addEventListener('click', () => setMenu(false));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* Back to top */
  const toTop = $('backToTop');
  addEventListener('scroll', () => toTop.classList.toggle('visible', scrollY > 500), { passive: true });
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* Scrollspy: highlights nav links whose #section exists on this page (home) */
  const spyLinks = [...document.querySelectorAll('.nav-links a[href*="#"]')]
    .map((a) => ({ a, sec: document.getElementById(new URL(a.href).hash.slice(1)) }))
    .filter((x) => x.sec);
  if (spyLinks.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        spyLinks.forEach(({ a, sec }) => a.classList.toggle('active', sec === en.target));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyLinks.forEach(({ sec }) => io.observe(sec));
  }
})();
