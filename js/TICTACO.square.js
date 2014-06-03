// Square constructor, takes properties:
// id, value, row, col, diag, status
// and has method isWinCell()
TICTACO.Square = function () {};

TICTACO.Square.prototype.setDiag = function () {
	var size = this.board.size;
	var row = this.row;
	var col = this.col;
	var diag = 'N';

	if (row === col) {
		diag = 'L';
		if (row === Math.floor(size / 2) && size % 2 !== 0) {
			diag = 'C';
		}
	} else if (row === ((size - 1) - col)) {
		diag = 'R';
	}

	this.diag = diag;
};

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