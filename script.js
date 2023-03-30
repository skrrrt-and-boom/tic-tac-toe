const board = document.querySelector('#board')
const p = document.querySelectorAll('p')
const results = document.querySelector('#results')
const square = document.querySelectorAll('.kafelek')

let content = [
  ['','',''],
  ['','',''],
  ['','',''],
];

let players = ['X', 'O'];
let computer = players[0];
let human = players[1];
let gaming = true;

function random(upperBound) {
  return Math.floor(Math.random() * upperBound);
}

function end() {
  if (checkWin() !== null) {
    results.textContent = 'Winner: ' + checkWin();
    gaming = false;
  }
}

function setup() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      square[i * 3 + j].addEventListener('click', () => game(i, j))
    }
  }
}

setup()

function equals(a, b, c) {
  return (a===b && b===c && a !== '')
}

function checkWin() {
  let winner = null;

  //    horizontal
  for (let i = 0; i < 3; i++) {
    if (equals(content[i][0], content[i][1], content[i][2])) {
      winner = content[i][0];
    }
  }

  //    vertical
  for (let j = 0; j < 3; j++) {
    if (equals(content[0][j], content[1][j], content[2][j])) {
      winner = content[0][j];
    }
  }

  //    Diagonal
  if (equals(content[0][0], content[1][1], content[2][2])) {
    winner = content[0][0];
  }

  if (equals(content[2][0], content[1][1], content[0][2])) {
    winner = content[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (content[i][j] === '') {
        openSpots++;
      }
    }
  }

  if (winner === null && openSpots === 0) {
    return 'Tie';
  } else {
    return winner;
  }
}

function Move() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (content[i][j] === '') {
        content[i][j] = computer;
        let score = minimax(content, 0, false);
        content[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = {i, j};
        }
      }
    }
  }
  content[bestMove.i][bestMove.j] = computer;
  draw();
  end();
}

let scores = {
  X: 1,
  O: -1,
  Tie: 0
};

function minimax(content, depth, isMaximizing) {
  let result = checkWin();
  if (result !== null) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (content[i][j] === '') {
          content[i][j] = computer;
          let score = minimax(content, depth + 1, false);
          content[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (content[i][j] === '') {
            content[i][j] = human;
            let score = minimax(content, depth + 1, true);
            content[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
    return bestScore;
  }
}

function draw() {
  let k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let spot = content[i][j];
      p[i * 3 + j].textContent = spot;
    }
  }
}
function game(i, j) {
  if (gaming) {
    content[i][j] = human;
    Move();
  }
}

Move();
