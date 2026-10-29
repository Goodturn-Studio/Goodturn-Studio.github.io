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

**Formulaire de contact** : les messages sont envoyés à contact@goodturnstudio.fr via [FormSubmit](https://formsubmit.co) (gratuit, sans compte). L'adresse de réception se règle dans `CONTACT_ENDPOINT` en haut de `js/main.js`. Lors du tout premier envoi, FormSubmit envoie un email d'activation à cette adresse : il faut cliquer sur le lien pour que les messages suivants arrivent.

**Après une modification du CSS ou du JS** : augmentez le numéro `?v=` dans `index.html` pour que les visiteurs ne gardent pas l'ancienne version en cache.

**Modifier un texte** : changez-le dans `js/i18n.js`, pour les deux langues.

## Mise en ligne

Le site est hébergé sur GitHub Pages et publié sur https://www.goodturnstudio.fr (goodturnstudio.fr redirige vers www). Chaque `git push` sur `main` le met à jour en une minute environ. Le fichier `CNAME` contient le nom de domaine : ne le supprimez pas.
