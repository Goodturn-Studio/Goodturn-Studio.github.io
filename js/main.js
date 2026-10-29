/* Comportements généraux du site : langue, projets, formulaire, pion de défilement. */
(function () {
  // Adresse du service d'envoi du formulaire (ex. Formspree : 'https://formspree.io/f/xxxxxxx').
  // Laissez vide tant qu'aucune adresse email n'est configurée.
  const CONTACT_ENDPOINT = '';

  const { t } = window.GT;

  /* ---------- Langue ---------- */

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => window.GT.setLang(btn.dataset.lang));
  });

  /* ---------- Projets ---------- */

  const grid = document.getElementById('projects-grid');
  const lead = document.getElementById('projects-lead');
  const CARD_COLORS = ['var(--coral)', 'var(--teal)', 'var(--lilac)'];

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'text') node.textContent = v;
      else if (k === 'style') node.style.cssText = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach(c => node.appendChild(c));
    return node;
  }

  function renderProjects() {
    const lang = window.GT.getLang();
    const projects = window.GT_PROJECTS || [];
    grid.replaceChildren();

    if (!projects.length) {
      lead.dataset.i18n = 'projects.empty';
      lead.textContent = t('projects.empty');
      CARD_COLORS.forEach(color => {
        const card = el('div', { class: 'flip-card', tabindex: '0', role: 'button', 'aria-label': t('projects.soon') }, [
          el('div', { class: 'flip-inner' }, [
            el('div', { class: 'flip-face flip-front', style: `--card-color:${color}` }, [
              el('span', { class: 'q', text: '?' }),
              el('span', { class: 'label', text: t('projects.soon') })
            ]),
            el('div', { class: 'flip-face flip-back' }, [
              el('h3', { text: t('projects.backTitle') }),
              el('p', { text: t('projects.backText') }),
              el('a', { href: '#contact', class: 'btn btn-primary btn-small', text: t('projects.backCta') })
            ])
          ])
        ]);
        // Sur mobile (pas de survol), on retourne la carte au toucher
        card.addEventListener('click', e => {
          if (e.target.closest('a')) return;
          card.classList.toggle('flipped');
        });
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
        });
        grid.appendChild(card);
      });
      return;
    }

    lead.dataset.i18n = 'projects.lead';
    lead.textContent = t('projects.lead');
    projects.forEach(p => {
      const body = el('div', { class: 'project-body' }, [
        ...(p.status ? [el('span', { class: 'project-status', text: p.status[lang] || p.status.fr })] : []),
        el('h3', { text: p.title }),
        el('p', { text: (p.description && (p.description[lang] || p.description.fr)) || '' }),
        ...(p.link ? [el('a', { class: 'project-link', href: p.link, target: '_blank', rel: 'noopener', text: t('projects.more') + ' →' })] : [])
      ]);
      grid.appendChild(el('article', { class: 'project-card' }, [
        ...(p.image ? [el('img', { src: p.image, alt: p.title, loading: 'lazy' })] : []),
        body
      ]));
    });
  }

  /* ---------- Formulaire de contact ---------- */

  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  let feedbackKey = '';

  function setFeedback(key, kind) {
    feedbackKey = key;
    feedback.textContent = key ? t(key) : '';
    feedback.className = 'form-feedback ' + (kind || '');
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      const ok = input.value.trim() !== '' && (input.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
      input.closest('.field').classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) return setFeedback('contact.invalid', 'err');

    if (!CONTACT_ENDPOINT) return setFeedback('contact.notReady', 'info');

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    setFeedback('contact.sending', 'info');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      setFeedback('contact.ok', 'ok');
    } catch (err) {
      setFeedback('contact.err', 'err');
    } finally {
      button.disabled = false;
    }
  });

  /* ---------- Pion de défilement ---------- */

  const pawn = document.querySelector('.scroll-pawn');
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    pawn.style.setProperty('--progress', max > 0 ? Math.min(1, window.scrollY / max) : 0);
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  /* ---------- Démarrage ---------- */

  document.getElementById('year').textContent = new Date().getFullYear();

  window.GT.onChange(() => {
    renderProjects();
    if (feedbackKey) feedback.textContent = t(feedbackKey);
  });
  window.GT.apply();
  updateProgress();
})();
