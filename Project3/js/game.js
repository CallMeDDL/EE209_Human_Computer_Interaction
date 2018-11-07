var hockey1;
var computer;
var ball;
var point1 = 0;
var point2 = 0;
function component(width, height, color, x, y, type) {
		this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0; 
  this.x = x;
  this.y = y; 
  this.update = function() {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
function startGame() {
	myGameArea.start();
	hockey1 = new component(8, 60, "#ED2518", 20, 150);
	computer = new component(8, 60, "black", 670, 150);
	line = new component(1, 330, "black", 350, 40);
	ball = new component(30, 30, "http://cdn.w3schools.wang/smiley.gif", 10, 120, "image");
	myScore1 = new component("16px", "Consolas", "#ED2518", 200, 25, "text");
	myScore2 = new component("16px", "Consolas", "black", 410, 25, "text");

}
var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width = 700;
		this.canvas.height = 390;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 30);
		window.addEventListener('keydown', function(e) {
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function(e) {
			myGameArea.keys[e.keyCode] = false;
		})
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function() {
		clearInterval(this.interval);
	}
}
function component(width, height, color, x, y, type) {
	this.type = type;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.update = function() {
		ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
}
function updateGameArea() {
	//Hockey Control //////////////////////////////
	///////////////////////////////////////////////
	if (hockey1.y <= 0) {
		hockey1.y = 0;
	}
	if (hockey1.y >= 350) {
		hockey1.y = 350;
	}
	if (computer.y <= 0) {
		computer.y = 0;
	}
	if (computer.y >= 350) {
		computer.y = 350;
	}
	//Keyboard control /////////////////////////////
	////////////////////////////////////////////////
	if (myGameArea.keys && myGameArea.keys[38]) {
		hockey1.y -= 10;
		if (ball.crashWith(hockey1)) {
			ball.speedY = -4;
			ball.speedX = 14;
		}
	}
	if (myGameArea.keys && myGameArea.keys[40]) {
		hockey1.y += 10;
		if (ball.crashWith(hockey1)) {
			ball.speedY = 4;
			ball.speedX = 14;
		}
	}
	if (ball.y >= computer.y) {
		computer.y += 4;
		if (ball.crashWith(computer)) {
			ball.speedY = -4;
			ball.speedX = -8;
		}
	}
	if (ball.y <= computer.y) {
		computer.y -= 4;
		if (ball.crashWith(computer)) {
			ball.speedY = 4;
			ball.speedX = -8;
		}
	}
	///********BALL MOVEMENTS *************/////////
	////////////////////////////////////////////////
	ball.newPos();
	if (ball.crashWith(hockey1)) {
		ball.speedY = 0;
		ball.speedX = 13;
	} else if (ball.crashWith(computer)) {
		ball.speedY = 0;
		ball.speedX = -9;
	} else {
		ball.x += -4;
	}
	if (ball.y <= 0) {
		ball.speedY = 4;
	}
	if (ball.y >= 390) {
		ball.speedY = -4;
	}
	if (ball.x <= 2) {
		ball.x = 690;
		point2 += 1;
		//myGameArea.stop();
	}
	if (ball.x >= 700) {
		ball.x = 0;
		point1 += 1;
		//myGameArea.stop();
	}
	//			console.log(point1);
	//			console.log(point2);
	//ball.x -= 4;
	
	myGameArea.clear();
	hockey1.update();
	computer.update();
	ball.newPos();
	ball.update();
	line.update();
	myScore1.text = "SCORE: " + point1;
	myScore1.update();
	myScore2.text = "SCORE: " + point2;
	myScore2.update();
	if (point1 === 10){
		alert("You win!!!");
		location.reload();
	} 
	if (point2 === 10){
		alert("Oops! Computer wins!");
		location.reload();
	}
}