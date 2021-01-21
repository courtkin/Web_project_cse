//const exp = require("express");

function board_array(){
    this.board = null;
    this.list = null;
    this.color = null;
    this.number = null;
    this.other = null;
    this.othercolor = null;
    this.turn = null;

    this.ids = {1:[1,0], 2:[3,0], 3:[5,0], 4:[7,0], 5:[9,0],
                6:[0,1], 7:[2,1], 8:[4,1], 9:[6,1], 10:[8,1],
                11:[1,2], 12:[3,2], 13:[5,2], 14:[7,2], 15:[9,2],
                16:[0,3], 17:[2,3], 18:[4,3], 19:[6,3], 20:[8,3],
                21:[1,4], 22:[3,4], 23:[5,4], 24:[7,4], 25:[9,4],
                26:[0,5], 27:[2,5], 28:[4,5], 29:[6,5], 30:[8,5],
                31:[1,6], 32:[3,6], 33:[5,6], 34:[7,6], 35:[9,6],
                36:[0,7], 37:[2,7], 38:[4,7], 39:[6,7], 40:[8,7],
                41:[1,8], 42:[3,8], 43:[5,8], 44:[7,8], 45:[9,8],
                46:[0,9], 47:[2,9], 48:[4,9], 49:[6,9], 50:[8,9]};

    this.nums = [[0,1, 0, 2, 0, 3, 0, 4, 0, 5],
                [6, 0, 7, 0, 8, 0, 9, 0, 10,0],
                [0,11, 0, 12, 0, 13, 0, 14, 0, 15],
                [16, 0, 17, 0, 18, 0, 19, 0, 20,0],
                [0,21, 0, 22, 0, 23, 0, 24, 0, 25],
                [26, 0, 27, 0, 28, 0, 29, 0, 30,0],
                [0,31, 0, 32,0, 33,0, 34,0, 35],
                [36,0, 37,0, 38,0, 39,0, 40,0],
                [0,41,0, 42,0, 42,0, 44,0, 45],
                [46,0, 47,0, 48,0, 49,0, 50,0]];

    this.initiate = function(color){

        this.color = color;

        if(color === 'black'){
            this.board = [[0,1,0,1,0,1,0,1,0,1],
                        [1,0,1,0,1,0,1,0,1,0],
                        [0,1,0,1,0,1,0,1,0,1],
                        [1,0,1,0,1,0,1,0,1,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,1,0,0,0,0,0],
                        [0,2,0,2,0,2,0,2,0,2],
                        [2,0,2,0,2,0,2,0,2,0],
                        [0,2,0,2,0,2,0,2,0,2],
                        [2,0,2,0,2,0,2,0,2,0]];

            this.number = 2;
            this.other = 1;
            this.othercolor = "white"
        } if(color === 'white'){
            this.board = [[0,2,0,2,0,2,0,2,0,2],
                        [2,0,2,0,2,0,2,0,2,0],
                        [0,2,0,2,0,2,0,2,0,2],
                        [2,0,2,0,2,0,2,0,2,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,1,0,1,0,1,0,1,0,1],
                        [1,0,1,0,1,0,1,0,1,0],
                        [0,1,0,1,0,1,0,1,0,1],
                        [1,0,1,0,1,0,1,0,1,0]]

            this.number = 1;
            this.other = 1;
            this.othercolor = "black";
        }

        let board_list = [];

        for (let j = 0; j < 10; j = j + 2){
            for (let k = 1; k < 10; k = k + 2){
                board_list.push(this.board[j][k]);
            }

            for (let l = 0; l < 10; l = l + 2){
                board_list.push(this.board[j+1][l]);
            }
        }
        
        for (let i = 0; i < 50 ; i++){
            var ind = i + 1;
            var tbl_item = document.getElementById(ind.toString());

            if (board_list[i] === 1){
                tbl_item.classList.add('white');
            } if (board_list[i] === 2){
                tbl_item.classList.add('black');
            }
        }

        this.list = board_list;
    };

    this.setTurn = function(input){
        this.turn = input;
    }

    this.getBoard = function(){
        return this.board;
    };

    this.setBoard = function(board){
        this.board = board;
    };

    this.getid = function(coor){
        //must be list
        return this.board[coor[0]][coor[1]];
    };

    this.getnum = function(coor){
        return this.nums[coor[0]][coor[1]];
    }

    this.getcoor = function(field){
        var coor = this.ids[field];
        var list = [];
        list.push(coor[1]);
        list.push(coor[0]);

        return list;
    };

    this.move = function(field, coor_to){
        var coor_from = this.getcoor(field);
        
        this.board[coor_to[0]][coor_to[1]] = this.number;
        this.board[coor_from[0]][coor_from[1]] = 0;

        //remove old
        document.getElementById(field.toString()).classList.remove(this.color);
        //add new
        document.getElementById(this.getnum(coor_to).toString()).classList.add(this.color);
    }

    this.take = function(field, coor_to){
        var coor_from = this.getcoor(field);
        var coor_mid = [((coor_from[0]+coor_to[0])/2),((coor_to[1]+coor_from[1])/2)];

        this.board[coor_to[0]][coor_to[1]] = this.number;
        this.board[coor_from[0]][coor_from[1]] = 0;
        this.board[coor_mid[0]][coor_mid[1]] = 0;

        //remove old
        document.getElementById(field.toString()).classList.remove(this.color);
        //add new
        document.getElementById(this.getnum(coor_to).toString()).classList.add(this.color);
        //remove take
        document.getElementById(this.getnum(coor_mid).toString()).classList.remove(this.othercolor);

    }

    this.possible_moves = function(field){
        var coor = this.getcoor(field);
        var options = [];

        
        if ((document.getElementById(field.toString()).classList.contains(this.color)) && (this.turn === 1)){

            if(coor[1] !== 0){

                if (this.board[coor[0]-1][coor[1]-1] === 0){
                    //free square left
                    var new_square = [(coor[0]-1),(coor[1]-1)];

                    if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                        options.push(new_square);
                    }
                } 
            }

            if(coor[1] !== 9){
            
                if ((this.board[coor[0]-1][coor[1]+1] === 0) && (this.board[coor[0]-1][coor[1]+1] !== this.number)){
                    //free square right
                    var new_square = [(coor[0]-1),(coor[1]+1)];

                    if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                        options.push(new_square);
                    }
                } 
            }
        }

        return options;
    };

    this.possible_takes = function(field){
        var coor = this.getcoor(field);
        var options = [];

        if ((document.getElementById(field.toString()).classList.contains(this.color)) && (this.turn === 1)){

            if(coor[1] !== 0){
                if ((this.board[coor[0]-1][coor[1]-1] === this.other) && (this.board[coor[0]-2][coor[1]-2] === 0)){
                    //square left take
                    var new_square = [(coor[0]-2),(coor[1]-2)];

                    if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                        options.push(new_square);
                    };
                }

                if(coor[0] !== 9){
                    if ((this.board[coor[0]+1][coor[1]-1] === this.other) && (this.board[coor[0]+2][coor[1]-2] === 0)){
                        //square left behind take
                        var new_square = [(coor[0]+2),(coor[1]-2)];
            
                        if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                            options.push(new_square);
                        };
                    }
                }
                
            }    

            if(coor[1] !== 9){    
                
                if ((this.board[coor[0]-1][coor[1]+1] === this.other) && (this.board[coor[0]-2][coor[1]+2] === 0)){
                    //square right take
                    var new_square = [(coor[0]-2),(coor[1]+2)];
                        
                    if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                            options.push(new_square);
                    };
                }

                if(coor[0] !== 9){
                    if ((this.board[coor[0]+1][coor[1]+1] === this.other) && (this.board[coor[0]+2][coor[1]+2] === 0)){
                        //square right behind take
                        var new_square = [(coor[0]+2),(coor[1]+2)];

                        if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                            options.push(new_square);
                        };
                    }
                }   
            }    

        }

        return options;
    }
}

function addEvents(array){
    const td = Array.from(document.getElementsByTagName("p"));

    this.start = function (){
        td.forEach(ele => add_listener(ele));
    };

    function add_listener(e){
        e.addEventListener("click", function click_event(el){

            td.forEach(u => u.classList.remove("possible"));

            var field = e.id;

            var moves = array.possible_moves(field);

            var takes = array.possible_takes(field);

            for(let y = 0; y < moves.length; y++){
                document.getElementById(array.getnum(moves[y]).toString()).classList.add('possible');
                document.getElementById(array.getnum(moves[y]).toString()).addEventListener("click", move =>{
                    array.move(field, moves[y]);
                    array.setTurn(0);
                }); 
            }    

            for(let z = 0; z < takes.length; z++){
                document.getElementById(array.getnum(takes[z]).toString()).classList.add('possible');
                document.getElementById(array.getnum(takes[z]).toString()).addEventListener("click", take =>{
                    array.take(field, takes[z]);
                    array.setTurn(0);
                });
            } 
        })
    }
}    

function state(status){
    this.playercolor = null;
    this.status = status;

    this.getStatus = function(){
        return this.status;
    }

    this.getPlayerColor = function(){
        return this.playercolor;
    }

}



