(function(exports) {
    /*
    * Client to server: game is complete, and the winner is in data property.
    */
    exports.T_GAME_WON_BY = "GAME-WON-BY";
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    /*
    * Server to client: game is aborted.
    */
    exports.O_GAME_ABORTED = {
        type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    /*
    * Server to client: set as Player Black.
    */
    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_BLACK = {
        type: exports.T_PLAYER_TYPE,
        data: "BLACK"
    };
    exports.S_PLAYER_BLACK = JSON.stringify(exports.O_PLAYER_BLACK);

    /*
    * Server to client: set as Player White.
    */
    exports.O_PLAYER_WHITE = {
        type: exports.T_PLAYER_TYPE,
        data: "WHITE"
    };
    exports.S_PLAYER_WHITE = JSON.stringify(exports.O_PLAYER_WHITE);

    /*
    * Server to both player: it is Black's turn.
    */
    exports.T_TURN_TYPE = "TURN-TYPE";
    exports.O_TURN_BLACK = {
        type: exports.T_TURN_TYPE,
        data: "BLACK"
    };
    exports.S_TURN_BLACK = JSON.stringify(exports.O_TURN_BLACK);

    /*
    * Server to both player: it is White's turn.
    */
    exports.O_TURN_WHITE = {
        type: exports.T_TURN_TYPE,
        data: "WHITE"
    };
    exports.S_TURN_WHITE = JSON.stringify(exports.O_TURN_WHITE);

    /*
    * Client to server: made a move.
    */
    exports.O_MADE_MOVE = {
        type: "MADE-MOVE"
    };
    exports.S_MADE_MOVE = JSON.stringify(exports.O_MADE_MOVE);

    /*
    * Server to both players: game over with result won/loss.
    */
    exports.T_GAME_OVER = "GAME-OVER";
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    };
})(typeof exports === 'undefined' ? (this.Messages = {}) : exports);