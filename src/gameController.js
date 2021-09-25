import HangmanGame from './hangmanService.js';

const allowedLetters = 'abcdefghijklmnopqrstuvwxyz';
let hangmanGame;

document.querySelector("#new-game-button").addEventListener('click', () => {
  hangmanGame = new HangmanGame();
  redraw();
});

document.addEventListener('keydown', function({key}) {
  if ([...allowedLetters].includes(key) && !hangmanGame.isNoMoreAttemptsRemaining()) {
    attemptAndRedraw(key);
  }
});

function attemptAndRedraw(letter) {
  hangmanGame.attempt(letter);
  redraw();
}

function createAttemptButton(letter) {
  const letterButton = document.createElement('button');
  letterButton.classList.add('guess-letter');
  Object.assign(letterButton, {
    textContent: letter,
    disabled: hangmanGame.allLettersGuessed() ||
        hangmanGame.isNoMoreAttemptsRemaining() || hangmanGame.attempts.includes(letter)
  });
  letterButton.addEventListener('click', () => attemptAndRedraw(letter));
  return letterButton;
}

function redraw() {
  // clear current divs
  document.querySelector("#letters-container").innerHTML = "";
  document.querySelector("#secret-word-container").innerHTML = "";

  // create attempt buttons
  [...allowedLetters].forEach(letter => {
    document.querySelector("#letters-container").appendChild(createAttemptButton(letter));
  });

  // put the correct image based on attempt count
  Object.assign(document.querySelector("#hangman-image"), {
    src: hangmanGame.allLettersGuessed() ?
        `resources/images/youwin.png` : `resources/images/${hangmanGame.unsuccessfulAttemptCount}.png`
  });

  // draw the current state of the secret word
  [...hangmanGame.secretWord].forEach(letter => {
        const targetLetterDiv = document.createElement('div');
        Object.assign(targetLetterDiv, {
          textContent: hangmanGame.attempts.includes(letter) || hangmanGame.isNoMoreAttemptsRemaining() ? letter : '_'
        });
        targetLetterDiv.classList.add('target-letter');
        document.querySelector("#secret-word-container").appendChild(targetLetterDiv);
      }
  );
}

hangmanGame = new HangmanGame();
redraw();
