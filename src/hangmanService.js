export default (function hangmanGame() {

  function HangmanGame() {
    this.secretWord = "sonatype";
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
    HangmanGame
  }
}());
