var board = TICTACO.createBoard(3);

board.createPlayer('Computer', 'X');
board.createPlayer('Human', 'O');

var player1 = board.players[0];
var player2 = board.players[1];

board.initialize();
board.logBoard();

board.ask(player2);
board.logBoard();
player1.move();
board.logBoard();

/*
board.ask(player2);
player1.move();
TICTACO.logBoard();
board.ask(player2);
player1.move();
TICTACO.logBoard();
*/
