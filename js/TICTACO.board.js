TICTACO.Board = function () {};

TICTACO.Board.prototype.initialize = function () {
	var board = this.squares;
	var size = this.size;

	var i = 0, x = 0, y = 0;
	for (i = 0; i < size; i++) {
		board[i] = [];
		for (x = 0; x < size; x++) {
			board[i].push(this.createSquare(y, i, x));
			y++;
		}
	}
};

TICTACO.Board.prototype.createSquare = function (id, row, col) {
	var square = Object.create(TICTACO.Square.prototype, {
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
			value: null,
			writable: true
		},
		'board': {
			value: this,
			writable: false
		}
	});

	square.setDiag();

	return square;
};

TICTACO.Board.prototype.createPlayer = function (name, letter) {
	var player = Object.create(TICTACO.Player.prototype, {
		'name': {
			value: name,
			writable: false
		},
		'letter': {
			value: letter,
			writable: false
		},
		'board': {
			value: this,
			writable: false
		}
	});

	this.players.push(player);
};

TICTACO.Board.prototype.ask = function (player) {
	var board = this.squares;
	var r = prompt('Which row?');
	var c = prompt('Which column?');
	
	if (!board[r][c].value) {
		player.mark(r, c);
	}
};

TICTACO.Board.prototype.reset = function () {
	this.squares = [];
};

TICTACO.Board.prototype.logBoard = function () {
	var board = this.squares;
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

TICTACO.createBoard = function (size) {
	return Object.create(TICTACO.Board.prototype, {
		'size': {
			value: size,
			writable: false
		},
		'squares': {
			value: [],
			writable: true
		},
		'num_turns': {
			value: 0,
			writable: true
		},
		'players': {
			value:[],
			writable: true
		}
	});
};