/*const LETTER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let div1 = document.createElement("div");
div1.className = "alphabet"
let alphabet = function () {
    for (let i = 0; i < LETTER.length; i++) {
        let btn = document.createElement("button")
        btn.className = "button"
        btn.innerHTML = LETTER[i];
        div1.appendChild(btn)
        document.body.append(div1);
    }
}
alphabet()*/
/*const words = {
    FootballTeams: ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
    films: ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
    cities: ["manchester", "milan", "madrid", "amsterdam", "prague"]
}
let allKeys = Object.keys(words);
// console.log(allKeys)
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// console.log(randomPropNumber)
let randomPropName = allKeys[randomPropNumber]
// console.log(randomPropName);
let randomPropValue = words[randomPropName];
// console.log(randomPropValue)
let randomValueNumber = Math.floor(Math.random() * allKeys.length);
let randomValue = randomPropValue[randomValueNumber]
// console.log(randomValue)
// let div2 = document.createElement("div");
// let p = document.createElement("p")
// let span = document.createElement("span")
// let pText = document.createTextNode("The Chosen Category Is");
// span.innerText = randomPropName;
// p.append(span)
// span.append(pText);
// div2.append(p);
// div2.className = "categories"
// document.body.appendChild(div2);
let div2 = document.createElement("div");
div2.className = "show"
let p = document.createElement("p")
let span = document.createElement("span")
div2.append(p)
div2.append(span)
let pText = document.createTextNode("The Chosen Category Is");
p.append(pText);
span.innerText = randomPropName;
document.body.appendChild(div2);*/
/*function randomWord(){
    fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then((response) => response.json())
    .then((data) => word =data[0])
}*/

let word = ''
let wrong = []
let correct = []
let gameOver = false

function getRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(response => response.json())
        .then(data => {
            word = data[0]
            gameOver = false
            wrong = []
            correct = []
            console.log(word)
            displaySecret()
            displayLetters()
            document.getElementById("result").innerHTML = '&nbsp;'
        })
}

function displaySecret() {
    let secret = ''
    for(let i = 0; i < word.length; i++) {
        if(correct.includes(word.charAt(i))) {
            secret += ' ' + word.charAt(i) + ' '
        }
        else {
            secret += ' _ '
        }
    }
    document.getElementById("secret-word").innerHTML = '<h2>' + secret + '</h2>'
    drawCanvas()
}

function displayLetters() {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let letters = ''
    let counter = 0
    alphabet.forEach(ch => {
        let disabled = ''
        counter++
        if(gameOver || wrong.includes(ch) || correct.includes(ch)) {
            disabled = 'disabled'
        }
        letters += "<button onclick='playLetter(" + ch.charCodeAt(0) + ")' "
                + disabled + ">" + ch + "</button> "
        if(counter % 9 == 0) {
            letters += "<br/>"
        }
    })
    document.getElementById("letters").innerHTML = letters
}

function checkWin() {
    if(wrong.length >= 6) {
        gameOver = true
        document.getElementById("result").innerHTML = "<h2>You Lost ...</h2>"
    }
    else {
        for(let i = 1; i < word.length - 1; i++) {
            let ch = word.charAt(i)
            if(!correct.includes(ch)) {
                return
            }
        }
        gameOver = true
        document.getElementById("result").innerHTML = "<h2>You Win!</h2>"
    }
}

function playLetter(ch) {
    let letter = String.fromCharCode(ch)
    if(word.includes(letter)) {
        correct.push(letter)
        console.log(correct)
    }
    else {
        wrong.push(letter)
        console.log(wrong)
    }
    checkWin()
    displaySecret()
    displayLetters()
    drawCanvas()
}

function drawCanvas() {
    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillRect(10, 120, 100, 10);
    context.fillRect(20, 20, 7, 100);
    context.fillRect(20, 20, 50, 7);
    context.fillRect(20, 20, 50, 7);
    context.fillRect(64, 20, 3, 15);

    let wrongLetters = wrong.length;

    switch (wrongLetters) {
        case 6:
            // Left leg
            context.beginPath();
            context.moveTo(66, 85);
            context.lineTo(52, 95);
            context.stroke();
        case 5:
            // Right leg
            context.beginPath();
            context.moveTo(66, 85);
            context.lineTo(80, 95);
            context.stroke();
        case 4:
            // Left hand
            context.beginPath();
            context.moveTo(66, 55);
            context.lineTo(52, 65);
            context.stroke();
        case 3:
            // Right hand
            context.beginPath();
            context.moveTo(66, 55);
            context.lineTo(80, 65);
            context.stroke();
        case 2:
            // Body
            context.beginPath();
            context.moveTo(66, 49);
            context.lineTo(66, 85);
            context.stroke();
        case 1:
            // Head
            context.beginPath();
            context.arc(66, 41, 8, 0, 2 * Math.PI);
            context.stroke();
    }
}