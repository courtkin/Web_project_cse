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


var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionID = 0;

wss.on("connection", function connection(ws) {
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
			gameObj.setState(objectMessage.data);
		} else if (objectMessage.type == messages.T_BLACK_PLAYED) {
			let field = objectMessage.field;
			let coor = objectMessage.coor;
			let type = objectMessage.type;
			let nextTurnMsg = messages.O_NEXT_TURN;
			nextTurnMsg.data = "white";
			nextTurnMsg.field = field;
			nextTurnMsg.coor = coor;
			nextTurnMsg.type = type;
			gameObj.playerBlack.send(JSON.stringify(nextTurnMsg));
			gameObj.playerWhite.send(JSON.stringify(nextTurnMsg));
			gameObj.setState("WHITE TURN");
		} else if (objectMessage.type == messages.T_WHITE_PLAYED) {
			let field = objectMessage.field;
			let coor = objectMessage.coor;
			let type = objectMessage.type;
			let nextTurnMsg = messages.O_NEXT_TURN;
			nextTurnMsg.data = "black";
			nextTurnMsg.field = field;
			nextTurnMsg.coor = coor;
			nextTurnMsg.type = type;
			gameObj.playerBlack.send(JSON.stringify(nextTurnMsg));
			gameObj.playerWhite.send(JSON.stringify(nextTurnMsg));
			gameObj.setState("BLACK TURN");
		}
	});
});

server.listen(port);