const buttons = document.getElementById("buttons");
const hold = document.getElementById("hold");
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
const myLive = document.getElementById("mylives");
const playAgain = document.getElementById("reset");
let lives = 10;
let gameFinished = false;

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
  hold.innerHTML = "";

  console.log(word);
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

    if (!randomWord.split("").includes(alphabet)) lives--;

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
  alphabets.forEach((char, i) => {
    const alphabet = document.createElement("button");
    alphabet.innerText = char;
    alphabet.setAttribute("id", `alphabet${i}`);
    alphabet.classList.add("alphabet");

    alphabet.onclick = () => alphabetHandler(char, word, alphabet, randomWord);

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
    })
    .catch((e) => e);
};

play();

playAgain.onclick = () => play();
