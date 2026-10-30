/* Pages « jouer en ligne » (jeux/<nom>/) : langue, plein écran, année du pied de page.
   Le jeu Unity lui-même tourne dans l'iframe de la page. */
(function () {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => window.GT.setLang(btn.dataset.lang));
  });

  const frame = document.getElementById('play-frame');
  const fsButton = document.getElementById('play-fullscreen');
  const canFullscreen = frame && (frame.requestFullscreen || frame.webkitRequestFullscreen);

  if (fsButton) {
    if (!canFullscreen) {
      fsButton.hidden = true; // iPhone : pas d'API plein écran
    } else {
      fsButton.addEventListener('click', () => {
        (frame.requestFullscreen || frame.webkitRequestFullscreen).call(frame);
        const iframe = frame.querySelector('iframe');
        if (iframe) iframe.focus();
      });
    }
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  window.GT.apply();
})();
