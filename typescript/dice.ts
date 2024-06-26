
// This function will simulate a die roll when called,
function generateRandomValue(minValue: number, maxValue: number): number {
    var random = Math.random();

    // returns a random integer
    random = Math.floor(random * maxValue) + minValue;

    return random;
}

// When this function is called, it will change
// the current player name to the next player
// using else if statements to check who is currently playing
function changePlayers(): void {
    let currentPlayerName = (<HTMLElement>document.getElementById("current"));//.innerText;
    let player1Name: string = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name: string = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName.innerText == player1Name) {
        currentPlayerName.innerHTML = player2Name;
    }
    else if (currentPlayerName.innerText == player2Name) {
        currentPlayerName.innerHTML = player1Name;
    }
}

window.onload = function () {
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

// this function will create a new game
// by setting the scores to 0 and
// verifying the players input a name for each other
function createNewGame() {
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
    else {
        //if both players do have a name start the game!
        (<HTMLElement>document.getElementById("turn")).classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
        (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");

        // set the current player to player 1
        (<HTMLElement>document.getElementById("current")).innerText = player1Name;
    }
}

// this function is called when the roll button is clicked
// it will roll a die by calling the generateRandomValue function
function rollDie(): void {
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let diceRoll = generateRandomValue(1, 6);

    //if the roll is 1
    //  change players
    //  set current total to 0
    if (diceRoll == 1) {
        changePlayers();
        currTotal = 0;
    }

    //if the roll is greater than 1
    //  add roll value to current total
    else {
        currTotal += diceRoll;
    }

    //set the die roll to value player rolled
    let dieRollText = document.getElementById("die") as HTMLInputElement;
    dieRollText.value = diceRoll.toString();

    //display current total on form
    let totalText = document.getElementById("total") as HTMLInputElement;
    totalText.value = currTotal.toString();

    // If the current total is 100, the current player wins
    // and reset the game
    let currPlayer = (<HTMLElement>document.getElementById("current")).innerText;
    if (currTotal >= 100) {
        alert(currPlayer + " Wins");
        createNewGame();
    }
}

// This function is called when the hold button is clicked
// it will add the current turn total to the player's total score
// and change players
function holdDie(): void {

    //get the current turn total
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //determine who the current player is
    let currentPlayerName = (<HTMLElement>document.getElementById("current"));
    let player1Name: string = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name: string = (<HTMLInputElement>document.getElementById("player2")).value;

    //add the current turn total to the player's total score

    // get the player scores
    let p1Score = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let p2Score = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
    let p1ScoreText = document.getElementById("score1") as HTMLInputElement;
    let p2ScoreText = document.getElementById("score2") as HTMLInputElement;

    // add the current total to the player's score

    if (currentPlayerName.innerHTML == player1Name) {
        p1Score = p1Score + currTotal;
        p1ScoreText.value = p1Score.toString();
    }
    else if (currentPlayerName.innerHTML == player2Name) {
        p2Score = p2Score + currTotal;
        p2ScoreText.value = p2Score.toString();
    }

    // Check if the current player has reached a score of 100 to win and create a new game
    if (p1Score >= 100) {
        alert(player1Name + " Wins");
        createNewGame();
    }
    else if (p2Score >= 100) {
        alert(player2Name + " Wins");
        createNewGame();
    }

    //reset the turn total to 0
    clearDieScoreValue();

    //change players
    changePlayers();
}

// this function will clear the die and total values
function clearDieScoreValue(): void {
    let dieText = document.getElementById("die") as HTMLInputElement;
    dieText.value = "0";

    let totalText = document.getElementById("total") as HTMLInputElement;
    totalText.value = "0";
}