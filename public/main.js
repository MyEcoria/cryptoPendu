const displayedWordEl = document.getElementById('displayed-word');
const remainingGuessesEl = document.getElementById('remaining-guesses');

document.getElementById('guess-form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Récupérez la lettre devinée à partir du formulaire
  const letter = document.getElementById('letter').value;

  // Envoyez une requête POST à la route '/guess' avec la lettre devinée
  fetch('/guess', {
    method: 'POST',
    body: JSON.stringify({ letter }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.text())
    .then((result) => {
      // Affichez le résultat de la requête
      alert(result);

      // Mettez à jour l'affichage du mot à deviner et du nombre de coups restants
      displayedWordEl.textContent = `Mot à deviner : ${displayedWord}`;
      remainingGuessesEl.textContent = `Coups restants : ${remainingGuesses}`;

      // Si le mot entier a été deviné, affichez une alerte de réussite
      if (displayedWord === word) {
        alert('Félicitations, vous avez trouvé le mot !');
      }
    });
});
