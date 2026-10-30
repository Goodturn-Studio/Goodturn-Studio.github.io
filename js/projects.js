/* Liste des projets affichés dans la section « Nos jeux ».
   Les cartes « Bientôt » s'affichent toujours après les jeux de la liste.

   Pour ajouter un jeu, copiez ce modèle dans la liste :
   {
     title: 'Nom du jeu',
     image: 'assets/projects/mon-jeu.jpg',
     status: { fr: 'En développement', en: 'In development' },
     description: { fr: 'Courte description du jeu.', en: 'Short game description.' },
     link: 'https://store.steampowered.com/...',  // optionnel
     play: 'jeux/mon-jeu/'                          // optionnel : page « jouer en ligne »
   }
   Les textes peuvent aussi être des clés de js/i18n.js (ex. { key: 'pc.status' }).
*/
window.GT_PROJECTS = [
  {
    title: 'Petits Chevaux',
    image: 'assets/projects/petits-chevaux.jpg',
    status: { key: 'pc.status' },
    description: { key: 'pc.description' },
    play: 'jeux/petits-chevaux/'
  }
];
