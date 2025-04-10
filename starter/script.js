'use strict';
//selectinsg elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);
let scores, currentScore, activePlayer, playing;

const newgame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
newgame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};
//rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  // generating random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1 if so switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      //switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      //  currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      //  player0El.classList.toggle(`player--active`);
      // player1El.classList.toggle(`player--active`);
    }
  }
});
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1dodaj score aktivnom playeru,2 provjeri je ima 100 za pobjedu ako ima dodaj animacije pobjede , 3 swith
    scores[activePlayer] += currentScore; //scores[1] = scores[1]currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
    }
    switchPlayer();
  }
});
btnNew.addEventListener(`click`, newgame);
