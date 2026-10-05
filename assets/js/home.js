/* home.js — load the YouTube player only when the visitor asks for it */
(() => {
  const box = document.querySelector('.video');
  if (!box) return;
  box.querySelector('.video-play').addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/videoseries?autoplay=1&list=' + encodeURIComponent(box.dataset.playlist);
    f.title = 'SlimeSmash official videos';
    f.allow = 'autoplay; encrypted-media; picture-in-picture';
    f.allowFullscreen = true;
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    box.replaceChildren(f);
    box.classList.add('playing');
  });
})();