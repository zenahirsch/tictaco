TICTACO = {};

TICTACO.board = {};

TICTACO.board.squares = [];

TICTACO.board.size = 5;

TICTACO.Player = function () {};

TICTACO.Player.prototype.mark = function (row, col) {
	var board = this.board.squares;
	console.info('Marking square for ' + this.name);
	board[row][col].value = this.letter;
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

	return false;
};

TICTACO.Player.prototype.getOpponent = function () {
	var players = TICTACO.players;
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
	var opponent = this.getOpponent();

	if (opponent.getWinSquare()) {
		var lose_square = opponent.getWinSquare();
		console.log(opponent.name + ' has a win cell! blocking...');
		this.mark(lose_square.row, lose_square.col);
		return;
	}

	// 3. if no lose square, check numTurnsToWin for each player
	// 4. if self numTurnsToWin is lower, mark offensively
	// 5. if self numTurnsToWin is higher, mark defensively
};

TICTACO.createPlayer = function (name, letter) {
	return Object.create(TICTACO.Player.prototype, {
		'name': {
			value: name,
			writable: false
		},
		'letter': {
			value: letter,
			writable: false
		},
		'board': {
			value: this.board,
			writable: false
		}
	});
};

TICTACO.players = [
	TICTACO.createPlayer('Computer', 'X'),
	TICTACO.createPlayer('Human', 'O')
];

// Square constructor, takes properties:
// id, value, row, col, diag, status
// and has method isWinCell()
TICTACO.Square = function () {};

TICTACO.Square.prototype.getFriends = function () {
	var board = this.board.squares;
	var size = this.board.size;
	var s = this.id;

	var friends = {
		horizontal: [],
		vertical: [],
		left_diag: [],
		right_diag: []
	};

	// find horizontal friends
	var row = this.row;
	var i = 0;
	for (i = 0; i < size; i++) {
		if (board[row][i].id === s) {
			continue;
		} else {
			friends.horizontal.push(board[row][i]);
		}
	}

	// find vertical friends
	var column = this.col;
	var x = 0;
	for (x = 0; x < size; x++) {
		if (board[x][column].id === s) {
			continue;
		} else {
			friends.vertical.push(board[x][column]);
		}
	}

	// find left diag friends
	if (this.diag === 'L' || this.diag === 'C') {
		var y = 0, z = 0;
		for (y = 0; y < size; y++) {
			for (z = 0; z < size; z++) {
				if (board[y][z].id === s) {
					continue;
				} else {
					if (board[y][z].diag === 'L' || board[y][z].diag === 'C') {
						friends.left_diag.push(board[y][z]);
					}
				}
			}
		}
	} else {
		friends.left_diag = undefined;
	}

	// find right diag friends
	if (this.diag === 'R' || this.diag === 'C') {
		var q = 0, r = 0;
		for (q = 0; q < size; q++) {
			for (r = 0; r < size; r++) {
				if (board[q][r].id === s) {
					continue;
				} else {
					if (board[q][r].diag === 'R' || board[q][r]. diag === 'C') {
						friends.right_diag.push(board[q][r]);
					}
				}
			}
		}
	} else {
		friends.right_diag = undefined;
	}

	//console.log(friends);
	return friends;
};

TICTACO.Square.prototype.isWinSquare = function (player) {
	var friends = this.getFriends();
	var horizontal = friends.horizontal;
	var vertical = friends.vertical;
	var left_diag = friends.left_diag;
	var right_diag = friends.right_diag;

	var isWin = false;

	if (!this.value) {

		if (!isWin && horizontal) {
			isWin = true;
			var h = 0;
			for (h = 0; h < horizontal.length; h++) {
				if (horizontal[h].value !== player.letter) {
					isWin = false;
				}
			}
		}

		if (!isWin && vertical) {
			isWin = true;
			var v = 0;
			for (v = 0; v < vertical.length; v++) {
				if (vertical[v].value !== player.letter) {
					isWin = false;
				}
			}
		}

		if (!isWin && left_diag) {
			isWin = true;
			var l = 0;
			for (l = 0; l < left_diag.length; l++) {
				if (left_diag[l].value !== player.letter) {
					isWin = false;
				}
			}
		}

		if (!isWin && right_diag) {
			isWin = true;
			var r = 0;
			for (r = 0; r < right_diag.length; r++) {
				if (right_diag[r].value !== 'X') {
					isWin = false;
				}
			}
		}

	}

	return isWin;
};

TICTACO.createSquare = function (id, row, col, diag) {
	return Object.create(TICTACO.Square.prototype, {
		'id': {
			value: id,
			writable: false
		},
		'value': {
			value: undefined,
			writable: true
		},
		'row': {
			value: row,
			writable: false
		},
		'col': {
			value: col,
			writable: false
		},
		'diag': {
			value: diag,
			writable: false
		},
		'board': {
			value: this.board,
			writable: false
		}
	});
};

TICTACO.initialize = function () {
	var board = this.board.squares;
	var size = this.board.size;

	var i = 0, x = 0, y = 0;
	for (i = 0; i < size; i++) {
		board[i] = [];
		for (x = 0; x < size; x++) {
			board[i].push(this.createSquare(y, i, x, this.getDiag(i, x)));
			y++;
		}
	}
};

TICTACO.getDiag = function (row, col) {
	var size = this.board.size;
	var diag = 'N';

	if (row === col) {
		diag = 'L';
		if (row === Math.floor(size / 2) && size % 2 !== 0) {
			diag = 'C';
		}
	} else if (row === ((size - 1) - col)) {
		diag = 'R';
	}

	return diag;
};

TICTACO.ask = function (player) {
	var board = this.board.squares;
	var r = prompt('Which row?');
	var c = prompt('Which column?');
	
	if (!board[r][c].value) {
		player.mark(r, c);
	}
};

TICTACO.reset = function () {
	this.board.squares = [];
};

TICTACO.logBoard = function () {
	var board = this.board.squares;
	var size = board.length;
	var i = 0, x = 0;
	for (i = 0; i < size; i++) {
		var row = i + ': ';
		for (x = 0; x < size; x++) {
			if (board[i][x].value === undefined) {
				row += ' | _';
			} else {
				row += ' | ' + board[i][x].value;
			}
		}
		console.log(row);
	}
};

var player1 = TICTACO.players[0];
var player2 = TICTACO.players[1];

TICTACO.initialize();
player1.mark(0, 0);
player1.mark(0, 1);
player1.mark(0, 2);

player2.mark(1, 0);
player2.mark(1, 1);
player2.mark(1, 2);
player2.mark(1, 3);

TICTACO.logBoard();
player1.move();
TICTACO.logBoard();