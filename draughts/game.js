// @ts-nocheck
/* Every game has two players. The game is identified by the Websocket used. */
var game = function(gameID) {
    this.playerBlack = null;
    this.playerWhite = null;
    this.id = gameID;
    this.gameState = "0 JOINT";
};

/* The different states a game can be in. */
game.prototype.gameStates = {};
game.prototype.gameStates["0 JOINT"] = 0;
game.prototype.gameStates["1 JOINT"] = 1;
game.prototype.gameStates["2 JOINT"] = 2;
game.prototype.gameStates["BLACK TURN"] = 3;
game.prototype.gameStates["WHITE TURN"] = 4;
game.prototype.gameStates["BLACK"] = 5;
game.prototype.gameStates["WHITE"] = 6;
game.prototype.gameStates["ABORTED"] = 7;

/* The possible transitions from one game state to another.
* IMPORTANT DESIGN DECISION: I decided that the game determines the winning player in opponent's turn.
* (e.g. If Black captures last piece of white, the turn passes to white. The game then realizes that 
*  white has no pieces and declares black as the winner.)
*/
game.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0, 0, 0], // 0 JOINT
    [1, 0, 1, 0, 0, 0, 0, 0], // 1 JOINT
    [0, 0, 0, 1, 0, 0, 0, 1], // 2 JOINT
    [0, 0, 0, 0, 1, 0, 1, 1], // BLACK TURN
    [0, 0, 0, 1, 0, 1, 0, 1], // WHITE TURN
    [0, 0, 0, 0, 0, 0, 0, 0], // BLACK WON
    [0, 0, 0, 0, 0, 0, 0, 0], // WHITE WON
    [0, 0, 0, 0, 0, 0, 0, 0] // ABORTED
];

game.prototype.isValidTransition = function(from, to) {
    let i, j;
    if (!(from in game.prototype.gameStates)) {
        return false;
    } else {
        i = game.prototype.gameStates[from];
    }

    if (!(to in game.prototype.gameStates)) {
        return false;
    } else {
        j = game.prototype.gameStates[to];
    }

    return game.prototype.transitionMatrix[i][j] > 0;
};

game.prototype.isValidState = function(state) {
    return state in game.prototype.gameStates;
};

game.prototype.setState = function(newState) {
    if (game.prototype.isValidState(newState) && game.prototype.isValidTransition(this.gameState, newState)) {
        this.gameState = newState;
        console.log("STATE: %s", this.gameState);
    } else {
        return new Error(
            "Not possible to change from %s to %s",
            this.gameState,
            newState
        );
    }
};

game.prototype.hasTwoConnectedPlayers = function() {
    return this.gameState == "2 JOINT";
};

game.prototype.addPlayer = function(player) {
    if ((this.gameState != "0 JOINT") && (this.gameState != "1 JOINT")) {
        return new Error(
            "Cannot add a player. Game state is: %s",
            this.gameState
        );
    }

    var error = this.setState("1 JOINT");
    if (error instanceof Error) {
        this.setState("2 JOINT");
    }

    if (this.playerBlack ==  null) {
        this.playerBlack = player;
        return "BLACK";
    } else {
        this.playerWhite = player;
        return "WHITE";
    }
};

module.exports = game;
