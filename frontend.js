
/**
*@description When site is loaded, goes straight to SnakeGame-method
*/

window.onload = function(){
	SnakeGame();
 };

 var game; 																				/**@param {object} - Starts the game, game's object*/
 var canvas = document.getElementById("canvas"); 	/**@param {object} - get's the canvas element from HTML*/
 var ctx = canvas.getContext("2d"); 							/**@param {object} - Starts the game, game's object*/
 var cWidth = canvas.width;												/**@param {int} - canvas element width*/
 var cHeight = canvas.height;											/**@param {int} - canvas element height*/
 var boxWidth = cWidth/30;												/**@param {int} - Defines box width*/
 var boxHeight = cHeight/30;											/**@param {int} - Defines box height*/
 var boxWH = 20;																	/**@param {int} - One box has same width and height so boxWh can be used*/
 var points = 0;																	/**@param {int} - Points during snake game*/
 var score = document.getElementById("Pisteet");	/**@param {object} - get's the Points element from HTML*/
 var foodImg = new Image();												/**@param {object} - Defines image object for food.*/
 foodImg.src = "Kuvat/apple.png";									/**@param {object} - Food's image object is apple.*/
 var k;																						/**@param {string} - Indicates, which button was pressed. Used with keycodes.*/
 var snake = [];																	/**@param {object} - Array, which represents snake.*/
 snake[0] = {
 x: cWidth/2,
 y: cHeight/2
};
 var responseDataName;															/**@param {string} - Username from server.*/
 var responseDataScore;															/**@param {string} - Points from server.*/
 var table = document.getElementById("Tulokset");		/**@param {object} - get's the table element from HTML*/

 var food = {																				/**@param {object} - Random food location on canvas*/
 x: Math.floor(Math.random()*30)*boxWH,
 y: Math.floor(Math.random()*30)*boxWH
};
 var eatSound = new Audio();												/**@param {object} - Eating sound*/
 eatSound.src = ("Audio/appleSound.mp3")						/**@param {object} - Eating sound to apple*/

document.addEventListener("keydown", direction);
document.addEventListener("keydown", checkControl);


/**
*@description Check which movement key was pressed to make snake move to that direction.
*Also limit's the snake movement so that snake cannot directly go to opposite direction.
*@param {int} event - The keycode of which button was pressed
*/
function direction(event){
	var key = event.keyCode;
if(key == 65 && k != "right"){
	k = "left";
}
else if(key == 68 && k != "left"){
	k = "right";
}
else if(key == 87 && k != "down"){
	k = "up";
}
else if(key == 83 && k != "up"){
	k = "down";
}
}
/**
*@description Goes to check previous snake game results in checkPreviousScores().
*Also sets the interval ready for Drawing the snake movement in setInterval-method.
*/
function SnakeGame(){
		checkPreviousScores();
		game = setInterval(Draw, 100);
}
/**
*@description Gets information about earlier usernames and their scores from the local server.
*It also adds the information to a table next to the snake game canvas.
*/
function checkPreviousScores(){
	axios
  .get('http://localhost:3001/namesAndScores')
  .then(response => {
    var namesScores = response.data

		for(var i = 0; i<namesScores.length; i++){
			var row = table.insertRow(1);
			var column1 = row.insertCell(0);
			var column2 = row.insertCell(1);
			column1.innerHTML =  "<td>" + namesScores[i].name + "</td> ";
			column2.innerHTML = "<td>" + namesScores[i].score + "</td>";
		}
  })
}

/**
*@description Draws squares to canvas according to setInterval every 1/10 second. Squares act as a snake,
*where black square is snake's head and white ones act as a body.
*Draw also checks for user input to make the snake move.
*Apple appears to a random position on the canvas at the start and whenever snake has eaten one.
*After apple's and snake's head coordinates are same, there comes an eating sound and one point is added in
*method SavePoints.
*Sets the Gameover status according to method CheckSnakeC and if snake's head coordinates
*go over the canvas boundaries.
*/

function Draw(){
	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, cWidth, cHeight);
for(var i = 0; i<snake.length; i++){
	ctx.fillStyle = (i == 0) ? "black" : "white";
	ctx.fillRect(snake[i].x, snake[i].y, boxWH, boxWH);
	console.log("Madon y-koordinaatti: " + snake[i].y);

	ctx.strokeStyle = "red";
	ctx.strokeRect(snake[i].x, snake[i].y, boxWH, boxWH);
}
ctx.drawImage(foodImg, food.x, food.y);

//Snake movement logic, eating and save points

var snakeX = snake[0].x;
var snakeY = snake[0].y;

if(k == "right") snakeX += boxWH;
if(k == "left") snakeX -= boxWH;
if(k == "up") snakeY -= boxWH;
if(k == "down") snakeY += boxWH;

if(snakeX == food.x && snakeY == food.y){
	points++;
	eatSound.play();
	SavePoints(points);
	food = {
  x: Math.floor(Math.random()*30)*boxWH,
  y: Math.floor(Math.random()*30)*boxWH
 }
}else{
	snake.pop();
}

var nHead = {
 x: snakeX,
 y: snakeY
}
//Check end games
	if(snakeX < -20|| snakeX > boxWH*30 ||
		snakeY < -20 || snakeY > boxWH*30){
		Gameover();
	}
	if(CheckSnakeC(nHead, snake)){
		setTimeout(Gameover, 100);
	}
/**
*@description Alert's the user that the game has ended.
*Clear's the interval in clearInterval-method and
*after that ask's username in makeTextInput-method.
*/
function Gameover(){
	alert("Peli loppui");
	clearInterval(game);
	makeTextInput();
}
snake.unshift(nHead);
}

/**
*@description Shows the amount of points in ongoing snake game.
*@param {int} p - Current points in Snake game.
*/
function SavePoints(p){
	document.getElementById("Pisteet").innerHTML = "Pisteet: " + p;
}

/**
*@description Check if the snake's head collide with some other part of the snake
*@param {object} head - New snake head x-position and y-position.
*@param {object} array - Snake's position as a whole.
*@return {boolean} - True if snake's internal collision has happened. Otherwise false.
*/
function CheckSnakeC(head, array){
	for(var i = 0; i<array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}return false;
}
/**
*@description Writes instructions to a canvas on how to start a new snake game after previous snake game ended.
*@param {object} c - Canvas 2D-context
*/
function WriteToCanvas(c){
	c.clearRect(0, 0, cWidth, cHeight);
	c.font = "24px Arial";
	c.fillStyle = "black";
	c.textAlign = "center";
	c.fillText("Paina control-näppäintä aloittaaksesi uuden pelin", cWidth/2, cHeight/2);
}
/**
*@descriptionCheck's if Control-button is pressed and starts a new game while also resetting the snake and points
from previous session.
*@param {int} e - The keycode of which button was pressed.
*/
function checkControl(e){
	var x = e.keyCode;
	if(x == 17){
		ctx.clearRect(0, 0, cWidth, cHeight);
    var emptyArray = [];
    snake = emptyArray;
		snake[0] = {
	  x: cWidth/2,
	  y: cHeight/2
	 };
	 points = 0;
	 document.getElementById("Pisteet").innerHTML = "Pisteet: 0";
		game = setInterval(Draw, 100);
	}
}
/**
*@description Makes the textinput for canvas, where username is asked. Uses CanvasInput library.
*When submitting the input, calls for onsubmit callback function saveNameAndScore.
*/
function makeTextInput(){
	ctx.clearRect(0, 0, cWidth, cHeight);
	document.getElementById('canvas').focus();
	var input = new CanvasInput({
  canvas: canvas,
	x: 220,
	y: 260,
	fontSize: 18,
  fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 150,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
	placeHolderColor: '#D7DBDD',
  placeHolder: 'Käyttäjänimi',
});
input.focus();

input.onsubmit(function saveNameAndScore(){
	var nameAndScore =
	{
		name: input.value(),
		score: points
	}
	input.destroy();

	axios
	.post('http://localhost:3001/namesAndScores', nameAndScore)
    .then(response => {
			responseDataName = response.data.name;
			responseDataScore = response.data.score;

		var row = table.insertRow(1);
  	var column1 = row.insertCell(0);
  	var column2 = row.insertCell(1);
  	column1.innerHTML =  "<td>" + responseDataName + "</td> ";
  	column2.innerHTML = "<td>" + responseDataScore + "</td>";
    })
		document.addEventListener("keydown", checkEnter);
	})
}
/**
*@description Check if enter-key is pressed to go forward to WriteCanvas-method.
*@param e {int} - The keycode of which button was pressed
*/
function checkEnter(e){
	var x = e.keyCode;
		if(x == 13){
			WriteToCanvas(ctx);
		}
}

/**
 * Callback for submitting the Canvas input
 * @callback saveNameAndScore
 * @fires checkEnter - Checks if enter is presed and then moves to that method.
 */
