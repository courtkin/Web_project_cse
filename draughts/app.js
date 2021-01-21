var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");

var gameStatus = require("./statTracker");
var Game = require("./game");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

/* Add the stats later, for now only the plash screen with no templates. */
app.get("/", function (req, res, next) {
    res.sendFile("splash.html", {root: "./public"});
});

app.get("/splash", indexRouter);
app.get("/play", indexRouter);

var server = http.createServer(app);
const wss = new websocket.Server({server});

var websockets = {}; //property: websocket, value: game

// /*
//  * regularly clean up the websockets object
//  */
// setInterval(function() {
//   for (let i in websockets) {
//     if (Object.prototype.hasOwnProperty.call(websockets,i)) {
//       let gameObj = websockets[i];
//       //if the gameObj has a final status, the game is complete/aborted
//       if (gameObj.finalStatus != null) {
//         delete websockets[i];
//       }
//     }
//   }
// }, 50000);

var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionID = 0;

wss.on("connection", function connection(ws) {
	console.log("test");
    let con = ws;
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    if (playerType == "black") {
        con.send(messages.S_PLAYER_BLACK);
    } else {
        con.send(messages.S_PLAYER_WHITE);
    }

    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame = new Game(gameStatus.gamesInitialized++);
	}
	
	con.on("message", function incoming(message) {
		let objectMessage = JSON.parse(message);
		let gameObj = websockets[con.id];

		if (objectMessage.type == messages.T_GAME_WON_BY) {
			let winnerMsg = messages.O_GAME_OVER;
			winnerMsg.data = objectMessage.data;
			gameObj.playerBlack.send(JSON.stringify(winnerMsg));
			gameObj.playerWhite.send(JSON.stringify(winnerMsg));
			gameObj.setStatus(objectMessage.data);
		} else if (objectMessage.type == messages.T_BLACK_PLAYED) {
			let board = objectMessage.board;
			let nextTurnMsg = messages.O_NEXT_TURN;
			nextTurnMsg.data = "white";
			nextTurnMsg.board = board;
			gameObj.playerBlack.send(JSON.stringify(nextTurnMsg));
			gameObj.playerWhite.send(JSON.stringify(nextTurnMsg));
			gameObj.setStatus("WHITE TURN");
		} else if (objectMessage.type == messages.T_WHITE_PLAYED) {
			let board = objectMessage.board;
			let nextTurnMsg = messages.O_NEXT_TURN;
			nextTurnMsg.data = "black";
			nextTurnMsg.board = board;
			gameObj.playerBlack.send(JSON.stringify(nextTurnMsg));
			gameObj.playerWhite.send(JSON.stringify(nextTurnMsg));
			gameObj.setStatus("BLACK TURN");
		}
	});
});

server.listen(port);