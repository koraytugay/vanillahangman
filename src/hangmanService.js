import words from './words.js';

export default function() {
  this.secretWord = words[Math.floor(Math.random() * words.length)];
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
