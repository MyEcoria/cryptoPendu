const express = require('express');
const app = express();

// Liste de mots à deviner
const words = ['banane', 'pomme', 'orange', 'cerise', 'kiwi'];

// Choisissez un mot au hasard
const word = words[Math.floor(Math.random() * words.length)];

// Initialisez le compteur de coups restants à 10
let remainingGuesses = 10;

// Initialisez un tableau vide pour stocker les lettres devinées
let guessedLetters = [];

app.use(express.json()); // pour parser les requêtes POST avec un corps JSON
app.use(express.static('public')); // pour servir des fichiers statiques dans le dossier "public"

app.post('/guess', (req, res) => {
  // Récupérez la lettre devinée à partir de la requête
  const letter = req.body.letter;

  // Vérifiez si la lettre a déjà été devinée
  if (guessedLetters.includes(letter)) {
    res.send('Vous avez déjà deviné cette lettre !');
  } else {
    // Ajoutez la lettre aux lettres devinées
    guessedLetters.push(letter);

    // Vérifiez si la lettre se trouve dans le mot
    if (word.includes(letter)) {
      res.send('Bravo, vous avez trouvé une lettre !');
    } else {
      // Décrementez le compteur de coups restants
      remainingGuesses--;

      // Vérifiez si le joueur a perdu
      if (remainingGuesses === 0) {
        res.send('Désolé, vous avez perdu !');
      } else {
        res.send('Désolé, vous n\'avez pas trouvé de lettre');
      }
    }
  }
});

app.listen(4000, () => {
  console.log('Le serveur écoute sur le port 4000 !');
});
