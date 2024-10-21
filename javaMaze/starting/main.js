const keypress = require('keypress');
const Field = require('./field.js');

function displayGame(field, level) {
	console.clear();
	console.log(`Level: ${level}\n`);
	field.displayField();
	console.log('Press a, s, d, w to move. Press q to quit.');
}

function playLevel(level) {
	return new Promise((resolve) => {
		const field = new Field(10 + (level - 1) * 2, 10 + (level - 1) * 2, level);
	 	displayGame(field, level);
		keypress(process.stdin);
		process.stdin.on('keypress', (ch, key) => {
			field.movePlayer(key);
			displayGame(field, level);
			if (field.finishFound) {
				process.stdin.removeAllListeners('keypress');
				resolve();
			}
		});
	});
}

function pressEnter() {
	return new Promise((resolve) => {
		console.log('Press Enter to continue.');
		keypress(process.stdin);
		process.stdin.on('keypress', (ch, key) => {
			if (key.name === 'return') {
				process.stdin.removeAllListeners('keypress');
				resolve();
			}
		});
	});
}

async function playGame() {
	for (let currLevel = 1; currLevel <= 5; currLevel++) {
		await playLevel(currLevel);
		if (currLevel < 5) {
			console.log(`Congratulation! You completed level ${currLevel}.`);
			await pressEnter();
		}
	}
	console.log(`Congratulation! You completed all levels.`);
	process.exit();
}

playGame();

process.stdin.setRawMode(true);
process.stdin.resume();
