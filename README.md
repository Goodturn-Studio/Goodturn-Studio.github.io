# Site Goodturn Studio

Site statique (HTML, CSS, JavaScript), sans outil de compilation. Ouvrez `index.html` dans un navigateur pour le voir.

## Structure

- `index.html` : la page (accueil, studio, projets, mini-jeu, contact)
- `css/style.css` : styles et palette (variables en haut du fichier)
- `js/i18n.js` : tous les textes en franÃ§ais et en anglais
- `js/projects.js` : la liste des jeux Ã  afficher
- `js/main.js` : langue, projets, formulaire de contact
- `js/game.js` : le mini-jeu *Volte-face / Turnabout* et son IA

## TÃ¢ches courantes

**Ajouter un projet** : copiez le modÃ¨le en commentaire dans `js/projects.js` et mettez les images dans `assets/projects/`.

**Activer le formulaire de contact** : crÃ©ez un formulaire gratuit sur [Formspree](https://formspree.io) avec votre adresse email, puis collez l'URL obtenue dans `CONTACT_ENDPOINT` en haut de `js/main.js`.

**Modifier un texte** : changez-le dans `js/i18n.js`, pour les deux langues.

## Mise en ligne

Le site est hÃ©bergÃ© sur GitHub Pages et publiÃ© sur https://www.goodturnstudio.fr (goodturnstudio.fr redirige vers www). Chaque `git push` sur `main` le met Ã  jour en une minute environ. Le fichier `CNAME` contient le nom de domaine : ne le supprimez pas.
