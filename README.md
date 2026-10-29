# Site Goodturn Studio

Site statique (HTML, CSS, JavaScript), sans outil de compilation. Ouvrez `index.html` dans un navigateur pour le voir.

## Structure

- `index.html` : la page (accueil, studio, projets, mini-jeu, contact)
- `css/style.css` : styles et palette (variables en haut du fichier)
- `js/i18n.js` : tous les textes en français et en anglais
- `js/projects.js` : la liste des jeux à afficher
- `js/main.js` : langue, projets, formulaire de contact
- `js/game.js` : le mini-jeu *Volte-face / Turnabout* et son IA

## Tâches courantes

**Ajouter un projet** : copiez le modèle en commentaire dans `js/projects.js` et mettez les images dans `assets/projects/`.

**Activer le formulaire de contact** : créez un formulaire gratuit sur [Formspree](https://formspree.io) avec votre adresse email, puis collez l'URL obtenue dans `CONTACT_ENDPOINT` en haut de `js/main.js`.

**Modifier un texte** : changez-le dans `js/i18n.js`, pour les deux langues.

## Mise en ligne

Glissez-déposez le dossier sur [Netlify Drop](https://app.netlify.com/drop), ou activez GitHub Pages sur le dépôt. Les deux options sont gratuites.
