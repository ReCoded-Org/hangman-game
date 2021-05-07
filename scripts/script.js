const buttons = document.getElementById("buttons");
const hold = document.getElementById("hold");
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
const myLive = document.getElementById("mylives");
const playAgain = document.getElementById("reset");
const stickman = document.getElementById("stickman");
const context = stickman.getContext("2d");
const hint = document.getElementById("hint");
const remainedHint = document.getElementById("hints");
let lives = 10;
let gameFinished = false;
let hintsAvailable = 3;
let guess = [];

context.strokeStyle = "#fff";
context.lineWidth = 2;

const draw = (fromX, fromY, toX, toY) => {
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
};

const head = () => {
  context.arc(85, 40, 10, 0, Math.PI * 2, true);
  context.stroke();
};

const floor = () => draw(10, 150, 300, 150);
const post1 = () => draw(10, 0, 10, 150);
const post2 = () => draw(0, 0, 100, 0);
const rope = () => draw(85, 0, 85, 30);
const body = () => draw(85, 50, 85, 100);
const leftArm = () => draw(85, 65, 65, 75);
const rightArm = () => draw(85, 65, 105, 75);
const leftLeg = () => draw(85, 100, 65, 125);
const rightLeg = () => draw(85, 100, 105, 125);

const drawing = [
  floor,
  post1,
  post2,
  rope,
  head,
  body,
  leftArm,
  rightArm,
  leftLeg,
  rightLeg,
];

const hintsRemained = (hintsAvailable) => {
  remainedHint.innerText = `${hintsAvailable} hints remained`;
};

const showHint = (word) => {
  if (hintsAvailable > 0) {
    let hintShown = false;

    while (!hintShown) {
      let randomPosition = Math.abs(
        word.length - 1 - Math.floor(Math.random() * (word.length + 1))
      );
      word.forEach((letter) => {
        if (letter?.hidden && letter?.value === word[randomPosition]?.value) {
          letter.hidden = false;
          hintShown = true;
          hintsAvailable--;
          const letters = document.getElementsByClassName("alphabet");
          hintsRemained(hintsAvailable);

          for (let i = 0; i < letters.length; i++) {
            if (letters[i].innerText === letter.value)
              letters[i].setAttribute("disabled", true);
          }
        }
      });
    }
  } else {
    hint.setAttribute("disabled", true);
  }

  gameState(lives, word);
  showLetters(word);
};

const gameState = (lives, word) => {
  const lost = () => {
    myLive.innerText = `You Lost`;
    gameFinished = true;
  };

  const win = () => {
    myLive.innerText = `You Win!`;
    gameFinished = true;
  };

  myLive.innerText = `Your live is ${lives}`;
  if (lives <= 0) lost();

  let won = true;

  word?.forEach((letter) => {
    if (letter.hidden) won = false;
  });

  if (word && won) win();
};

gameState(lives);

buttons.innerHTML = "Loading...";

const lettersFound = [];

const showLetters = (word) => {
  guess = word;
  hold.innerHTML = "";

  word.forEach((letter) => {
    const hiddenLetter = document.createElement("span");
    hiddenLetter.classList.add("hiddenLetter");
    if (letter.hidden) {
      hiddenLetter.innerText = "_";
    } else hiddenLetter.innerText = letter.value;
    hold.append(hiddenLetter);
  });
};

const alphabetHandler = (alphabet, word, alphabetButton, randomWord) => {
  if (!gameFinished) {
    alphabetButton.setAttribute("disabled", true);

    word.forEach((letter) => {
      if (letter.value === alphabet) letter.hidden = false;
    });

    if (!randomWord.split("").includes(alphabet)) {
      lives--;
      drawing[drawing.length - 1 - lives]();
    }

    gameState(lives, word);
    showLetters(word);
  }
};

const createWord = (randomWord) => {
  const word = [];

  randomWord.split("").forEach((char, i) => {
    word.push({ value: char, position: i, hidden: true });
  });

  return word;
};

const renderAlphabets = (word, randomWord) => {
  buttons.innerHTML = "";
  alphabets.forEach((char, i) => {
    const alphabet = document.createElement("button");
    alphabet.innerText = char;
    alphabet.setAttribute("id", `alphabet${i}`);
    alphabet.classList.add("alphabet");

    alphabet.onclick = () => alphabetHandler(char, word, alphabet, randomWord);
    hint.onclick = () => showHint(word);

    buttons.append(alphabet);
  });
  showLetters(word);
};

const reset = () => {
  lives = 10;
  gameState(lives);
  gameFinished = false;
};

const play = () => {
  fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then((w) => w.json())
    .then((randomWord) => {
      buttons.innerHTML = "";
      renderAlphabets(createWord(randomWord[0]), randomWord[0]);
      reset();
      hintsAvailable = Math.floor(randomWord[0].length / 3);
      hintsRemained(hintsAvailable);
    })

    .catch((e) => e);
};

play();

playAgain.onclick = () => play();
