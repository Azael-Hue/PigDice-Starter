
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
    let currentPlayerName = (<HTMLElement>document.getElementById("current"));//.innerText;
    let player1Name : string = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name : string = (<HTMLInputElement>document.getElementById("player2")).value;
    console.log(currentPlayerName + " LOG1 ");

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if(currentPlayerName.innerText === player1Name){
        currentPlayerName.innerHTML = player2Name;
        console.log(currentPlayerName.innerHTML + " LOG A ");
    }
    else if(currentPlayerName.innerText === player2Name){
        currentPlayerName.innerHTML = player1Name;
        console.log(currentPlayerName.innerHTML + " LOG B ");
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
        // set the current player to player 1
        (<HTMLElement>document.getElementById("current")).innerText = player1Name;
        // changePlayers();
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
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    if (currTotal == 0){
        changePlayers();
        
    }
    else{
        //determine who the current player is
        let currentPlayerName = (<HTMLElement>document.getElementById("current"));
        let player1Name : string = (<HTMLInputElement>document.getElementById("player1")).value;
        let player2Name : string = (<HTMLInputElement>document.getElementById("player2")).value;
        
        //add the current turn total to the player's total score
    
        if (currentPlayerName.innerHTML == player1Name){
            let p1Score = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
            let p1ScoreText = document.getElementById("score1") as HTMLInputElement;
            p1Score = p1Score + currTotal;
            p1ScoreText.value = p1Score.toString();
        }
        else if (currentPlayerName.innerHTML == player2Name){
            let p2Score = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
            let p2ScoreText = document.getElementById("score2") as HTMLInputElement;
            p2Score = p2Score + currTotal;
            p2ScoreText.value = p2Score.toString();
        }
    
        //reset the turn total to 0
        clearDieScoreValue();
    
        //change players
        changePlayers();
    }
}

function clearDieScoreValue():void{
    let dieText = document.getElementById("die") as HTMLInputElement;
    dieText.value = "";

    let totalText = document.getElementById("total") as HTMLInputElement;
    totalText.value = "";
}