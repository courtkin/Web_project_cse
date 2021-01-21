(function intiate(){
    var ws = new WebSocket(Setup.WEB_SOCKET_URL);
    var board = new board_array();
    

    ws.onmessage = function(event){
        let msg = JSON.parse(event.data);
        var listeners = new addEvents(board);
        
        if(msg.type === Messages.S_PLAYER_TYPE){
            board.intiate(msg.data);
            if(board.getColor() === "white"){
                board.setTurn(1);
                listeners.start();
                
                while(board.getTurn() === 1){
                    console.log("hello");
                }

                let outmsg = Messages.O_WHITE_PLAYED;
                ws.send(JSON.stringify(outmsg));
            } 

            if(board.getColor() == "black"){
                board.setTurn(0);
                listeners.start();
            }
        }

        

        if((msg.type === Messages.O_NEXT_TURN) && (msg.data === "white") && (board.getColor() === "white")){
            
            board.setBoard(msg.board);
            board.setTurn(1);

            while(board.getTurn() === 1){
                console.log("hello");
            }

            if(gameOver(board) === "self"){
                let outmsg = Messages.T_GAME_WON_BY;
                ws.send(JSON.stringify(outmsg));
            } 

            if(gameOver(board) === "other"){
                let outmsg = Messages.T_GAME_WON_BY;
                ws.send(JSON.stringify(outmsg));
            } 
            
            if(gameOver(board) === "gameon") {
                let outmsg = Messages.T_GAME_WON_BY;
                outmsg.board = board.getBoard();
                ws.send(JSON.stringify(outmsg));
            }
        }

        if((msg.type === Messages.O_NEXT_TURN) && (msg.data === "black") && (board.getColor() === "black")){
            
            board.setBoard(msg.board);
            board.setTurn(1);

            while(board.getTurn() === 1){
                console.log("hello");
            }

            if(gameOver()){
                let outmsg = Messages.O_GAME_OVER;
                ws.send(JSON.stringify(outmsg));
            } else {
                let outmsg = Messages.O_BLACK_PLAYED;
                outmsg.board = board.getBoard();
                ws.send(JSON.stringify(outmsg));
            }
        }


    }
    
})();