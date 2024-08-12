// Name: Andrei Laptev
// Date: 2023/12/20
// Version: 1
// Project: Snake game
// I took the images for snake from her https://github.com/LunaTMT/Snake/tree/main
var snake = [[10,10],[11,10],[12,10]];
var direction = 'up';
var apple = [];
var intervalID;
var score = 0;
var isPaused = false;

function pause() {
    if (isPaused) {
        intervalID = setInterval(DrawBoard, 200);
		document.getElementById("game").play()
		document.body.style.backgroundImage = "url('images/background.gif')";
    } else {
        clearInterval(intervalID);
		intervalID = null;
		ClearGrid();
		document.getElementById("game").pause();
		document.body.style.backgroundImage = "url('images/pause.gif')";

    }
    isPaused = !isPaused;
}

var lvl1Board = [['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
];

function setDefaultMap(){
	lvl1Board = [['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-'],
				['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
	];
}

function snakeMapChange(){
	for (let i = 0;i<snake.length-1;i++){
		lvl1Board[snake[i][1]][snake[i][0]] = 's';
	}
	lvl1Board[snake[snake.length-1][1]][snake[snake.length-1][0]] = 'sh';
}
function appleMapChange(){
		lvl1Board[apple[1]][apple[0]] = 'a';
}

function snakeUpdate(){
	if (direction == 'right'){
		snake.shift();
		snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]])
	}
	else if (direction == 'left'){
		snake.shift();
		snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]])
	}
	else if (direction == 'up'){
		snake.shift();
		snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1])
	}
	else  if (direction == 'down'){
		snake.shift();
		snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1])
	}
	else{
		return
	}
}

// I wrote this function to implement the logic of checking whether snake's head next cordinates are clapsing with the wall or apple, however I found that it works better if i check just snake[snake.length-1]
// function snakeHeadCors(){
// 	if (direction == 'right'){
// 		return [snake[snake.length-1][0]+1,snake[snake.length-1][1]]
// 	}
// 	else if (direction == 'left'){
// 		return [snake[snake.length-1][0]-1,snake[snake.length-1][1]]
// 	}
// 	else if (direction == 'up'){
// 		return [snake[snake.length-1][0],snake[snake.length-1][1]-1]
// 	}
// 	else  if (direction == 'down'){
// 		return [snake[snake.length-1][0],snake[snake.length-1][1]+1]
// 	}
// }

function DrawBoard(){
	ClearGrid();
	snakeUpdate();
	let isGameOver = false;

	if (lvl1Board[snake[snake.length-1][1]][snake[snake.length-1][0]] == '-'){
		isGameOver = true;
		gameOver();
	}

	if (snake.slice(0,-1).some(i => arraysAreEqual(snake[snake.length-1],i))){
		isGameOver = true;
		gameOver()
	}

	let startingX = 1;
	let startingY = 1;
	setDefaultMap();
	snakeMapChange();

	if (apple.length == 0) {
		getApple();
	
	}
	// snakeNextCor = snakeHeadCors();

	if (arraysAreEqual(snake[snake.length-1],apple)){
		var appleEaten = true;
		getApple();
		snakeGrow();
	}

	appleMapChange();

	for (let i = 0; i<lvl1Board.length;i++){
		for (let j = 0; j<lvl1Board[i].length;j++){
			if (lvl1Board[i][j] == '-'){
			AddBlock(startingX,startingY,'tree');
			}
			else if (lvl1Board[i][j] == 's'){
				AddBlock(startingX,startingY,'snakeBody');
			}
			else if (lvl1Board[i][j] == 'sh'){
				if (isGameOver){
                    AddBlock(startingX,startingY,'snakeHeadDied');
					document.getElementById("gameOver").play();
                }
				// adds a different animation when snake eats 
				else if(appleEaten){
					AddBlock(startingX,startingY,'snakeHeadEating');
					document.getElementById("eating").play();
				}
				// ads a different animation when snake dies 
                else{
					AddBlock(startingX,startingY,'snakeHead');
					updateSnakeHead();
				}
			}
			else if (lvl1Board[i][j] == 'a'){
				AddBlock(startingX,startingY,'pizza');
			}
			else{
				AddBlock(startingX,startingY,'grass');
			}
			startingX = startingX + 1;
		}
			startingX = 1;
			startingY = startingY + 1;
	}

}

function updateDirection(anyDirection){
	direction = anyDirection;
}

function game(){
	document.getElementById("game").play();
	intervalID = setInterval(DrawBoard,200);
}

document.addEventListener("keydown", keyPressed);

function keyPressed(event){
	// I am using 'w', 's', 'a' and 'd' instead of the arrows sings
	if (event.keyCode == 87 && direction != 'down'){
		direction = 'up';
	}
	else if  (event.keyCode == 83 && direction != 'up'){
		direction = 'down'
	}
	if (event.keyCode == 65 && direction != 'right'){
		direction = 'left';
	}
	else if  (event.keyCode == 68 && direction != 'left'){
		direction = 'right'
	}
}

function getApple(){
	apple = [];
	// I am using this do while loop to make sure that randomly spawned apple is not located somewhere on the snake
	do{
		tempX = Math.floor(Math.random()*(19-2))+2;
		tempY = Math.floor(Math.random()*(19-2))+2;
	}
	while (snake.some(i => arraysAreEqual([tempX,tempY],i)));

	apple.push(tempX,tempY);
}

function snakeGrow(){
	snake.splice(0,0,[snake[0][0]-1,snake[0][1]-1]);
	score ++;
	updateScoreDisplay();
}

// I wrote this function to check if two arrays' elements are exactly equal since JavaScript returns true if I just check the equality between two arrays using '==' only if their memory storage place is exactly equal
function arraysAreEqual(arr1,arr2){
	if (arr1.length != arr2.length){
		return false
	}

	for (i = 0; i<arr1.length;i++){
		if (arr1[i] != arr2[i]){
			return false
		}
	}

	return true
}

function gameOver(){
	clearInterval(intervalID);
	document.getElementById("game").pause();
	console.log('game over');
}

function updateScoreDisplay() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

// this is a function for snake head animation, it will rotate with the snake instead of being static 
function updateSnakeHead() {
    const snakeHead = document.getElementById('snakeHead');
    let rotationAngle = 0;
    if (direction == 'right') {
        rotationAngle = 90;
    } else if (direction == 'left') {
        rotationAngle = -90;
    } else if (direction == 'down') {
        rotationAngle = 180;
    }

    snakeHead.style.transform = `rotate(${rotationAngle}deg)`;
}

// inintially I was going to add a different block for tail as well, however because of its shape it did not work well, thus, it will just a defaulat block
// // I am doing the same but for the snake tail
// function updateSnakeTail() {
//     const snakeTail = document.getElementById('snakeTail');
//     let rotationAngle = 0;
//     if (direction == 'right') {
//         rotationAngle = 90;
//     } else if (direction == 'left') {
//         rotationAngle = -90;
//     } else if (direction == 'down') {
//         rotationAngle = 180;
//     }

//     snakeTail.style.transform = `rotate(${rotationAngle}deg)`;
// }

function startGame() {
    window.location.href = "Snake.html";
}

function playAgain(){
	// this resets the interevals value otherwise the map just crashes 
	intervalID = null;
	snake = [[10,10],[11,10],[12,10]];
	direction = 'up';
	apple = [];
	intervalID;
	score = 0;
	updateScoreDisplay();
	setDefaultMap();
	game()
}