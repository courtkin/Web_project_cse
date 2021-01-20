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
    * Client to server: black played.
    */
    exports.T_BLACK_PLAYED = "BLACK-PLAYED";
    exports.O_BLACK_PLAYED = {
        type: exports.T_BLACK_PLAYED,
    };
    exports.S_BLACK_PLAYED = JSON.stringify(exports.O_BLACK_PLAYED);

    /*
    * Client to server: white played.
    */
    exports.T_WHITE_PLAYED = "WHITE-PLAYED";
    exports.O_WHITE_PLAYED = {
        type: exports.T_BLACK_PLAYED,
    };
    exports.S_WHITE_PLAYED = JSON.stringify(exports.O_WHITE_PLAYED);

    /*
    * Server to both players: who is going to play the next turn.
    */
    exports.T_NEXT_TURN = "NEXT-TURN";
    exports.O_NEXT_TURN = {
        type: exports.T_NEXT_TURN,
        data: null
    }

    /*
    * Server to both players: game over with result won/loss.
    */
    exports.T_GAME_OVER = "GAME-OVER";
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    };
})(typeof exports === 'undefined' ? (this.Messages = {}) : exports);