
window.onload = function start()
{

// fetch random words
async function fetchRndomWords()
{
   let respose=await fetch("https://random-word-api.herokuapp.com//all");
   console.log(respose);
   let data=await respose.json()
   console.log(data);
}

// buttons for all letters
const allLetters= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
for(i = 0; i < 26; i++) 
{
    const button = document.createElement("button");
    button.innerHTML = allLetters[i];
    const lettersDiv =  document.getElementById("letters");
    lettersDiv.appendChild(button); 
}


//get elements:
const catagory=document.getElementById("catagory");
const lettersToGuessUL =document.getElementById("letters-to-guess");
const gameOverrOrLiveNumburs =document.getElementById("game-overr-or-live-numburs");
const clue=document.getElementById("clue");
//get buttons
const hint=document.getElementById("hint");
const playAgain=document.getElementById("paly");

//variables:
let word = ['n','o'];
let  guessArray=[];




//place for the word we should guess 
//not sure if it works 
function guessTheWordLetters()
{
    for ( i = 0; i < word.length; i++) {
      const correctWord = document.createElement('li');
      correctWord.setAttribute('id', 'my-word');
      if (word[i] == "-") {
        correctWord.innerHTML = "-";
      }
     else {
    correctWord.innerHTML = "_";
          }
     guessArray.push(correctWord);
     lettersToGuessUL .appendChild(correctWord);
   }
   console.log(word);
   console.log(correctWord);
}














}


