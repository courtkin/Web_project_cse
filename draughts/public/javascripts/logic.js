function board_array(){
    this.board = null;
    this.list = null;
    this.color = null;
    this.number = null;

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

    this.initiate = function(color){

        this.color = color;

        if(color === 'black'){
            this.board = [[0,1,0,1,0,1,0,1,0,1],
                        [1,0,1,0,1,0,1,0,1,0],
                        [0,1,0,1,0,1,0,1,0,1],
                        [1,0,1,0,1,0,1,0,1,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,2,0,2,0,2,0,2,0,2],
                        [2,0,2,0,2,0,2,0,2,0],
                        [0,2,0,2,0,2,0,2,0,2],
                        [2,0,2,0,2,0,2,0,2,0]];

            this.number = 2;
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

    this.getcoor = function(field){
        var coor = this.ids[field];
        var list = [];
        list.push(coor[1]);
        list.push(coor[0]);

        return list;
    };

    this.possible_moves = function(field){
        var coor = this.getcoor(field);
        var options = [];

        
        if (document.getElementById(field.toString()).classList.contains(this.color)){

            if (this.board[coor[0]-1][coor[1]-1] === 0){
                //free square left
                var new_square = [(coor[0]-1),(coor[1]-1)];

                if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                    options.push(new_square);
                }
            } 
            
            if (this.board[coor[0]-1][coor[1]+1] === 0){
                //free square right
                var new_square = [(coor[0]-1),(coor[1]+1)];

                if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                    options.push(new_square);
                }
            } 

            return options;

        } else {
            return null;
        }


    };

    this.possible_takes = function(field){
        var coor = this.getcoor(field);
        var options = [];


        if ((this.board[coor[0]-1][coor[1]-1] !== 0) && (this.board[coor[0]-1][coor[1]-1] !== this.number)){
            //square left take
            var new_square = [(coor[0]-2),(coor[1]-2)];

            if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                options.push(new_square);
            };
        }
        
        if ((this.board[coor[0]-1][coor[1]+1] !== 0) && (this.board[coor[0]-1][coor[1]+1] !== this.number)){
            //square right take
            var new_square = [(coor[0]-2),(coor[1]+2)];
            
            if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                options.push(new_square);
            };
        }

        if ((this.board[coor[0]+1][coor[1]-1] !== 0) && (this.board[coor[0]+1][coor[1]-1] !== this.number)){
            //square left behind take
            var new_square = [(coor[0]+2),(coor[1]-2)];

            if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                options.push(new_square);
            };
        }

        if ((this.board[coor[0]+1][coor[1]+1] !== 0) && (this.board[coor[0]+1][coor[1]+1] !== this.number)){
            //square right behind take
            var new_square = [(coor[0]+2),(coor[1]+2)];

            if((new_square[0]>=0 && new_square[0]<=9) && (new_square[1]>=0 && new_square[1]<=9)){
                options.push(new_square);
            };
        }
    }
}

function addEvents(array){
    this.start = function (){
        var t = document.getElementById("table");
        tr = t.getElementsByTagName("tr")[0];
        td = t.getElementsByTagName("td")[0];

        Array.from(td).forEach(function(e){
            e.addEventListener("click", function(){
                var field = e.target.id;

                var moves = array.possible_moves(field);
                var takes = array.possible_takes(field);

                var fields = [];

                moves.forEach(x => fields.push(getid(x)));
                takes.forEach(x => fields.push(getid(x)));

                field.forEach(x => document.getElementById(x.toString()).classList.add('.possible'));
            });
        });
    };
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

(function intiate(){
    var board = new board_array();
    board.initiate('white');
    var events = new addEvents(board);
    events.start(); 




    console.log(board.possible_moves(31));
    console.log(board.possible_moves(3));

})();