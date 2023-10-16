
# Feplafu
## Jeu à boire sur mobile et navigateur

Fépalfu, c’est un jeu étudiant bientôt disponible sur mobile et navigateur. Un dé, deux choix et du fun !

Féplafu sera disponible dans sa version web au mois d’octobre 2023 et courant fin d’année 2023 pour sa version mobile.

Je réalise le projet de A à Z de la maquette au code en passant par la mise en production avec Figma et Angular.

Je pense faire l'application mobile avec Flutter, React Native ou en faire une PWA.

Voir http://www.chaouchi.dev/#fepalfu


## Specification

Feplafu est un jeu à boire en tour par tour. Les utilisateurs insrivent leur snoms dans une liste de joueurs. Ensuite le jeu commence. Chaque tour se résout de la même manière : le premier joueur de la liste commence la partie puis le deuxième et anisi de suite jusqu'à ce que la partie s'achève. La partie s'achève quand le nombre de tours maximum à été atteint. Par défaut le nombre de tours maximum est de 10 mais les joueurs peuvent le changer si il le souhaite avant de commencer la partie.

### Déroulé d'un tour
Un tour de jeu s'articule ainsi :
1) Un nouveau joeur est choisi dans la liste des joeurs. Si c'est le premier tour, le premier joueur inscrit commence.
2) Un nombre de gorgée mise en jeu est défini aléatoirement dans un intervalle de [1;6].
3) Une probabilité de gagné le pari est défini aléatoirement entre [1;6].
    - Si la probabilité est de 1, le joueur boit le nombre de gorgées puis le tour se fini : c'est un echec critique.
    - Si la probabilité est de 6, le joueur distribue le nombre de gorgées à sa convenance aux autres joueurs : c'est un succès critique.
    - Si la probabilité est entre [2,5], le jeu continue.
4) Le joueur à 2 choix, boire les gorgées ou tentez de faire plus que la probabilité. Si le joueur tente on dit qu'il "felefu":
    - en cas d'echec il boit le double de gorgées,
    - en cas de succès il distribut les grogées à sa convenance au autres joueurs.
5) Si le nombre de tour maximum est atteint la partie s'arrête sinon le jeu continue.

### Fin du jeu
Lorsque le jeu se fini un tableau des score est affiché : 

| Nom | Gorgées bues | Gorgées reçues | Gorgées données | Ratio reçus / bues | Succès critique | Echec critique |
| :----:| :------------: | :--------------: | :---------------: | :------------------: | :---------------: | :--------------: |
