var canvas;
var ctx;
var ballX = 400;
var ballY = 300;
var ballSpeedX = 4;        
var ballSpeedY = 3;
var rand = 4500;

var player1Score = 0;
var player2Score = 0;
var winningScore = 5;

var showingWinScreen = false;
var showingStartScreen = true;

var paddle1Y = 250;
var paddle2Y = 250;
var paddleHeight = 100;
var paddleWidth = 12;

var isMute = true;

//Mute all audio by default
Howler.mute(true);

//Ball-hits-paddle sound
Howler.volume(1);
var boing = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Fball.wav?1527824349150", "https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Fball.mp3?1527993739057"],
    volume: 0.7,
    mute: true
});  

//Rebound/bounce audio
var bounce = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Fbounce.mp3?1527904516843"],
    volume: 0.7,
    mute: true
});  

//Game win sound
var cheer = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Fcheer.mp3?1527904518863"],
    volume: 0.3,
    mute: false
});  

//Game loss sound
var lose = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Flose.mp3?1527904521850"],
    volume: 0.3
});  

//Gasp sound (on losing point)
Howler.volume(0.6);
var gasp = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Fgasp.mp3?1527904516771"],
    volume: 0.8
});  

//Score point sound
Howler.volume(0.6);
var score = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Fscore.mp3?1527904522149"],
    volume: 0.3
}); 

//Firework
Howler.volume(0.6);
var firework = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Ffirework.mp3?1527911389284"],
    volume: 1.5
}); 

//Music
var organ = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Forgan.mp3?1527904523705"],
    mute: false,
    preload: true,
    volume: 0.5,
    loop: true
});  

//Crowd
var crowd = new Howl({
    src: ["https://cdn.glitch.com/9b339c53-cf5a-4254-af3f-084fcb069257%2Fcrowd.mp3?1527913912515"],
    mute: false,
    preload: true,
    volume: 0.7,
    loop: true
}); 

//AUDIO unmute
document.getElementById("speakerOff").addEventListener("click", function() {
    document.getElementById("overlay").style.visibility = "hidden";
    Howler.mute(false);
    organ.play();
    crowd.play();
    boing.mute(false);
    bounce.mute(false);
    isMute = false;
    document.getElementById("speakerOff").style.visibility = "hidden";
    document.getElementById("speakerOn").style.visibility = "visible";
    document.getElementById("umpire").classList.add("sway");
});

//AUDIO mute
document.getElementById("speakerOn").addEventListener("click", function() {
    Howler.mute(true);
    organ.stop();
    crowd.stop();
    isMute = true;
    document.getElementById("speakerOn").style.visibility = "hidden";
    document.getElementById("speakerOff").style.visibility = "visible";
    document.getElementById("umpire").classList.remove("sway");
});


//IMPORTANT!
function calculateMousePosition(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    // var mouseY = evt.clientY - rect.top - root.scrollTop;
    var mouseY = evt.clientY - rect.top;
    return {
        x:mouseX,
        y:mouseY
    }            
}; 

function handleMouseClick() {
    if (showingStartScreen) {
        player1Score = 0;
        document.getElementById("p1Score").innerHTML = player1Score;
        player2Score = 0;
        document.getElementById("p2Score").innerHTML = player2Score;
        document.getElementById("p1Score").classList.remove("spin");
        document.getElementById("p2Score").classList.remove("spin");
        document.getElementById("tail").classList.remove("wag");
        document.getElementById("tail").style.transform = "rotate(0deg)";
        showingWinScreen = false;
        showingStartScreen = false;
        document.getElementById("setWins").style.visibility = "hidden";
        document.getElementById("clickPlay").style.visibility = "hidden";
        document.getElementById("mWins").style.visibility = "hidden";
        document.getElementById("lWins").style.visibility = "hidden";
        firework.play();
        document.getElementById("umpire").classList.remove("sway");
    }
    if (showingWinScreen) {
        player1Score = 0;
        document.getElementById("p1Score").innerHTML = player1Score;
        player2Score = 0;
        document.getElementById("p2Score").innerHTML = player2Score;
        document.getElementById("p1Score").classList.remove("spin");
        document.getElementById("p2Score").classList.remove("spin");
        document.getElementById("tail").classList.remove("wag");
        document.getElementById("tail").style.transform = "rotate(0deg)";
        showingWinScreen = false;
        showingStartScreen = true;
        document.getElementById("setWins").style.visibility = "hidden";
        document.getElementById("clickPlay").style.visibility = "hidden";
        document.getElementById("mWins").style.visibility = "visible";
        document.getElementById("lWins").style.visibility = "visible";
    }
}


window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    var framesPerSecond = 59;

    //Handle transparent overlay that indicates audio mute/unmute button
    setTimeout(function() {
        document.getElementById("speakerOff").classList.add("shake1");
    }, 800);
    setTimeout(function() {
        document.getElementById("speakerOff").classList.remove("shake1");
    }, 2000);

    setTimeout(function() {
        document.getElementById("overlay").style.opacity = "0";
    }, 800);

    setTimeout(function() {
        document.getElementById("overlay").style.visibility = "hidden";
    }, 1700);

    //Force-refresh fix for iOS problems on device orientation change
    window.onorientationchange = function() {
        window.location.reload();
    };
   
    //Smooth animation method, as per https://css-tricks.com/using-requestanimationframe/
    function repeatOften() {
        moveEverything();
        drawEverything();
        requestAnimationFrame(repeatOften);
    }
    repeatOften();            

    // Previous animation method, as per tutorial
    // setInterval(function() {
    //     moveEverything();
    //     drawEverything();
    // }, 1000/framesPerSecond);

    canvas.addEventListener("mousedown", handleMouseClick);

    document.getElementById("clickPlay").addEventListener("mousedown", handleMouseClick);
    document.getElementById("setWins").addEventListener("mousedown", handleMouseClick);
    document.getElementById("mWins").addEventListener("mousedown", function() {
        
        //Play sound
        boing.mute(false);
        boing.rate(1);
        boing.play();

        if (winningScore == 20) {
            winningScore = 20;
            boing.rate(.6);
            document.getElementById("showScore").style.marginLeft = "0";
        }
        if (winningScore >= 1 && winningScore < 20) {
            winningScore++;
            
            //Animate upper score selection arrow
            document.getElementById("mWins").style.filter = "drop-shadow(0px 0px 0px black)";
            document.getElementById("mWins").style.top = "468px";
            setTimeout(function() {
                document.getElementById("mWins").style.filter = "drop-shadow(-2px -2px 2px black)";
                document.getElementById("mWins").style.top = "465px";
            }, 50)

            document.getElementById("lWins").style.opacity = "1";
            document.getElementById("mWins").style.opcaity = "1"; 
            if (winningScore >= 10) {
                document.getElementById("setWins").style.marginLeft = "-215px";
                document.getElementById("showScore").style.marginLeft = "0";
                document.getElementById("showScore").style.marginRight = "0";
            } 
            
            if (winningScore == 20) {
            document.getElementById("mWins").style.opacity = "0.8"; 
            document.getElementById("mWins").style.filter = "drop-shadow(1px 1px 1px black)";
            }
        }
        document.getElementById("showScore").innerHTML = winningScore;
    });

        document.getElementById("lWins").addEventListener("mousedown", function() {
            
            //Play sound
            boing.mute(false);
            boing.rate(0.85);
            boing.play();

            if (winningScore == 1) {
                winningScore = 1;
                boing.rate(.6);
            }

            if (winningScore > 1) {
                winningScore--;

                //Animate lower score selection arrow
                document.getElementById("lWins").style.filter = "drop-shadow(0px 0px 0px black)";
                document.getElementById("lWins").style.top = "568px";
                setTimeout(function() {
                    document.getElementById("lWins").style.filter = "drop-shadow(2px 2px 2px black)";
                    document.getElementById("lWins").style.top = "565px";
                }, 50)

                document.getElementById("mWins").style.opacity = "1";
                if (winningScore >= 10) {
                } else if (winningScore < 10) {
                    document.getElementById("setWins").style.marginLeft = "-195px";
                }

                if (winningScore == 1) {
                    document.getElementById("lWins").style.opacity = "0.8"; 
                    document.getElementById("lWins").style.filter = "drop-shadow(1px 1px 1px black)";
                }
            }
  

            document.getElementById("showScore").innerHTML = winningScore;
        });
        var timefragment = 0;
        var nowts = 0;
        window.addEventListener("deviceorientation", 
            function (evt) {
                nowts = new Date().getTime();
                if (nowts > 37) {
                    timefragment = nowts;
                    var alpha = evt.alpha;
                    var beta = evt.beta;
                    var gamma = evt.gamma;
                    var move1 = 0;
                    var move2 = 0;

                    if (ballX < 400) {
                        var move1 = gamma / 90 * 35;
                    }
                    if (ballX > 400) {         
                        var move2 = gamma / 90 * 30;
                    }
                    paddle1Y += move1;
                    paddle2Y += move2;
                    if (paddle1Y < 0 ) {
                        paddle1Y = 0 ;
                    } else if (paddle1Y >  canvas.height-paddleHeight) {
                        paddle1Y =  canvas.height - paddleHeight;
                    }
                    if (paddle2Y < 0 ) {
                        paddle2Y = 0 ;
                    } else if (paddle2Y >  canvas.height-paddleHeight) {
                        paddle2Y =  canvas.height - paddleHeight;
                    }
                }
            }, false);
    //Blink umpire's eyes
    setInterval(function blink() {
       document.getElementById("shiny1").style.visibility = "hidden";
       document.getElementById("shiny2").style.visibility = "hidden";
       document.getElementById("eyeleft").style.transition = "all 50ms ease-out";
       document.getElementById("eyeleft").style.height = "2px";
       document.getElementById("eyebrowLeft").style.transform = "skew(0,0deg)";
       document.getElementById("eyeright").style.transition = "all 50ms ease-out";
       document.getElementById("eyeright").style.height = "2px";
       document.getElementById("eyebrowRight").style.transform = "skew(0,0deg)";
       
       setTimeout(function() {
       document.getElementById("shiny1").style.visibility = "visible";
       document.getElementById("shiny2").style.visibility = "visible";
       document.getElementById("eyeleft").style.transition = "all 50ms ease-out";
       document.getElementById("eyeleft").style.height = "15px";
       document.getElementById("eyebrowLeft").style.transform = "skew(0,-20deg)";
       document.getElementById("eyeright").style.transition = "all 50ms ease-out";
       document.getElementById("eyeright").style.height = "15px";              
       document.getElementById("eyebrowRight").style.transform = "skew(0,20deg)";
       }, 150);
    }, rand);

}  //window.onload 


function ballReset() {      

    if (player1Score >= winningScore) {
        document.getElementById("p1Score").innerHTML = player1Score;
        document.getElementById("p2Score").innerHTML = player2Score;
        showingWinScreen = true;
        cheer.play();
    }

    if (player2Score >= winningScore) {
        document.getElementById("p1Score").innerHTML = player1Score;
        document.getElementById("p2Score").innerHTML = player2Score;
        showingWinScreen = true;
        lose.play();
    }

    ballSpeedX = -ballSpeedX;
    ballSpeedY = 3;
    ballX = canvas.width/2;
    ballY = canvas.height/2;

    //Umpire's reaction to ball being scored 
    document.getElementById("shiny1").style.visibility = "hidden";
    document.getElementById("shiny2").style.visibility = "hidden";
    document.getElementById("nose").style.top = "236px";
    document.getElementById("eyeleft").style.transition = "all 50ms ease-out";
    document.getElementById("eyeleft").style.height = "2px";
    document.getElementById("eyebrowLeft").style.transform = "skew(0,15deg)";
    document.getElementById("eyeright").style.transition = "all 50ms ease-out";
    document.getElementById("eyeright").style.height = "2px";
    document.getElementById("eyebrowRight").style.transform = "skew(0,-15deg)";

    setTimeout (function() {
        document.getElementById("shiny1").style.visibility = "visible";
        document.getElementById("shiny2").style.visibility = "visible";
        document.getElementById("nose").style.top = "245px";
        document.getElementById("eyeleft").style.transition = "all 50ms ease-out";
        document.getElementById("eyeleft").style.height = "15px";
        document.getElementById("eyebrowLeft").style.transform = "skew(0,-20deg)";
        document.getElementById("eyeright").style.transition = "all 50ms ease-out";
        document.getElementById("eyeright").style.height = "15px";
        document.getElementById("eyebrowRight").style.transform = "skew(0,20deg)";
    }, 600);  

} //function ballReset


// function computerMovement() {
    
//     var paddle2YCenter = paddle2Y + (paddleHeight/2);
    
//     if (paddle2YCenter < ballY-35) {
//         paddle2Y += 5;
//     } else if (paddle2YCenter > ballY+35) {
//         paddle2Y -= 5;
//     }
// }


function moveEverything() {

    if (showingStartScreen) {
        return;
    }

    if (showingWinScreen) {
        return;
    }

    // computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballX <= 0) {          
        
        //Ball hits left paddle
        if (ballY > paddle1Y-10 && ballY < paddle1Y+paddleHeight+10) {
            //Reverse ball direction
            ballSpeedX = -ballSpeedX;

            //Play ball-paddle sound
            boing.rate(1);
            boing.play();

            colorRect(0, paddle1Y, paddleWidth, paddleHeight, "white");
       
            //Calculates variable ball speed depending on collision point with paddle
            var deltaY = ballY-(paddle1Y+paddleHeight/2);
            ballSpeedY = deltaY * 0.35;

            //PING! animation on left-paddle collision
            if (isMute == true) {
                document.getElementById("pingLeft").style.top = canvas.offsetTop + ballY + "px";
                document.getElementById("pingLeft").style.left = canvas.offsetLeft + ballX-80 + "px";
                document.getElementById("pingLeft").style.visibility = "visible";
                document.getElementById("pingLeft").classList.add("ping");
                setTimeout(function() {
                    document.getElementById("pingLeft").classList.remove("ping");
                    document.getElementById("pingLeft").style.visibility = "hidden";
                }, 800);
            } else {
                document.getElementById("pingLeft").style.visibility = "hidden";
            }

        } else {     
            document.querySelector("canvas").style.border = "8px solid black";
            player2Score++;  
            gasp.play();
            ballReset();
            document.getElementById("p2Score").innerHTML = player2Score;

            //Point tail to player 2 score
            document.getElementById("tail").style.transform = "rotate(15deg)";
            
            //Animate score of player 2
            document.getElementById("p2Score").classList.add("grow");
            setTimeout(function() {
                document.getElementById("p2Score").classList.remove("grow");
            }, 2000);
           
            //Shake canvas upon player 2 scoring
            document.querySelector("canvas").classList.add("shake");
            setTimeout(function() {
                document.querySelector("canvas").classList.remove("shake");
            }, 500);
        }
    }

    if (ballX >= canvas.width - 30
        ) {
        
        //Ball hits right paddle
        if (ballY > paddle2Y-10 && ballY < paddle2Y+paddleHeight+10) {
            ballSpeedX = -ballSpeedX;

            //Play ball-paddle sound
            boing.rate(0.9);
            boing.play();
            
            var deltaY = ballY-(paddle2Y+paddleHeight/2);
            ballSpeedY = deltaY * 0.35;

            //PONG! animation on right-paddle collision
            if (isMute == true) {
                document.getElementById("pongRight").style.top = canvas.offsetTop + ballY + "px";
                document.getElementById("pongRight").style.left = canvas.offsetLeft + ballX+20 + "px";
                document.getElementById("pongRight").style.visibility = "visible";
                document.getElementById("pongRight").classList.add("ping");
                setTimeout(function() {
                    document.getElementById("pongRight").classList.remove("ping");
                    document.getElementById("pongRight").style.visibility = "hidden";
                }, 800);
            } else {
                document.getElementById("pongRight").style.visibility = "hidden";
            }                      

        } else {        
            document.querySelector("canvas").style.border = "8px solid yellow";        
            player1Score++;
            score.play();
            ballReset();
            document.getElementById("p1Score").innerHTML = player1Score;

            //Point tail to player 1 score
            document.getElementById("tail").style.transform = "rotate(-15deg)";

            //Animate score of player 2
            document.getElementById("p1Score").classList.add("grow");
            setTimeout(function() {
                document.getElementById("p1Score").classList.remove("grow");
            }, 2000);

            //Animate canvas upon player 1 scoring
            document.querySelector("canvas").classList.add("cheer");
            setTimeout(function() {
                document.querySelector("canvas").classList.remove("cheer");
            }, 1000);
        }
    }
    
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;

        //Play bounce sound on hitting top boundary
        bounce.rate(1);
        bounce.play();

        //Animate top border hit detection
        document.getElementById("particlesY").style.top = canvas.offsetTop-20 + "px";
        document.getElementById("particlesY").style.left = canvas.offsetLeft + ballX + "px";
        document.getElementById("particlesY").style.visibility = "visible";
        document.getElementById("particlesY").classList.add("ricoTop");
        setTimeout(function() {
            document.getElementById("particlesY").classList.remove("ricoTop");
            document.getElementById("particlesY").style.visibility = "hidden";
        }, 250);
    }

    if (ballY >= canvas.height - 30) {
        ballSpeedY = -ballSpeedY;
        
        //Play bounce sound on hitting bottom boundary
        bounce.rate(1);
        bounce.play();

        //Animate bottom border hit detection
        document.getElementById("particlesYb").style.top = canvas.offsetTop + canvas.height+20 + "px";
        document.getElementById("particlesYb").style.left = canvas.offsetLeft + ballX + "px";
        document.getElementById("particlesYb").style.visibility = "visible";
        document.getElementById("particlesYb").classList.add("ricoBottom");
        setTimeout(function() {
            document.getElementById("particlesYb").classList.remove("ricoBottom");
            document.getElementById("particlesYb").style.visibility = "hidden";
        }, 500); 
    }
    
    //Umpire's eyes follow ball
    if (ballX < 400) {
        document.getElementById("eyeleft").style.marginLeft = "-35px"; 
        document.getElementById("nose").style.marginLeft = "-17px";  
        document.getElementById("eyeright").style.marginLeft = "3px";
    }
    if (ballX > 400) {         
        document.getElementById("eyeleft").style.marginLeft = "-20px"; 
        document.getElementById("nose").style.marginLeft = "0px";  
        document.getElementById("eyeright").style.marginLeft = "18px";   
    }

} //function moveEverything


function drawEverything() {
    
    //Hides canvas on browsers less than 810px wide
    if (window.matchMedia("(max-width: 810px)").matches) {
        document.getElementById("setWins").style.visibility = "hidden";
        document.getElementById("clickPlay").style.visibility = "hidden";
        document.getElementById("mWins").style.visibility = "hidden";
        document.getElementById("lWins").style.visibility = "hidden";
      
document.getElementById("windowAlert").style.visibility = "visible";
    }         

    //Canvas play area
    colorRect(0, 0, canvas.width, canvas.height, "#b3f0ff");

      if (showingWinScreen) {
        ctx.fillStyle = "yellow";
        ctx.font = "60px Modak";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 9;
        ctx.lineWidth = 5;

        if (player1Score >= winningScore) {
            ctx.fillText("Simply frabjous!", 180, 250);
            document.getElementById("p1Score").classList.add("spin");
    
        } if (player2Score >= winningScore) {
            ctx.fillText("Inconceivable!", 205, 250);
            document.getElementById("p2Score").classList.add("spin");
        }                  

        ctx.fillStyle = "salmon";
        ctx.font = "40px Modak";
        ctx.fillText("Click to try again!", 240, 350);

        document.getElementById("eyeleft").style.marginLeft = "-30px";
        document.getElementById("nose").style.marginLeft = "-10px";
        document.getElementById("eyeright").style.marginLeft = "10px";          

        return;
      }


    // Startscreen TEST
    if (showingStartScreen) {

        document.getElementById("tail").classList.add("wag");

        if (window.matchMedia("(min-width: 810px)").matches) {
        document.getElementById("setWins").style.visibility = "visible";
        document.getElementById("clickPlay").style.visibility = "visible";
        document.getElementById("mWins").style.visibility = "visible";
        document.getElementById("lWins").style.visibility = "visible";       
          document.getElementById("windowAlert").style.visibility = "hidden";

        //Paddle left
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        colorRect(0, paddle1Y, paddleWidth, paddleHeight, "yellow");

        //Paddle right
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        colorRect(canvas.width-11, paddle2Y, paddleWidth, paddleHeight, "yellow");              

        return;
        }
    }
   
    //Draw ball
    colorCircle(ballX, ballY, 10, "black");
    //colorCircle(ballX, ballY, 8, "white");

    //Draw left paddle
    ctx.shadowColor = "black";
    ctx.shadowBlur = 4;
    colorRect(0, paddle1Y, paddleWidth, paddleHeight, "yellow");
   
    //Draw right paddle
    ctx.shadowColor = "black";
    ctx.shadowBlur = 4;
    colorRect(canvas.width-11, paddle2Y, paddleWidth, paddleHeight, "yellow");
 
    //Draw net
    ctx.shadowColor = "black";
    ctx.shadowBlur = 0;
    ctx.lineWidth = 2; 
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.setLineDash([10,15]);
    ctx.moveTo(400,520);
    ctx.lineTo(400,20);
    ctx.stroke();
    ctx.fill();              

} //function drawEverything


//Circle drawing template
function colorCircle(centerX, centerY, radius, drawColor) {
    //ctx.fillStyle = drawColor;
    //ctx.beginPath();
    //ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    var img = new Image();
    img.src = "ball.png";
    ctx.drawImage(img, centerX, centerY, 40, 40);
    ctx.fill();
}

//Rectangle drawing template
function colorRect(leftX, topY, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX, topY, width, height);
}