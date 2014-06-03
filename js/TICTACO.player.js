TICTACO.Player = function () {};

TICTACO.Player.prototype.mark = function (row, col) {
	var board = this.board.squares;
	console.info('Marking square for ' + this.name);
	board[row][col].value = this.letter;
	this.board.num_turns++;
	console.log('there have been ' + this.board.num_turns + ' turns');
};

TICTACO.Player.prototype.getWinSquare = function () {
	var board = this.board.squares;

	var i = 0, x = 0;
	for (i = 0; i < board.length; i++) {
		for (x = 0; x < board[i].length; x++) {
			if (board[i][x].isWinSquare(this)) {
				return board[i][x];
			}
		}
	}

	return null;
};

TICTACO.Player.prototype.getTurnsToWin = function () {
	// find which unobstructed row, col, or diag has the 
	// most marks for this player
	// then return number of remaining squares in that row, col, or diag
};

TICTACO.Player.prototype.getOpponent = function () {
	var players = this.board.players;
	var opponent = null;

	var p = 0;
	for (p = 0; p < players.length; p++) {
		if (players[p].name !== this.name) {
			opponent = players[p];
		}
	}

	return opponent;
};

TICTACO.Player.prototype.move = function () {
	var board = this.board.squares;
	var opponent = this.getOpponent();

	// 1. check if there's a win square, and take it
	if (this.getWinSquare()) {
		var win_square = this.getWinSquare();
		console.log('marking win square: ' + win_square.id);
		this.mark(win_square.row, win_square.col);
		return;
	} else {
		console.log('no win square for ' + this.name);
	}

	// 2. if no win square, check if there's a lose square, and take it
	console.log('checking if there\'s a lose square');
	if (opponent.getWinSquare()) {
		var lose_square = opponent.getWinSquare();
		console.log(opponent.name + ' has a win cell! blocking...');
		this.mark(lose_square.row, lose_square.col);
		return;
	}

	// 3. if center square is available, take it. 
	var center = null;
	var i = 0, x = 0;
	for (i = 0; i < board.length; i++) {
		for (x = 0; x < board[i].length; x++) {
			if (board[i][x].diag === 'C') {
				center = board[i][x];
			}
		}
	}

	if (!center.value) {
		console.log('Center square is not taken, ' + this.name + ' is marking it!');
		this.mark(center.row, center.col);
		return;
	}

	// 4. if center square is not available and player has marked
	// no other squares, take the corner with the most unobostructed 
	// rows or cols
	console.log(this.board.numTurns);
	if (TICTACO.numTurns === 1 && center.value === opponent.letter) {
		this.mark(0, 0);
		return;
	}
	

	// 4. mark friend square of original selection, picking a friend
	// square that opens up a new unobstructed row, col, or diag (if possible)
};