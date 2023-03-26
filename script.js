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
let currentPlayer;
let available = [];

function random(available) {
  let x = Math.random() * 10;
  x = Math.floor(x)
  return (Math.floor(available / (x+1)))
}

function setup() {
  currentPlayer = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      available.push([i, j]);
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
      return (results.textContent = winner + ' Wins')
    }
  }

  //    vertical
  for (let j = 0; j < 3; j++) {
    if (equals(content[0][j], content[1][j], content[2][j])) {
      winner = content[0][j];
      return (results.textContent = winner + ' Wins')
    }
  }

  //    Diagonal
  if (equals(content[0][0], content[1][1], content[2][2])) {
    winner = content[0][0];
    return (results.textContent = winner + ' Wins')
  }

  if (equals(content[2][0], content[1][1], content[0][2])) {
    winner = content[2][0];
    return (results.textContent = winner + ' Wins')
  }

  if (winner === null && available.length === 0) {
    return (results.textContent = 'Tie')
  }
}

function nextTurn() {
  let index = Math.floor(random(available.length));
  console.log(index);
  let spot = available.splice(index, 1)[0];
  //if (spot === undefined) {
  //  spot = available.splice(0, 1)[0];
  //}
  content[spot[0]][spot[1]] = computer;
  draw();
  checkWin()
}

function draw() {
  let k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (p[k].textContent === '') {
        square[k].addEventListener('click', () => game(i, j))
      }
      let spot = content[i][j];
      p[k].textContent = spot;
      k++;
    }
  }
}
function game(i, j) {
  content[i][j] = human;
  let sub = [i, j];
  let matchEvery = (available, ind, sub) => available[ind].every((el, i) => el == sub[i]);
  let searchForArray = (available = [], sub = []) => {
    let ind = -1;
    let {
      length: len } = available;
    while (len--) {
      if (available[len].length === sub.length && matchEvery(available, len, sub)){
        ind = len;
        break;
      };
    };
    return ind;
  };
  console.log(searchForArray(available, sub), available);
  available.splice(searchForArray(available, sub), 1);
  nextTurn();
}

nextTurn();
