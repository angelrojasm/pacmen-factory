const pacArray = [
	['./images/pacman1.png', './images/pacman2.png'],
	['./images/pacman3.png', './images/pacman4.png'],
];

const pacMen = []; // This array holds all the pacmen
let hasStarted = false;
// This function returns an object with random values
function setToRandom(scale) {
	return {
		x: Math.random() * scale,
		y: Math.random() * scale,
	};
}

function getRandomPosition(height, width) {
	console.log(height, width);
	console.log(window.innerWidth, window.innerHeight);
	let x = Math.random() * window.innerWidth;
	let y = Math.random() * window.innerHeight;
	console.log(x, y);
	if (x + width > window.innerWidth) x = window.innerWidth - width;
	if (y + height > window.innerHeight) y = window.innerHeight - height;
	console.log(x, y);
	return { x, y };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
	// returns an object with random values scaled {x: 33, y: 21}
	let velocity = setToRandom(10); // {x:?, y:?}
	let focus = 0;
	let direction = 0;
	// Add image to div id = game
	let game = document.getElementById('game');
	let newimg = document.createElement('img');
	newimg.style.position = 'absolute';
	newimg.src = pacArray[0][0];
	newimg.width = 100;
	let position = getRandomPosition(newimg.height, newimg.width);
	// TODO: set position here
	newimg.style.top = position.y;
	newimg.style.left = position.x;
	// TODO add new Child image to game
	game.appendChild(newimg);

	// return details in an object
	return {
		position,
		velocity,
		newimg,
		focus,
		direction,
	};
}

function update() {
	if (pacMen.length) {
		let startGameButton = document.getElementById('start');
		startGameButton.innerText = 'Speed Up';
		// loop over pacmen array and move each one and move image in DOM
		pacMen.forEach(item => {
			checkCollisions(item);
			item.position.x += item.velocity.x;
			item.position.y += item.velocity.y;

			item.newimg.style.left = item.position.x;
			item.newimg.style.top = item.position.y;
			item.newimg.src = pacArray[item.direction][item.focus];
		});
		setTimeout(update, 20);
	} else {
		alert('You must add a pacman first!');
	}
}

setInterval(() => {
	pacMen.forEach(item => {
		item.focus = (item.focus + 1) % 2;
	});
}, 150);
function checkCollisions(item) {
	// TODO: detect collision with all walls and make pacman bounce
	if (item.position.x + item.newimg.width >= window.innerWidth || item.position.x <= 0) {
		item.velocity.x *= -1;
		changeDirection(item);
	}
	if (item.position.y + item.newimg.height >= window.innerHeight || item.position.y <= 0) {
		item.velocity.y *= -1;
	}
}

function changeDirection(item) {
	item.direction = (item.direction + 1) % 2;
}

function makeOne() {
	pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
	module.exports = { checkCollisions, update, pacMen };
}
