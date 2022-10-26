let dealerSum = 0; //keeps track of points 
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; 

let hidden; 
let deck;

let canHit = true; //function to create later, will determine if you can still draw, if yourSum is <= 21

window.onload = function () {
    buildDeck();
    shuffleCards();
    startGame();
}

function buildDeck () {
    let types = ["clubs", "diamonds", "hearts", "spades"];
    let values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
    deck = [];

    for (let i = 0; i < types.length; i++) { 
        for(let j = 0; j < values.length; j++) { // look through types first, for each types look through all values
            deck.push(values[j] + "_of_" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck); checking to see if it works
}

function shuffleCards() { //so cards are random for each game
    for (let i= 0; i < deck.length; i++) { //goes through cards in deck 
        let j = Math.floor(Math.random() * deck.length);  //get a random index from deck. math.random gives a number between 0-1 and multiploies it by 52 (length of deck) which gives us a number between 0-52 but really (0-51.99, math.floor gives us an integer)
        let temp = deck[i]; //we are swapping positions in deck
        deck[i] = deck[j];
        deck[j] = temp;
    }
    // console.log(deck);
}

function startGame() { //deal to dealer first
    hidden = deck.pop(); //variable that keeps track of hidden card, pop moves card from end of array
    dealerSum += getValue(hidden); //want value of that card so have to make new function, and passing card hidden
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum); checkiung
    if (dealerSum < 17) { //dealing cards to dealer
        let cardImg = document.createElement("img"); //give them another card if less than 17, making image tag
        let card = deck.pop(); //get card from deck
        cardImg.src = "./images/" + card + ".png";//extension\\set image for tag
        dealerSum += getValue(card); //increment dealer sum  
        dealerAceCount += checkAce(card); //increment ace count for dealer sum
        document.getElementById("dealer-hand").append(cardImg);//took image tag and appended to dealers card div, like copying and pasting every image until dealer has sum of 17 or greater
    }



// console.log(dealerSum);

    for (let i=0; i < 2; i++) { //dealing cards to yourself
        let cardImg = document.createElement("img");
        let card = deck.pop(); 
        cardImg.src = "./images/" + card + ".png";
        yourSum += getValue(card);  
        yourAceCount += checkAce(card); 
        document.getElementById("player-hand").append(cardImg);
    }
    // console.log(yourSum);
    document.getElementById("hit-button").addEventListener("click", hit);
    document.getElementById("stay-button").addEventListener("click", stay);
}


function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop(); 
    cardImg.src = "./images/" + card + ".png";
    yourSum += getValue(card);  
    yourAceCount += checkAce(card); 
    document.getElementById("player-hand").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //checks your sum but also ace, see's if ace can be 10 or 1
        canHit = false; //have to as well define a reduceace function since it doesn't exist yet
    }

    
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);//both dealer and game stays in game
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./images/" + hidden + ".png";

    while (dealerSum < 17) { //cards added to dealers hand after you stay, if they are less than or equal to 17
        let cardImg = document.createElement("img"); //give them another card if less than 17, making image tag
        let card = deck.pop(); //get card from deck
        cardImg.src = "./images/" + card + ".png";//extension\\set image for tag
        dealerSum += getValue(card); //increment dealer sum  
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);//took image tag and appended to dealers card div, like copying and pasting every image until dealer has sum of 17 or greater
    }


    let message = "";
    if (yourSum > 21) {
 message = "Loser!";
}
else if (dealerSum > 21) {
    message = "Winner!";
}
else if (yourSum == dealerSum) {
    message = "Tie!";
}
else if (yourSum > dealerSum) {
    message = "Winner!";
}
else if (yourSum < dealerSum) {
    message = "Loser!";
}

document.getElementById("dealer-sum").innerText = dealerSum;
document.getElementById("player-sum").innerText = yourSum;
document.getElementById("results").innerText = message;
}

function getValue(card) { //going to take a card
    let data = card.split("_of_");//we are splitting values into two parts so we get an array of two different parts of the image
    let value = data[0]; //gives value

    if (isNaN(value)) { //checks what the value is, if it's not a number or has digits
        if (value == "A") {
            return 11;//if ace return 11
        }
        return 10;//if jack king or queen return 10
    }
    return parseInt(value);//if neither of this return whatever the value the digit is 
}



function checkAce(card) { 
    if (card[0] == "A") { //if card of 0, card is a string or first digit is A, we return 1 
        return 1;
    }
    return 0; //or else we return 0
}

function reduceAce(playerSum, playerAceCount) {
    if (playerSum > 21) {
        return playerSum -= 10;
    } else if (playerAceCount > 0) {
        playerAceCount -= 1;
    }
  
}
    




   



// function reduceAce(playerSum, playerAceCount) {
//     while (playerSum > 21 && playerAceCount > 0) {
//         playerSum -= 10;
//         playerAceCount -= 1;
//     }
//     return playerSum;
// }
    document.getElementById("stay-button").addEventListener("click", );