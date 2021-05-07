//get elements:
const catagory=document.getElementById("catagory");
const lettersToGuessUL =document.getElementById("letters-to-guess");
const gameOverrOrLiveNumburs =document.getElementById("game-overr-or-live-numburs");
const clue=document.getElementById("clue");
const body = document.querySelector("body");
let hangMan=document.getElementById("hanged-man-picture");

//variables:
let  guessArray=[];
let word;




window.onload = function start()
{ 
async function fetchRndomWords()
{
   let respose=await fetch("https://random-word-api.herokuapp.com/word?number=1");
   console.log(respose);
   let data=await respose.json()
   word = data[0];
   console.log(word[0].length);
   guessTheWordLetters();

// buttons for all letters
   const allLetters= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
   for(i = 0; i < 26; i++) 
  {
    const button = document.createElement("button");
    button.innerHTML = allLetters[i];
    const lettersDiv =  document.getElementById("letters");
    lettersDiv.appendChild(button); 
    for(let j=0 ; j<word.length; j++){
    button.addEventListener("click", function(){
      button.style.opacity="50%";
      if(button.innerHTML == word[j])
      {
        console.log(button.innerHTML+" "+ j);
        guessArray[j]=button.innerHTML;
        console.log(guessArray);
        lettersToGuessUL.innerHTML = "";
        for (let index = 0; index < guessArray.length; index++) {
          const letter = guessArray[index];
          lettersToGuessUL.append(letter);
        }
      }
     
  })

}
}
}
fetchRndomWords();

//place for the word we should guess 
function guessTheWordLetters()
{
    for ( i = 0; i < word.length; i++) {
      const correctWord = document.createElement('li');
      correctWord.setAttribute('id', 'my-word');
      if (word[i] == "-") {
        correctWord.innerHTML = "-";
        space = 1;
      }
     else {
    correctWord.innerHTML = " _ ";
          }
     guessArray.push(correctWord)
     lettersToGuessUL.appendChild(correctWord);
     console.log(correctWord);
   }
   console.log(word);
  //  console.log(guessArray);
}
}


//relod the page to paly again
document.getElementById("play").addEventListener("click",function reloadThePage()
{
  location.reload();
});



//hangman

