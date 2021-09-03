export default (function hangmanGame() {

  const pokemonNames = [];

  function init() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then(response => response.json())
        .then(json => {
          pokemonNames.push(
              ...json['results'].flatMap(pokemon => pokemon.name)
          );
        });
  }

  function HangmanGame() {
    this.secretWord = pokemonNames[Math.floor(Math.random() * 100)];
    this.attempts = [];
    this.unsuccessfulAttemptCount = 0;
    this.attempt = function(letter) {
      if (!this.attempts.includes(letter)) {
        this.attempts.push(letter);
        if (![...this.secretWord].includes(letter)) {
          this.unsuccessfulAttemptCount++;
        }
      }
    }
    this.allLettersGuessed = function() {
      return [...this.secretWord].every(secretLetter => this.attempts.includes(secretLetter));
    };
    this.isNoMoreAttemptsRemaining = function() {
      return this.unsuccessfulAttemptCount === 10;
    }
  }

  return {
    HangmanGame,
    init
  }
}());
