	import PriorityQueue from 'js-priority-queue';

	const finishCharacter = '^';
	const holeCharacter = 'O';
	const fieldCharacter = '░';
	const pathCharacter = '*';
	const currentPositionCharacter = '@';

	const dx = [-1, 1, 0, 0];
	const dy = [0, 0, -1, 1];

	class Field {
		constructor(height, width, complexity) {
			this._height = height;
			this._width = width;
			this._complexity = complexity;
			this._playerCoords = [0, 0];
			this._finishCoords = [height - 1, width - 1];
			this._finishRound = false;

			this.generateField();
		}
		
		get finishFound() {
			return this._finishRound;
		}

		checkPositionInField(x, y) {
			return x >= 0 && x < this._height && y >= 0 && y < this._width;
		}

		getVisitedNeighbours(x, y, visited) {
			let cnt = 0;
			for (let  i = 0; i < 4; i++) {
				const new_x = x + dx[i];
				const new_y = y + dy[i];  
				if (this.checkPositionInField(new_x, new_y) && visited[new_x][new_y]) {
					cnt++;
				}
			}
			return cnt;
		}

		generateField() {
			let visited = Array.from({length: this._height}, () => Array.from({length: this._height}).fill(false));
			this._field = Array.from({length: this._height}, () => Array.from({length: this._height}).fill(false));

			const pq = new PriorityQueue({
				comparator: (a, b) => a.priority - b.priority,
			});
			pq.queue({positon: [this._playerCoords[0], this._playerCoords[1] + 1], priority: Math.random()});
			pq.queue({positon: [this._playerCoords[0] + 1, this._playerCoords[1]], priority: Math.random()});
			visited[this._playerCoords[0]][this._playerCoords[1]] = true;

			while (pq.length) {
				const currentCoords = pq.dequeue().positon;
				if (this.getVisitedNeighbours(currentCoords[0], currentCoords[1], visited) == 1) {
					visited[currentCoords[0]][currentCoords[1]] = true;
					for (let  i = 0; i < 4; i++) {
						const new_x = currentCoords[0] + dx[i];
						const new_y = currentCoords[1] + dy[i];
						if (this.checkPositionInField(new_x, new_y) && !visited[new_x][new_y]) {
							pq.queue({positon: [new_x, new_y], priority: Math.random()});
						}
					}
				}
			}
			
			if (!visited[this._finishCoords[0]][this._finishCoords[1]]) {
				visited[this._finishCoords[0] - 1][this._finishCoords[1]] = true;
				visited[this._finishCoords[0]][this._finishCoords[1] - 1] = true;
				visited[this._finishCoords[0] - 2][this._finishCoords[1]] = true;
				visited[this._finishCoords[0]][this._finishCoords[1] - 2] = true;
			}

			for (let i = 0; i < this._height; i++) {
				for (let j = 0; j < this._width; j++) {
					this._field[i][j] = visited[i][j] ? fieldCharacter : holeCharacter;
				}
			}

			this._field[this._playerCoords[0]][this._playerCoords[1]] = currentPositionCharacter;
			this._field[this._height - 1][this._width - 1] = finishCharacter;
			this.changeComplexity();
		}

		changeComplexity() {
			for (let i = 0; i < this._height; i++) {
				for (let j = 0; j < this._width; j++) {
					if (this._field[i][j] == holeCharacter) {
						const seed = Math.floor(Math.random() * 5);
						this._field[i][j] = seed < 5 - this._complexity ? fieldCharacter : holeCharacter;
					}
				}
			}
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
				this._finishRound = true;
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

	export default Field;