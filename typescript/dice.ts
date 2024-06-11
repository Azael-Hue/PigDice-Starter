
// This function will simulate a die roll when called,
function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random();
    
    //TODO: use random to generate a number between min and max
    // returns a random integer
    random = Math.floor(random * maxValue) + minValue;

    return random;
}

// When this function is called, it will change
// the current player name to the next player
// using else if statements to check who is currently playing
function changePlayers():void{
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if(currentPlayerName == player1Name){
        currentPlayerName = player2Name;
    }
    else{
        currentPlayerName = player1Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0

    // get the player scores
    let player1score = document.getElementById("score1") as HTMLInputElement;
    let player2score = document.getElementById("score2") as HTMLInputElement;
    // set the players scores to 0
    player1score.value = "0";
    player2score.value = "0";

    //verify each player has a name
    //if both players don't have a name display error
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;
    if (player1Name == "" || player2Name == "") {
        alert("Enter both player names to start the game");
    }
    else{
        //if both players do have a name start the game!
        (<HTMLElement>document.getElementById("turn")).classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
        (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
        changePlayers();
    }
}

function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let diceRoll = generateRandomValue(1, 6);    

    //if the roll is 1
    //  change players
    //  set current total to 0
    if (diceRoll == 1){
        changePlayers();
        currTotal = 0;
    }
    
    //if the roll is greater than 1
    //  add roll value to current total
    else{
        currTotal += diceRoll;
    }

    //set the die roll to value player rolled
    let dieRollText = document.getElementById("die") as HTMLInputElement;
    dieRollText.value = diceRoll.toString();

    //display current total on form
    let totalText = document.getElementById("total") as HTMLInputElement;
    totalText.value = currTotal.toString();
}

function holdDie():void{
    //get the current turn total
    //determine who the current player is
    //add the current turn total to the player's total score

    //reset the turn total to 0

    //change players
    changePlayers();
}