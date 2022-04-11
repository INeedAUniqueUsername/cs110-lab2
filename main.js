window.addEventListener('load', () => {
    var allMoves = []
    var xMoves = []
    var oMoves = []
    var playing = true
    var winner = null
    var playerIndex = 0;
    
    function reset() {
        allMoves = [];
        xMoves = [];
        oMoves = [];
        playing = true;
        winner = null;
        tiles.forEach((t, i) => {
            t.innerHTML = '';
            t.parentElement.style.backgroundColor = '';
        });
    }

    function id(str) {
        return document.getElementById(str);
    }
    function tileClick(tile, n) {
        if(!playing){
            if(winner) {
                alert(`It's over, Player ${playerIndex + 1}. Player ${winner} has the high ground.`);
            } else {
                alert(`It's over, Player ${playerIndex}. Everyone went home.`);
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
            winner = playerIndex + 1;
            playing = false;
        } else if(allMoves.length == 9) {

            tiles.forEach(t => t.parentElement.style.backgroundColor = 'lightgray');
            alert(`It's a tie`)
            playing = false
        }
        playerIndex = (playerIndex + 1) % 2;
    }

    id('reset').addEventListener('click', () => {
        reset();
    });
    var board = id('board')
    var tiles = Array.from(board.children).flatMap(row => Array.from(row.children)).map(space => space.children[0]);
    tiles.forEach((t, i) => {
        t.parentElement.addEventListener('click', () => tileClick(t, i));
    });
});