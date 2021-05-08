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
   
   let counter = 0;
   let numberOfLives = 10;
   let numsToWin = 0;
   allLetters.forEach(letter=>{
     const button = document.createElement("button");
    button.innerHTML = letter;
    const lettersDiv =  document.getElementById("letters");
    lettersDiv.appendChild(button); 
    button.addEventListener("click", btnClick)
    function btnClick(){
      let livesh1 = document.querySelector("#game-overr-or-live-numburs");
      
      if(numberOfLives >1){
        
        

        
        
      button.style.opacity="50%";
      if(word.includes(button.innerText))
      {
       let arrOfIndices = [];
       function indices(){
         for(let i=0;i<word.length;i++){
          if (word[i] === button.innerText) arrOfIndices.push(i);

         }
       }
       indices();
       console.log(arrOfIndices);
       for(let i=0;i<=arrOfIndices.length;i++){
        guessArray[arrOfIndices[i]]=button.innerText;
       
        
        

        console.log(guessArray);
        
        let li = document.querySelectorAll("#letters-to-guess li")[arrOfIndices[i]];
        li.innerText = guessArray[arrOfIndices[i]];
       }
       button.disabled = true;
    numsToWin++;
       
      }
      else 
      {
        
         let hangMann =document.querySelectorAll(".hangman-figure")[counter];
         hangMann.style.display = "block";
         counter++;
        numberOfLives--;
        
        livesh1.innerHTML = `you have ${numberOfLives} lives`;
        button.disabled = true;
      }
        
      
    }
    else{
      livesh1.innerHTML = `your have no lives`;
    console.log("Game over");  
    }
  
  }//eventlistner

    
})//for 26
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

