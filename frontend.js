
window.onload = function(){
	SnakeGame();
 };

 var game;
 var game2;
 var canvas = document.getElementById("canvas");
 var ctx = canvas.getContext("2d");
 var cWidth = canvas.width;
 var cHeight = canvas.height;
 var boxWidth = cWidth/30;
 var boxHeight = cHeight/30;
 var boxWH = 20;
 var points = 0;
 var score = document.getElementById("Pisteet");
 var foodImg = new Image();
 var k;
 foodImg.src = "Kuvat/apple.png";
 var snake = [];
 snake[0] = {
 x: cWidth/2,
 y: cHeight/2
};
 var responseDataName;
 var responseDataScore;
 var table = document.getElementById("Tulokset");

 var food = {
 x: Math.floor(Math.random()*30)*boxWH,
 y: Math.floor(Math.random()*30)*boxWH
};
 var eatSound = new Audio();
 eatSound.src = ("Audio/appleSound.mp3")

document.addEventListener("keydown", direction);
document.addEventListener("keydown", checkControl);

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

function SnakeGame(){
		checkPreviousScores();
		game = setInterval(Draw, 100);
}

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

//Draw the field and update the snake movement
function Draw(){
	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, cWidth, cHeight);
for(var i = 0; i<snake.length; i++){
	ctx.fillStyle = (i == 0) ? "black" : "white";
	ctx.fillRect(snake[i].x, snake[i].y, boxWH, boxWH);

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
function Gameover(){
	alert("Peli loppui");
	clearInterval(game);
	makeTextInput();
}
snake.unshift(nHead);
}
//Make points to screen
function SavePoints(p){
	document.getElementById("Pisteet").innerHTML = "Pisteet: " + p;
}

//Check snake internal collision
function CheckSnakeC(head, array){
	for(var i = 0; i<array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}return false;
}
//Empty the canvas and make text to it
function WriteToCanvas(c){
	c.clearRect(0, 0, cWidth, cHeight);
	c.font = "24px Arial";
	c.fillStyle = "black";
	c.textAlign = "center";
	c.fillText("Paina control-näppäintä aloittaaksesi uuden pelin", cWidth/2, cHeight/2);
}
//New game initialization
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
function checkEnter(e){
	var x = e.keyCode;
		if(x == 13){
			WriteToCanvas(ctx);
		}
}
