/* script file for the Canvas demo */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById('game-canvas');
    // 2d rendering context
    var ctx = canvas.getContext('2d');


    // 3. current game state
    var gameState;

    //4. create a new game state object <== Initialize: constructor
    function newGameState() {
        return {
            // an object of ball that
            ball: {
                left: 35,
                top: 10,
                width: 10,
                height: 10,
                // Define the direction
                vectorX: 1,
                vectorY: 1,
                velocity: 4
            },

            paddle: {
                left: 20,
                top: 0,
                width: 10,
                height: canvas.height / 6
            },
            // Q1: what does it do????
            lastTimestamp: performance.now()
        }
    }

    // 5. render current game state to canvas element <== get the ball state to canvas (initialize)
    function render() {
        // clears the entire canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        var ball = gameState.ball;
        // begin path
        ctx.beginPath(); // Q2: what does beginPath do?
        // draw arc
        ctx.arc(ball.left + (ball.width/2),
            ball.top + (ball.height/2),
            ball.width / 2, 0, 2 * Math.PI);
        // fill in the circle
        ctx.fill();

        // render paddle
        var paddle = gameState.paddle;
        ctx.fillRect(paddle.left, paddle.top, paddle.width, paddle.height);

    }

    //6. advance the animation by one step <== after initialize, make movement for the ball
    function step() {
        var ball = gameState.ball;

        //move the ball
        ball.left += ball.vectorX * ball.velocity;
        ball.top += ball.vectorY * ball.velocity;

        // bounce the ball back
        if(ball.left + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX
        }

        if(ball.top <= 0 || ball.top + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }

        //bounce if hit paddle
        var paddle = gameState.paddle;
        if(ball.left <= paddle.left + paddle.width) {
            // if bottom of ball is at or below top of paddle, then we'll bounce it back
            if(ball.top + ball.height >= paddle.top
                && ball.top <= paddle.top + paddle.height) {
                ball.vectorX = -ball.vectorX;
            } else {
                // game over
                ctx.font = '20px Helvetica';
                var msg = 'Game Over';

                // get width of game over text
                var metrics = ctx.measureText(msg);

                ctx.fillText(msg, (canvas.width - metrics.width)/2, (canvas.height - 20)/2);
                return false;
            }
        }
        return true;
    }

    // 7. advance the animation and redraw <== call everything we created
    function animate(timestamp) {
        var keepGoing = true;
        render();
        // advance the animation and redraw
        if(timestamp - gameState.lastTimestamp > 16) {
            keepGoing = step();
            gameState.lastTimestamp = timestamp;
        }

        // if game is still going, keep animating
        if(keepGoing) {
            requestAnimationFrame(animate);
        }
    }

    // Use mouse, not keyboard
    document.addEventListener('mousemove', function(evt) {
        var canvasY = evt.clientY - canvas.offsetTop;
        var paddle = gameState.paddle;
        paddle.top = canvasY - (paddle.height / 2);
    });

    // create a new game state
    gameState = newGameState();

    // fetch balls every 16 miliseconds
    //window.setInterval(animate, 16);

    // ask browser to animate as quickly as possible
    requestAnimationFrame(animate);






























    /*
    // 2. anything we use "fill" will be in this color set by fillStyle
    ctx.fillStyle = 'rgba(255,0,0,0.6)';
    // 1. left, top, width, height
    ctx.fillRect(20, 20, 50, 60);

    ctx.fillStyle = 'rgba(0,0,255,0.6)';
    ctx.fillRect(40,40,50,60);

    ctx.fillStyle = '#000';
    var idx;
    for(idx = 0; idx <canvas.width; idx += 20) {
        ctx.fillText(idx, idx, 10);
    }
    for(idx = 0; idx <canvas.height; idx += 20){
        ctx.fillText(idx, 0, idx);
    } */

});
