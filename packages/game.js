var homelands = ["Earth", "Ice", "Water", "Stars", "Sky"];

//temp until NFT cards are included need function to grab skill points from cards
var skillPoints = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "15"];

var healthStats = []
var fightStats = []
var defStats = []

var cards = [];
var players = [[],[]];
var firstRun = true;
var gameover = false;

var playerOnePoints = 0;
var playerTwoPoints = 0;
var rounds = 0;

var fightButton = document.querySelector("#btnFight");

var p1 = document.querySelector("#player1 .hand");
var p2 = document.querySelector("#player2 .hand");
var s1 = document.querySelector("#player1 .score");
var s2 = document.querySelector("#player2 .score");
var message = document.getElementById("message");

fightButton.addEventListener('click', battle);

function battle(){
    if(firstRun){
        firstRun = false;
        buildCards();
        //was not sure if users select or shuffle cards or if they build there deck 
        shuffleArray(cards);
        dealCards(cards);

    }
    attack();
    
}

function attack(){
    if(!gameover){
        var card1 = players[0].shift();
        var card2 = players[1].shift();
        var pool = [card1, card2];

        p1.innerHTML = showCard(card1, 0);
        p2.innerHTML = showCard(card2, 0);

        checkWinner(card1, card2, pool);

        s1.innerHTML = players[0].length;
        s2.innerHTML = players[1].length;

        rounds++;

    }
}

function checkWinner(card1, card2, pool){
    if(rounds >= 10){

        if(playerOnePoints > playerTwoPoints){
            alert("Player 1 Wins")
        }
        if(playerTwoPoints > playerOnePoints){
            alert("Player 2 Wins")
        }


        gameover = true;
        
        return;
    }
    if(card1.cardValue > card2.cardValue){
        message.innerHTML = "player 1 Wins"
        console.log("hand 1 wins")
        players[0] = players[0].concat(pool);
        playerOnePoints++;
       
        
    }
    else if(card1.cardValue < card2.cardValue) {
        //need to go back fix this in case of draw
        message.innerHTML = "player 11 Wins"
        console.log("hand 2 winner")
        players[1] = players[1].concat(pool);
        playerTwoPoints++;

    }else {
        message.innerHTML = "Tie"
        console.log("tie");
       
    }
}

function showCard(cardInfo, positionInfo) {
    var move = positionInfo * 40;
    var bgColor = (cardInfo.icon == "E" || cardInfo.icon == "I" ) ? "red" : "green";
    var buildCardLook = '<div class = tempCard style = "color:' +bgColor+ '">' + 'Skill Level: '+cardInfo.skillLevel + '  Homeland  ' + cardInfo.homeland + ';</div>';
    console.log(cardInfo, move);
    return buildCardLook;
}

function buildCards() {
    cards = [];
    for(s in homelands){
        var homelandID = homelands[s][0].toUpperCase();
        for(n in skillPoints){
            var card = {

                homeland:homelands[s],
                //will modify this to more skill categories - health, de, etc

                skillLevel:skillPoints[n],

                //base skill levels health, fight, defense + randomlocation boost variable
                cardValue:parseInt(n) + 2,
                //matches the id of the card to the output of the random location var
                icon:homelandID

            }
            cards.push(card);
                
        }
        console.log(cards)
    }
   
}
//need to revisit
function dealCards(array){

    for(var i = 0;i < array.length;i++ ) {
        var m = i % 2;
        players[m].push(array[i]);
    }
    console.log(players);
}

//function to shuffle cards and homelands
function shuffleArray (array) {
    for(var x = array.length -1; x>0; x--){
        var ii = Math.floor(Math.random() * (x+1));
        var temp = array[x];
        array[x] = array[ii];
        array[ii] = temp;

        console.log(array)
        
    }
}

function createRandomHomeland () {

}

