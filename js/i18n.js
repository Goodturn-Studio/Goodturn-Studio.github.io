/* Traductions FR / EN.
   Dans le HTML : data-i18n="clé" (texte), data-i18n-html="clé" (texte avec balises). */
(function () {
  const dict = {
    fr: {
      'meta.title': 'Goodturn Studio, vos jeux de société en jeux vidéo',
      'meta.description': 'Goodturn Studio adapte les jeux de société en jeux vidéo pour PC et mobile.',

      'nav.studio': 'Studio',
      'nav.projects': 'Projets',
      'nav.play': 'Jouer',
      'nav.contact': 'Contact',

      'hero.title': 'Vos jeux de société, <em>en encore mieux</em>.',
      'hero.text': 'Goodturn Studio adapte les jeux de société en jeux vidéo pour PC et mobile : plus beaux, plus simples à prendre en main, avec des IA à affronter et des modes de jeu inédits.',
      'hero.cta2': 'Nous contacter',
      'hero.playLink': 'Jouer à Volte-face',

      'features.title': 'Ce que le numérique apporte à votre jeu',
      'f1.title': 'Plus beau qu’en vrai',
      'f1.text': 'Animations, effets et plateaux vivants : votre univers prend une toute nouvelle dimension.',
      'f2.title': 'Plus facile à jouer',
      'f2.text': 'Pas de mise en place, pas de calculs, pas de règles oubliées : le jeu s’occupe de tout et guide les joueurs.',
      'f3.title': 'Des IA à affronter',
      'f3.text': 'Plusieurs niveaux de difficulté pour jouer seul, apprendre à son rythme ou s’entraîner.',
      'f4.title': 'Des modes inédits',
      'f4.text': 'Défis, campagnes, variantes : de nouvelles façons de jouer, impossibles autour d’une table.',
      'f5.title': 'Sur PC et mobile',
      'f5.text': 'Jouable sur ordinateur, téléphone et tablette, avec une interface pensée pour chaque écran.',

      'projects.title': 'Nos jeux',
      'projects.empty': 'Nos premiers titres sont en préparation. Revenez bientôt… ou proposez-nous le vôtre !',
      'projects.lead': 'Les jeux sur lesquels nous travaillons.',
      'projects.soon': 'Bientôt',
      'projects.backTitle': 'Votre jeu ici ?',
      'projects.backText': 'Vous avez un jeu de société qui mérite sa version numérique ?',
      'projects.backCta': 'Parlons-en',
      'projects.more': 'En savoir plus',

      'game.title': 'Volte-face',
      'game.intro': 'Un petit jeu original conçu par le studio. Retournez les flèches, déclenchez des réactions en chaîne et prenez le contrôle du plateau.',
      'game.new': 'Nouvelle partie',
      'game.rulesTitle': 'Règles',
      'game.rule1': 'À votre tour, choisissez une case neutre ou à vous : sa flèche se retourne et la case devient la vôtre.',
      'game.rule2': 'Sa flèche capture la case visée, puis la flèche de celle-ci, et ainsi de suite. La chaîne s’arrête au bord du plateau ou sur une de vos cases.',
      'game.rule3': 'Après 8 tours chacun, celui qui possède le plus de cases gagne.',
      'game.tip': 'Astuce : survolez une case (ou touchez-la une fois sur mobile) pour voir la chaîne avant de jouer.',
      'game.you': 'Vous',
      'game.ai': 'IA',
      'game.round': 'Tour {n} / {total}',
      'game.yourTurn': 'À vous de jouer !',
      'game.tapAgain': 'Touchez à nouveau pour confirmer.',
      'game.aiThinking': 'L’IA réfléchit…',
      'game.pass': '{p} ne peut pas jouer et passe son tour.',
      'game.win': 'Victoire ! Bien joué 🎉',
      'game.lose': 'Défaite… Une revanche ?',
      'game.draw': 'Égalité parfaite !',
      'game.over': 'Partie terminée',
      'game.cell': 'Case ligne {r}, colonne {c}',

      'contact.title': 'Parlons de votre jeu',
      'contact.text': 'Éditeur, auteur ou simplement curieux ? Écrivez-nous, on vous répond rapidement.',
      'contact.name': 'Nom',
      'contact.email': 'Email',
      'contact.role': 'Vous êtes',
      'contact.rolePublisher': 'Éditeur',
      'contact.roleAuthor': 'Auteur ou autrice',
      'contact.rolePlayer': 'Joueur ou joueuse',
      'contact.roleOther': 'Autre',
      'contact.message': 'Message',
      'contact.send': 'Envoyer',
      'contact.sending': 'Envoi en cours…',
      'contact.invalid': 'Merci de remplir tous les champs avec un email valide.',
      'contact.ok': 'Merci ! Votre message est bien parti, on revient vers vous très vite.',
      'contact.err': 'Oups, l’envoi a échoué. Réessayez dans quelques instants.',
      'contact.notReady': 'Le formulaire n’est pas encore relié à notre boîte mail. Revenez très bientôt !'
    },

    en: {
      'meta.title': 'Goodturn Studio, board games turned into video games',
      'meta.description': 'Goodturn Studio adapts board games into video games for PC and mobile.',

      'nav.studio': 'Studio',
      'nav.projects': 'Projects',
      'nav.play': 'Play',
      'nav.contact': 'Contact',

      'hero.title': 'Your board games, <em>only better</em>.',
      'hero.text': 'Goodturn Studio turns board games into video games for PC and mobile: better looking, easier to pick up, with AI opponents and brand-new game modes.',
      'hero.cta2': 'Get in touch',
      'hero.playLink': 'Play Turnabout',

      'features.title': 'What going digital brings to your game',
      'f1.title': 'Better than the real thing',
      'f1.text': 'Animations, effects and living boards: your world reaches a whole new dimension.',
      'f2.title': 'Easier to play',
      'f2.text': 'No setup, no scoring, no forgotten rules: the game handles everything and guides players.',
      'f3.title': 'AI opponents',
      'f3.text': 'Several difficulty levels to play solo, learn at your own pace or train.',
      'f4.title': 'New game modes',
      'f4.text': 'Challenges, campaigns, variants: new ways to play that are impossible around a table.',
      'f5.title': 'On PC and mobile',
      'f5.text': 'Playable on computer, phone and tablet, with an interface designed for every screen.',

      'projects.title': 'Our games',
      'projects.empty': 'Our first titles are in the works. Come back soon… or pitch us yours!',
      'projects.lead': 'The games we are working on.',
      'projects.soon': 'Coming soon',
      'projects.backTitle': 'Your game here?',
      'projects.backText': 'Got a board game that deserves its digital version?',
      'projects.backCta': 'Let’s talk',
      'projects.more': 'Learn more',

      'game.title': 'Turnabout',
      'game.intro': 'A small original game made by the studio. Flip the arrows, trigger chain reactions and take over the board.',
      'game.new': 'New game',
      'game.rulesTitle': 'Rules',
      'game.rule1': 'On your turn, pick a neutral tile or one of yours: its arrow flips around and the tile becomes yours.',
      'game.rule2': 'Its arrow captures the tile it points at, then that tile’s arrow does the same, and so on. The chain stops at the edge of the board or on one of your tiles.',
      'game.rule3': 'After 8 turns each, whoever owns the most tiles wins.',
      'game.tip': 'Tip: hover a tile (or tap it once on mobile) to preview the chain before playing.',
      'game.you': 'You',
      'game.ai': 'AI',
      'game.round': 'Turn {n} / {total}',
      'game.yourTurn': 'Your turn!',
      'game.tapAgain': 'Tap again to confirm.',
      'game.aiThinking': 'The AI is thinking…',
      'game.pass': '{p} has no move and passes.',
      'game.win': 'You win! Well played 🎉',
      'game.lose': 'You lose… Rematch?',
      'game.draw': 'It’s a perfect tie!',
      'game.over': 'Game over',
      'game.cell': 'Tile row {r}, column {c}',

      'contact.title': 'Let’s talk about your game',
      'contact.text': 'Publisher, designer or just curious? Drop us a line, we’ll get back to you quickly.',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.role': 'You are',
      'contact.rolePublisher': 'A publisher',
      'contact.roleAuthor': 'A game designer',
      'contact.rolePlayer': 'A player',
      'contact.roleOther': 'Other',
      'contact.message': 'Message',
      'contact.send': 'Send',
      'contact.sending': 'Sending…',
      'contact.invalid': 'Please fill in every field with a valid email.',
      'contact.ok': 'Thanks! Your message is on its way, we’ll get back to you soon.',
      'contact.err': 'Oops, sending failed. Please try again in a moment.',
      'contact.notReady': 'The form isn’t connected to our inbox yet. Come back very soon!'
    }
  };

  const listeners = [];
  let lang = detect();

  function detect() {
    try {
      const saved = localStorage.getItem('gt-lang');
      if (saved && dict[saved]) return saved;
    } catch (e) { /* stockage indisponible */ }
    return (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }

  function t(key, vars) {
    let s = dict[lang][key] ?? dict.fr[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
    return s;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = t('meta.description');

    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    listeners.forEach(fn => fn(lang));
  }

  function setLang(next) {
    if (!dict[next] || next === lang) return;
    lang = next;
    try { localStorage.setItem('gt-lang', lang); } catch (e) { /* stockage indisponible */ }
    apply();
  }

  window.GT = {
    t,
    apply,
    setLang,
    getLang: () => lang,
    onChange: fn => listeners.push(fn)
  };
})();
