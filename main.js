window.addEventListener('load', () => {
    var allMoves = []
    var xMoves = []
    var oMoves = []
    var playing = true
    var winner = null
    var playerIndex = 0;
    var scores = [0, 0]
    let names = ['X', 'O'];
    var timeLeft = 5000;//change to longer time later
    var thinking = false;

    var vsAi=true
    
    function showPlayer(){
        id('ai').innerHTML = ''
        if (winner !== null) {
            id('announcer').innerHTML = `And the winner is <span id="currentPlayer">${names[winner]}</span>`;

            if(winner !== 1) {
                id('ai').innerHTML = `${names[1]} looks mad.`;
            } else {
                id('ai').innerHTML = `${names[1]} laughs in binary.`;
            }
        } else if(playing) {
            id('announcer').innerHTML = `It's your turn, <span id="currentPlayer">${names[playerIndex]}</span>`;
            
        } else {
            id('announcer').innerHTML = `It's a <span id="currentPlayer">stalemate</span>`;
        }
    }
    function showScores() {
        id('scoreboard').innerHTML = `${scores[0]} - ${scores[1]}`;
    }
    function reset() {
        scores = [0, 0];
        newGame();
    }
    function newGame() {
        allMoves = [];
        xMoves = [];
        oMoves = [];
        playing = true;
        winner = null;
        tiles.forEach((t, i) => {
            t.innerHTML = '';
            t.parentElement.style.backgroundColor = '';
        });
        if(vsAi){
            id('vs').innerHTML = 'Play vs Human';
        } else {
            id('vs').innerHTML = 'Play vs Computer';
        }
        playerIndex = 0;
        timeLeft = 5000;
        showPlayer();
        showScores();
    }

    function id(str) {
        return document.getElementById(str);
    }
    function tileClick(tile, n) {
        if(!playing){
            if(winner) {
                alert(`It's over, ${names[(winner + 1)%2]}. ${names[winner]} has the high ground.`);
            } else {
                alert(`It's over, ${names[(winner + 1)%2]}. Everyone went home.`);
            }
            return;
        }
        if (tile.innerHTML === '') {
            tile.innerHTML = ['X', 'O'][playerIndex];
            tile.parentElement.style.backgroundColor = 'orange';
            playerMoved(n)
        } else {
            alert(`That space was taken on turn ${allMoves.indexOf(n)}`)
        }
    }

    let ends = [0, 1, 2].flatMap(i => [[3*i, 3*i+1, 3*i+2], [i, i+3, i+6]]).concat([[0, 4, 8], [2, 4, 6]]);
    function playerMoved(n) {
        allMoves.push(n)
        var arr = [xMoves, oMoves][playerIndex]
        arr.push(n);

        var win = ends.find(end => end.every(n => arr.indexOf(n) > -1))
        if (win) {
            win.forEach(n => tiles[n].parentElement.style.backgroundColor = 'springgreen')
            alert(`Player ${playerIndex + 1} wins`)

            scores[playerIndex] += 1;
            winner = playerIndex;
            playing = false;

            showScores();
            showPlayer();
            return;
        } else if(allMoves.length == 9) {
            tiles.forEach(t => t.parentElement.style.backgroundColor = 'lightgray');
            alert(`It's a tie`)
            playing = false
            showPlayer()
            return;
        }
        playerIndex = (playerIndex + 1) % 2;
        
        timeLeft = 10000;
        showPlayer()

        
        if(vsAi && playerIndex === 1){
           AI();
        }


    }

    

    function checkOneAway() {
        //012 345 678: 
        //036 157 268: check if contains 2 even numbers with the same %3
        //048 246: check if contains 2 even numbers wiht the same %4
        
        
        
        
    }

    function AI(){
        //Crude AI Function : AI = 1
        //look through available space                                                                                                                   
        //prioritize in this order

        //if there they are 1 space away from winning
            //create function to do this check
        //if no X 

        //else
         // random:
        // put X in spot with
        //


        //better AI if there is time
        //Min-Man
        //evaluation heuristice - to give a value to avaiable tiles and which is the best move
        //alpha beta pruning (to optimize)
        
        id('ai').innerHTML = `${names[playerIndex]} is thinking...`;
        let time = 10;
        thinking = true;
        function think() {

            if(time --> 0){
    
                id('ai').innerHTML += '.';
                setTimeout(think, 50);
            } else {
                id('ai').innerHTML = '';

                
                var n = [4, 1, 3, 5, 7, 0, 2, 6, 8].find(i => tiles[i].innerHTML == '');
                if(n !== undefined) {
                    tileClick(tiles[n], n);
                }           
                
                thinking = false              
            }
            
        }
        setTimeout(think, 500);                                                                                                                                     
    }
    
    id('newGame').addEventListener('click', () => {
        newGame();
    });
    
    id('reset').addEventListener('click', () => {
        reset();
    });
    id('vs').addEventListener('click', () => {
        vsAi =!vsAi;
        newGame();
    });

    setInterval(() => {

        if(playing) {
            if(thinking){
                return;
            }
            timeLeft -= 500;
            if(timeLeft < 1) {
                AI();
            }
        }
    }, 500);
    var board = id('board')
    var tiles = Array.from(board.children).flatMap(row => Array.from(row.children)).map(space => space.children[0]);
    tiles.forEach((t, i) => {
        t.parentElement.addEventListener('click', () => tileClick(t, i));
    });

    reset();
});