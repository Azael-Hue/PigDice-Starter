function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    random = Math.floor(random * maxValue) + minValue;
    return random;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current");
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    console.log(currentPlayerName + " LOG1 ");
    if (currentPlayerName.innerText === player1Name) {
        currentPlayerName.innerHTML = player2Name;
        console.log(currentPlayerName.innerHTML + " LOG A ");
    }
    else if (currentPlayerName.innerText === player2Name) {
        currentPlayerName.innerHTML = player1Name;
        console.log(currentPlayerName.innerHTML + " LOG B ");
    }
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    let player1score = document.getElementById("score1");
    let player2score = document.getElementById("score2");
    player1score.value = "0";
    player2score.value = "0";
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (player1Name == "" || player2Name == "") {
        alert("Enter both player names to start the game");
    }
    else {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        document.getElementById("current").innerText = player1Name;
    }
}
function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
    let diceRoll = generateRandomValue(1, 6);
    if (diceRoll == 1) {
        changePlayers();
        currTotal = 0;
    }
    else {
        currTotal += diceRoll;
    }
    let dieRollText = document.getElementById("die");
    dieRollText.value = diceRoll.toString();
    let totalText = document.getElementById("total");
    totalText.value = currTotal.toString();
}
function holdDie() {
    let currTotal = parseInt(document.getElementById("total").value);
    if (currTotal == 0) {
        changePlayers();
    }
    else {
        let currentPlayerName = document.getElementById("current");
        let player1Name = document.getElementById("player1").value;
        let player2Name = document.getElementById("player2").value;
        if (currentPlayerName.innerHTML == player1Name) {
            let p1Score = parseInt(document.getElementById("score1").value);
            let p1ScoreText = document.getElementById("score1");
            p1Score = p1Score + currTotal;
            p1ScoreText.value = p1Score.toString();
        }
        else if (currentPlayerName.innerHTML == player2Name) {
            let p2Score = parseInt(document.getElementById("score2").value);
            let p2ScoreText = document.getElementById("score2");
            p2Score = p2Score + currTotal;
            p2ScoreText.value = p2Score.toString();
        }
        clearDieScoreValue();
        changePlayers();
    }
}
function clearDieScoreValue() {
    let dieText = document.getElementById("die");
    dieText.value = "";
    let totalText = document.getElementById("total");
    totalText.value = "";
}
