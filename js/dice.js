function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    random = Math.floor(random * maxValue) + minValue;
    return random;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (currentPlayerName == player1Name) {
        currentPlayerName = player2Name;
    }
    else {
        currentPlayerName = player1Name;
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
        changePlayers();
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
    let currTotal = document.getElementById("total");
    let currPlayer = document.getElementById("current");
    changePlayers();
}
