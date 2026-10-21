/* defense-demo.js — home page only.
   A tiny playable version of the 360° Base Defense mode: slimes spawn on every
   side and march at the base. Tap them before they land. Mirrors the real rules:
   the base has a shield (first hit breaks it, second ends the run), waves grow by
   2 slimes, and every 5th wave is a Surge. Decorative: the canvas is aria-hidden
   and nothing here is needed to use the site. */
(() => {
  const wrap = document.getElementById('defenseDemo');
  const canvas = document.getElementById('defenseCanvas');
  if (!wrap || !canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const $ = (id) => document.getElementById(id);
  const hudWave = $('demoWave'), hudScore = $('demoScore'), hudShield = $('demoShield');
  const overlay = $('demoOverlay'), titleEl = $('demoTitle'), subEl = $('demoSub'), btn = $('demoBtn');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Pixel slime sprite (E = eye, H = shine, X = body) ── */
  const SPRITE = [
    '...XXXXX...',
    '..XXXXXXX..',
    '.XHHXXXXXX.',
    '.XHXXXXXXX.',
    'XXXXXXXXXXX',
    'XXEXXXEXXXX',
    'XXEXXXEXXXX',
    'XXXXXXXXXXX',
    'XXXXXXXXXXX',
    '.XXXXXXXXX.',
  ];
  const COLORS = ['#3ecf6e', '#ff5d5d', '#ffd93d', '#5b8cff'];
  const PX = 4;                           // sprite pixel size
  const SW = SPRITE[0].length * PX, SH = SPRITE.length * PX;
  const cache = COLORS.map((c) => {
    const cv = document.createElement('canvas');
    cv.width = SW + 4; cv.height = SH + 4;
    const g = cv.getContext('2d');
    const paint = (ox, oy, body, shine, eye) => SPRITE.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === '.') return;
      g.fillStyle = ch === 'E' ? eye : ch === 'H' ? shine : body;
      g.fillRect(2 + ox + x * PX, 2 + oy + y * PX, PX, PX);
    }));
    [[-2, 0], [2, 0], [0, -2], [0, 2]].forEach(([ox, oy]) => paint(ox, oy, '#0b0e14', '#0b0e14', '#0b0e14'));
    paint(0, 0, c, '#ffffffaa', '#0b0e14');
    return cv;
  });

  /* ── State ── */
  let W = 0, H = 0, dpr = 1, cx = 0, cy = 0;
  let slimes = [], bits = [], rings = [];
  let wave = 1, toSpawn = 0, spawnT = 0, hp = 2, score = 0, invuln = 0, flash = 0;
  let state = 'idle';                      // idle | play | over
  let running = false, last = 0, raf = 0, visible = false, waveBanner = 0;

  const isSurge = (w) => w % 5 === 0;
  const waveSize = (w) => (6 + (w - 1) * 2) * (isSurge(w) ? 1.5 : 1) | 0;
  const spawnGap = (w) => Math.max(0.25, 1.2 - 0.02 * (w - 1)) / (isSurge(w) ? 2 : 1);

  function resize() {
    const r = wrap.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    cx = W / 2; cy = H / 2;
  }

  function hud() {
    hudWave.textContent = (isSurge(wave) ? 'Surge! Wave ' : 'Wave ') + wave;
    hudWave.classList.toggle('surge', isSurge(wave));
    hudScore.textContent = score + ' popped';
    [...hudShield.children].forEach((pip, i) => pip.classList.toggle('on', i < hp));
  }

  function reset() {
    slimes = []; bits = []; rings = [];
    wave = 1; toSpawn = waveSize(1); spawnT = 0.4; hp = 2; score = 0; invuln = 0; flash = 0; waveBanner = 1;
    hud();
  }

  function spawn() {
    const a = Math.random() * Math.PI * 2;
    const ca = Math.abs(Math.cos(a)) || 0.001, sa = Math.abs(Math.sin(a)) || 0.001;
    const dist = Math.min((W / 2 + 24) / ca, (H / 2 + 24) / sa);   // just outside the visible edge
    const speed = (78 + Math.min(wave, 12) * 5) * (isSurge(wave) ? 1.15 : 1) * (0.85 + Math.random() * 0.3);
    slimes.push({
      x: cx + Math.cos(a) * dist, y: cy + Math.sin(a) * dist,
      a, speed, c: Math.random() < 0.7 ? 0 : 1 + (Math.random() * 3 | 0), t: Math.random() * 6,
    });
    toSpawn--;
  }

  function burst(x, y, c) {
    for (let i = 0; i < 9; i++) {
      const a = Math.random() * Math.PI * 2, v = 60 + Math.random() * 110;
      bits.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.45, c: COLORS[c] });
    }
  }

  /* Real rules: the shield absorbs the first hit, the second destroys the base.
     After a hit the base is invulnerable for 1.5 s. */
  function hit() {
    if (invuln > 0) return;
    hp--; flash = hp > 0 ? 0.35 : 0.6; hud();
    if (hp <= 0) end(); else invuln = 1.5;
  }

  function end() {
    state = 'over';
    titleEl.textContent = 'Base down at wave ' + wave;
    subEl.textContent = score + ' slimes popped. The real game saves a checkpoint every 5 waves.';
    btn.textContent = 'Defend again';
    overlay.hidden = false;
    btn.focus({ preventScroll: true });
  }

  function update(dt) {
    if (state !== 'play') return;
    if (invuln > 0) invuln = Math.max(0, invuln - dt);
    if (flash > 0) flash -= dt;
    if (waveBanner > 0) waveBanner -= dt;

    if (toSpawn > 0) {
      spawnT -= dt;
      if (spawnT <= 0) { spawn(); spawnT = spawnGap(wave); }
    } else if (!slimes.length) {
      wave++; toSpawn = waveSize(wave); spawnT = 0.8; waveBanner = 1.4; hud();
    }

    for (let i = slimes.length - 1; i >= 0; i--) {
      const s = slimes[i];
      s.t += dt;
      const dx = cx - s.x, dy = cy - s.y, d = Math.hypot(dx, dy) || 1;
      s.x += (dx / d) * s.speed * dt; s.y += (dy / d) * s.speed * dt;
      if (d < 26) {
        slimes.splice(i, 1);
        burst(s.x, s.y, s.c);
        hit();
        if (state !== 'play') return;
      }
    }
    bits.forEach((b) => { b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt; });
    bits = bits.filter((b) => b.life > 0);
    rings.forEach((r) => { r.r += 160 * dt; r.life -= dt; });
    rings = rings.filter((r) => r.life > 0);
  }

  function drawBase() {
    const blink = invuln > 0 && Math.floor(invuln * 10) % 2 === 0;
    ctx.save(); ctx.translate(cx, cy);
    if (hp === 2 || blink) {               // shield ring (gone once it has broken)
      ctx.strokeStyle = '#3ecf6e';
      ctx.globalAlpha = blink ? 0.3 : 0.9; ctx.lineWidth = 3; ctx.setLineDash([6, 5]);
      ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.globalAlpha = 1;
    const body = flash > 0 || hp === 1 ? '#ff5d5d' : '#3ecf6e';
    ctx.fillStyle = '#0b0e14'; ctx.fillRect(-14, -14, 28, 28);
    ctx.fillStyle = body;       ctx.fillRect(-11, -11, 22, 22);
    ctx.fillStyle = '#0f1117';  ctx.fillRect(-6, -6, 12, 12);
    ctx.fillStyle = '#7dffb0';  ctx.fillRect(-3, -3, 6, 6);
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const maxR = Math.hypot(W, H) / 2;
    ctx.lineWidth = 1;
    for (let r = 70; r < maxR; r += 70) {   // radar rings: the 360° read
      ctx.strokeStyle = 'rgba(62,207,110,0.10)';
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(62,207,110,0.07)';
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();

    slimes.forEach((s) => {
      const bob = Math.sin(s.t * 6) * 2;
      ctx.drawImage(cache[s.c], Math.round(s.x - SW / 2), Math.round(s.y - SH / 2 + bob));
    });
    drawBase();
    bits.forEach((b) => { ctx.globalAlpha = Math.max(0, b.life / 0.45); ctx.fillStyle = b.c; ctx.fillRect(b.x, b.y, 4, 4); });
    ctx.globalAlpha = 1;
    if (flash > 0) { ctx.fillStyle = 'rgba(255,60,60,' + Math.min(0.28, flash) + ')'; ctx.fillRect(0, 0, W, H); }
    if (waveBanner > 0 && state === 'play') {
      ctx.globalAlpha = Math.min(1, waveBanner);
      ctx.font = "28px 'Fredoka One', cursive"; ctx.textAlign = 'center';
      ctx.fillStyle = isSurge(wave) ? '#ff5d5d' : (getComputedStyle(wrap).getPropertyValue('--text').trim() || '#e8f0fe');
      ctx.fillText(isSurge(wave) ? 'SURGE! Wave ' + wave : 'Wave ' + wave, cx, cy - 56);
      ctx.globalAlpha = 1;
    }
  }

  function frame(t) {
    if (!running) return;
    const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
    update(dt); draw();
    raf = requestAnimationFrame(frame);
  }
  function loop(on) {
    if (on && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    if (!on && running) { running = false; cancelAnimationFrame(raf); }
  }

  function pop(clientX, clientY) {
    if (state !== 'play') return;
    const r = canvas.getBoundingClientRect();
    const x = clientX - r.left, y = clientY - r.top;
    let best = -1, bd = 1e9;
    slimes.forEach((s, i) => { const d = Math.hypot(s.x - x, s.y - y); if (d < bd) { bd = d; best = i; } });
    if (best > -1 && bd < 34) {            // generous touch target
      const s = slimes.splice(best, 1)[0];
      burst(s.x, s.y, s.c); score++; hud();
    }
  }
  canvas.addEventListener('pointerdown', (e) => { e.preventDefault(); pop(e.clientX, e.clientY); });

  function start() {
    reset(); state = 'play'; overlay.hidden = true; loop(true);
  }
  btn.addEventListener('click', start);

  /* Pause when off-screen or the tab is hidden, so it never burns battery. */
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (state === 'play') loop(visible && !document.hidden);
    else if (visible) { resize(); draw(); }
  }, { threshold: 0.1 }).observe(wrap);
  document.addEventListener('visibilitychange', () => { if (state === 'play') loop(visible && !document.hidden); });
  addEventListener('resize', () => { resize(); draw(); });

  /* First paint: a calm idle board behind the overlay. Reduced motion: no autoplay, ever. */
  resize(); reset();
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.4, d = 90 + (i % 3) * 38;
    slimes.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, a, speed: 0, c: i % 4 === 3 ? 1 + (i % 3) : 0, t: i });
  }
  draw();
  if (reduceMotion) subEl.textContent = 'Tap or click slimes before they reach the middle. Motion is kept minimal on your device settings.';
})();
