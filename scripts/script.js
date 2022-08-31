const LETTER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
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
alphabet()
const words = {
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
document.body.appendChild(div2);
