const Queue = require('queue-fifo');

const finishCharacter = '^';
const holeCharacter = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const currentPositionCharacter = '@';

class Field {
	constructor(height, width, complexity) {
		this._height = height;
		this._width = width;
		this._complexity = complexity - 1;
		this._playerCoords = [0, 0];
		this._finishCoords = [height - 1, width - 1];
		this._finishFound = false;

		this.generateField();
	}
	get finishFound() {
		return this._finishFound;
	}
	fillField(startCoord, visited) {
		const dx = [-1, 1, 0, 0];
		const dy = [0, 0, -1, 1];
		
		const queue = new Queue();
		queue.enqueue({'x': startCoord[0], 'y': startCoord[1]});
		visited[startCoord[0]][startCoord[1]] = 1;
		
		while(queue.size()) {
			const x = queue.peek().x;
			const y = queue.peek().y;
			queue.dequeue();
			for (let l = 0; l < 4; l++) {
				const newX = x + dx[l];
				const newY = y + dy[l];
				if (this.checkPosition([newX, newY]) && visited[newX][newY] == 0) {
					visited[newX][newY] = visited[x][y] + 1;
					queue.enqueue({'x': newX, 'y': newY});
				}
			}
		}
	}
	checkField() {
		let visited = Array.from({length: this._height}, () => Array.from({length: this._height}).fill(0));
		this.fillField(this._playerCoords, visited);
		const roadLength = visited[this._finishCoords[0]][this._finishCoords[1]];
		const optimalLength = Math.floor((this._height + this._width) * (100 + this._complexity * 10) / 100);
		return roadLength >= optimalLength && roadLength < optimalLength * 12 / 10;
	}
	generateField() {
		do {
			this._field = Array.from({ length: this._height }, () => 
				Array.from({ length: this._width }, () => {
					const seed = Math.random() < 0.9 - this._complexity / 10;
					return seed ? fieldCharacter : holeCharacter;
				})
			);

			this._field[this._playerCoords[0]][this._playerCoords[1]] = currentPositionCharacter;
			this._field[this._height - 1][this._width - 1] = finishCharacter;

		} while(!this.checkField());
	}
	checkPosition(coords) {
		return coords[0] >= 0 &&
				coords[0] < this._height &&
				coords[1] >= 0 &&
				coords[1] < this._width &&
				this._field[coords[0]][coords[1]] != holeCharacter;
	}
	updateFiled() {
		if (!this.checkPosition(this._playerCoords)) {
			console.log('You lost :(');
			process.exit();
		}
		this._field[this._playerCoords[0]][this._playerCoords[1]] = currentPositionCharacter;
		if (this._playerCoords[0] == this._finishCoords[0] && this._playerCoords[1] == this._finishCoords[1]) {
			console.log('You found the finish :)');
			this._finishFound = true;
		}
	}
	movePlayer(key) {
		if (key) {
			this._field[this._playerCoords[0]][this._playerCoords[1]] = pathCharacter;
			if (key.name == 'w') {
				this._playerCoords[0]--;
			}
			if (key.name == 's') {
				this._playerCoords[0]++;
			}
			if (key.name == 'a') {
				this._playerCoords[1]--;
			}
			if (key.name == 'd') {
				this._playerCoords[1]++;
			}
			if (key.name == 'q') {
				console.log('Quiting the game...');
				process.exit();
			}
		}
		this.updateFiled();
	}
	displayField() {
		this._field.forEach((element) => {
			console.log(`${element.join('')}`);
		});
		console.log(this._playerCoords);
	}
}

module.exports = Field;
