window.onload = function start()
{
  let word;

async function fetchRndomWords()
{
   let respose=await fetch("https://random-word-api.herokuapp.com/word?number=1");
   console.log(respose);
   let data=await respose.json()
   word = data[0];
   console.log(word[0].length);

   guessTheWordLetters();
   const allLetters= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
   for(i = 0; i < 26; i++) 
  {
    const button = document.createElement("button");
    button.innerHTML = allLetters[i];
    const lettersDiv =  document.getElementById("letters");
    lettersDiv.appendChild(button); 
    for(let j=0 ; j<word.length; j++){
    button.addEventListener("click", function(){
      if(button.innerHTML == word[j])
      {
        console.log(button.innerHTML+" "+ j);
      }
    
  })
}
}
}
fetchRndomWords();

let wordd = "fjjjjjjk'";
console.log(wordd.length);

// buttons for all letters




//get elements:
const catagory=document.getElementById("catagory");
const lettersToGuessUL =document.getElementById("letters-to-guess");
const gameOverrOrLiveNumburs =document.getElementById("game-overr-or-live-numburs");
const clue=document.getElementById("clue");
//get buttons
const hint=document.getElementById("hint");
const playAgain=document.getElementById("paly");
const body = document.querySelector("body");
//variables:

let  guessArray=[];




//place for the word we should guess 
//not sure if it works 
function guessTheWordLetters()
{
    for ( i = 0; i < word.length; i++) {
      let  correctWord = document.createElement('li');
      correctWord.setAttribute('id', 'my-word');
      if (word[i] == "") {
        correctWord.innerHTML = " _ ";
      }
     else {
    correctWord.innerHTML = " _ ";
          }
     
     lettersToGuessUL.appendChild(correctWord);
     
     console.log(correctWord);
   }
   console.log(word);
    
}
 
}


