// This is the code for the game

// cross browser animation racetrack fix
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    window.oRequestAnimationFrame ||
                                    function (callback) {
                                        return window.setTimeout(callback, 17);
                                    });
}

// timing functions
var start_time = new Date().getTime(), time = getTimer(), elapsed = 0;
function getTimer () {
    return (new Date().getTime() - start_time);
}

// engine
var ngn = { cnvs: null, ctx: null, paused: false, vX: 80, fVX: 50, dst: 0, dstInt: 0, diff: 0, cpy: 16, speedUp: 0 };

ngn.sprites = [
    {name: 'runner', path: 'assets/sprites/runner.png', img: null},
    {name: 'tiles', path: 'assets/sprites/tiles.png', img: null},
    {name: 'sky', path: 'assets/sprites/sky.png', img: null},
    {name: 'gameover', path: 'assets/sprites/game-over.png', img: null},
    {name: 'startscreen', path: 'assets/sprites/start-screen.png', img: null}
];

ngn.getSpriteByName = function (targetName) {
    for (var n = 0; n < ngn.sprites.length; n++) {
        if (ngn.sprites[n].name === targetName) {
            return ngn.sprites[n];
        }
    }
};

// keep some coordinates for sprites and frames
ngn.lib = {};

ngn.sndJump = {ended: true};
ngn.sndGameOver = {ended: true};

// our protagonist
ngn.runner = {x: 96, y: 288, velocityY: 0, pixelVelocityY:0, gravity: 40, jumpPower: 240, alive: true, onGround: false, falling: false, uInput: false, walkFrame: 0, aniFrame: 0};
// animation frames of the runner
ngn.lib.runner = [];
ngn.lib.runner[0] = {x:0, y: 0}; // rest
ngn.lib.runner[1] = {x:64, y: 0}; // walk 1
ngn.lib.runner[2] = {x:128, y: 0}; // walk 2
ngn.lib.runner[3] = {x:192, y: 0}; // walk 3
ngn.lib.runner[4] = {x:256, y: 0}; // jump

// tiles for the floor
ngn.lib.tiles = [];
ngn.lib.tiles[0] = {x:0, y:0}; // left corner
ngn.lib.tiles[1] = {x:32, y:0}; // left
ngn.lib.tiles[2] = {x:64, y:0}; // right corner
ngn.lib.tiles[3] = {x:96, y:0}; // right
ngn.lib.tiles[4] = {x:128, y:0}; // top
ngn.lib.tiles[5] = {x:160, y:0}; // fill

// globals floor collisions
ngn.platforms = [];
ngn.platforms[0] = {startX: -16, endX: 336, y: 288};
ngn.platforms[1] = {startX: 416, endX: 752, y: 288};

// variables for paralax effect
ngn.sky = {x: 0};

// main game loop
ngn.loop = function () {
    // time calc
    elapsed = getTimer() - time;
    time = getTimer();
    // 12fps frame calc for walkcycle
    ngn.runner.walkFrame += elapsed; // 0, 80, 160
    if(ngn.runner.walkFrame >= 240){
        ngn.runner.walkFrame = ((ngn.runner.walkFrame - 240) < 80) ? (ngn.runner.walkFrame - 240) : 0;
    }
    // motion calc
    ngn.vX += ngn.speedUp;
    ngn.fVX = (ngn.vX * elapsed / 1000);
    if(ngn.fVX > 8){
        ngn.fVX = 8;
    }
    ngn.dst += ngn.fVX;
    ngn.diff = ngn.dst - ngn.dstInt;
    ngn.diff = ngn.diff | 0;
    ngn.dstInt += ngn.diff;
    // solid calc
    for (var p = 0; p < ngn.platforms.length; p++) {
        ngn.platforms[p].startX  = ngn.platforms[p].startX - ngn.fVX;
        ngn.platforms[p].endX = ngn.platforms[p].endX - ngn.fVX;
    }

    // draw debug background
    // sky (which is filling the canvas)
    ngn.ctx.fillStyle = "#69abd9";
    ngn.ctx.fillRect(0, 0, ngn.cnvs.width, ngn.cnvs.height);

    // parallax sky
    ngn.sky.x -= ngn.fVX / 3;
    if (ngn.sky.x < -ngn.getSpriteByName('sky').img.width) {
        ngn.sky.x += ngn.getSpriteByName('sky').img.width;
    }
    for (var s = 0; s < 2; s++) {
        ngn.ctx.drawImage(ngn.getSpriteByName('sky').img, 0, 0, ngn.getSpriteByName('sky').img.width, ngn.getSpriteByName('sky').img.height, (ngn.sky.x + (ngn.getSpriteByName('sky').img.width * s)), 0, ngn.getSpriteByName('sky').img.width, ngn.getSpriteByName('sky').img.height);

    }

    // draw debug platforms
    //ngn.ctx.fillStyle = "#83982e";
    //ngn.ctx.fillRect(ngn.platforms[0].startX, ngn.platforms[0].y, ngn.platforms[0].endX - ngn.platforms[0].startX, 32);
    //ngn.ctx.fillRect(ngn.platforms[1].startX, ngn.platforms[1].y, ngn.platforms[1].endX - ngn.platforms[1].startX, 32);

    // draw platforms from tile sprite
    var tileIndex = 0, p = 0, x = 0, y = 0;
    for (p = 0; p < ngn.platforms.length; p++) {
        for (y = 0; y < 3; y++) {
            for (x = 0; x < 11; x++) {
                if ((x == 0) && (y == 0)) {
                    tileIndex = 0;
                } else if ((x == 10) && (y == 0)) {
                    tileIndex = 2;
                } else if (x == 0) {
                    tileIndex = 1;
                } else if (x == 10) {
                    tileIndex = 3;
                } else if (y == 0) {
                    tileIndex = 4;
                } else {
                    tileIndex = 5;
                }
                ngn.ctx.drawImage(ngn.getSpriteByName('tiles').img, ngn.lib.tiles[tileIndex].x, ngn.lib.tiles[tileIndex].y, 32, 32, ngn.platforms[p].startX + (x * 32), ngn.platforms[p].y + (y * 32), 32, 32);
            }
        }
    }

    // player
    // jump
    if(ngn.runner.uInput && ngn.runner.onGround){
        ngn.runner.velocityY = - ngn.runner.jumpPower;
        ngn.runner.onGround = false;
        ngn.sndJump.play();
    }
    ngn.runner.velocityY += ngn.runner.gravity * elapsed / 1000;
    ngn.runner.pixelVelocityY = Math.round((ngn.runner.velocityY * elapsed / 1000));
    ngn.runner.y += ngn.runner.pixelVelocityY;
    // bounce player of platform
    if(ngn.runner.alive && !ngn.runner.falling){
        for (var p = 0; p < 2; p++){
            if(ngn.platforms[p].startX < (ngn.runner.x + 12) && ngn.platforms[p].endX > (ngn.runner.x - 12) && ngn.runner.y > ngn.platforms[p].y){
                ngn.runner.y = ngn.platforms[p].y;
                ngn.runner.velocityY = ngn.runner.pixelVelocityY = 0;
                ngn.runner.onGround = true;
            }
        }
    }
    // player falls between platforms ?
    if(ngn.runner.y > ngn.platforms[0].y && ngn.runner.y > ngn.platforms[1].y){
        ngn.runner.falling = true;
    }
    if(ngn.runner.falling && ngn.runner.y > 384){
        if(ngn.runner.alive){
            // draw the gameover title
            ngn.ctx.drawImage(ngn.getSpriteByName('gameover').img, 0, 0, 320, 320, 0, 0, 320, 320);
            ngn.sndGameOver.play();
            ngn.paused = true;
            ngn.runner.alive = false;
            // highscore stuff
            document.getElementById("score").innerHTML = ngn.dstInt;
            var highscore = localStorage.getItem("highscore") || 0;
            if ( highscore === 0 ) {
                localStorage.setItem("highscore", ngn.dstInt);
                document.getElementById("first-highscore").style.display = "block";
                document.getElementById("new-highscore").style.display = "none";
                document.getElementById("no-new-highscore").style.display = "none";
            } else if ( ngn.dstInt > highscore ) {
                localStorage.setItem("highscore", ngn.dstInt);
                document.getElementById("first-highscore").style.display = "none";
                document.getElementById("new-highscore").style.display = "block";
                document.getElementById("no-new-highscore").style.display = "none";
                document.getElementById("old-highscore").innerHTML = highscore;
                document.getElementById("current-highscore").innerHTML = highscore;
            } else {
                document.getElementById("first-highscore").style.display = "none";
                document.getElementById("new-highscore").style.display = "none";
                document.getElementById("no-new-highscore").style.display = "block";
                document.getElementById("old-highscore").innerHTML = highscore;
                document.getElementById("current-highscore").innerHTML = highscore;
            }
            document.getElementById("score-pane").style.display = "block";
            return;
        }
    }

    if(ngn.vX == 0){
        ngn.runner.aniFrame = 0;
    }else if(ngn.runner.onGround){
        ngn.runner.aniFrame = 1 + ((ngn.runner.walkFrame / 80) | 0);
    }else{
        ngn.runner.aniFrame = 4;
    }

    // draw player debug
    //ngn.ctx.fillStyle = "#e12f34";
    //ngn.ctx.fillRect(ngn.runner.x - 32, ngn.runner.y - 64, 64, 64);

    // draw player from sprite
    ngn.ctx.drawImage(ngn.getSpriteByName('runner').img, ngn.lib.runner[ngn.runner.aniFrame].x, ngn.lib.runner[ngn.runner.aniFrame].y, 64, 64, ngn.runner.x - 32, ngn.runner.y - 64, 64, 64);

    if(ngn.vX == 0 && ngn.runner.alive){
        // draw the startscreen
        ngn.ctx.drawImage(ngn.getSpriteByName('startscreen').img, 0, 0, 320, 320, 0, 0, 320, 320);
    }

    window.requestAnimationFrame(ngn.loop, ngn.cnvs);

    // check if platforms moved out of canvas
    for (var p = 0; p < ngn.platforms.length; p++) {
        if(ngn.platforms[p].endX < -32){
            ngn.platforms[p].startX = ngn.platforms[((p == 0) ? 1 : 0)].endX + (480 * ngn.vX / 1000);
            ngn.platforms[p].endX = ngn.platforms[p].startX + 352;
            ngn.platforms[p].y = 288 - ((Math.random() * 48) | 0);
        }
    }

};// End loop

// restart the game method
ngn.restart = function () {
    // reset platforms
    ngn.platforms[0] = {startX: -16, endX: 336, y: 288};
    ngn.platforms[1] = {startX: 416, endX: 768, y: 288};
    // reset motion variables and actor
    ngn.vX = 0;
    ngn.fVX = 50;
    ngn.dst = 0;
    ngn.dstInt = 0;
    ngn.diff = 0;
    ngn.cpy = 16;
    ngn.speedUp = 0;
    ngn.runner = {x: 96, y: 288, velocityY: 0, pixelVelocityY:0, gravity: 2400, jumpPower: 1200, alive: true, onGround: false, falling:false, uInput: false, walkFrame: 0, aniFrame: 0};
    // reset background
    ngn.sky.x = 0;

    ngn.loop(); // run frames!!!
};

// input
ngn.inputStart = function () {
    if(ngn.runner.alive && !ngn.runner.uInput && ngn.runner.onGround && !ngn.sndJump.ended){
        ngn.sndJump.play();
    }else if(!ngn.runner.alive && !ngn.runner.uInput && !ngn.sndGameOver.ended){
        ngn.sndGameOver.play();
    }
    ngn.runner.uInput = true;
};

ngn.inputEnd = function () {
    ngn.runner.uInput = false;
    if(ngn.paused){
        ngn.paused = false;
        ngn.restart();
    }else if(ngn.vX == 0){
        ngn.vX = 120;
        ngn.speedUp = .2;
        document.getElementById("instructions-pane").style.display = "none";
        document.getElementById("score-pane").style.display = "none";
    }
};

// keyboard
ngn.onKD = function (e) {
    if (e.keyCode == 32) {
        ngn.inputStart();
    }
};

ngn.onKU = function (e) {
    if (e.keyCode == 32) {
        ngn.inputEnd();
    }
};

// touch
ngn.onTS = function (e) {
    ngn.inputStart();
};

ngn.onTE = function (e) {
    ngn.inputEnd();
};

ngn.init = function () {
    // grab the sounds
    // TODO test what happens when audio elements are removed from index.html
    if (document.getElementById("jump")) {
        ngn.sndJump = document.getElementById("jump");
    }
    if (document.getElementById("gameover")) {
        ngn.sndGameOver = document.getElementById("gameover");
    }
    // add the input events
    window.addEventListener('keydown', ngn.onKD, false);
    window.addEventListener('keyup', ngn.onKU, false);
    ngn.cnvs.addEventListener('touchstart', ngn.onTS, false);
    ngn.cnvs.addEventListener('touchend', ngn.onTE, false);
    // now we can start the game
    ngn.restart();
};

ngn.loadSprites = function () {
    var nLoaded = 0;
    for (var i = 0; i < ngn.sprites.length; i++){
        ngn.sprites[i].img = new Image();
        ngn.sprites[i].img.onload = function (e) {
            nLoaded++;
            if (nLoaded === ngn.sprites.length) {
                // all images have loaded
                ngn.init();
            }
        };
        ngn.sprites[i].img.src = ngn.sprites[i].path;
    }
};

ngn.setup = function() {
    // grab the canvas and drawing context
    ngn.cnvs = document.getElementById("c");
    if (!ngn.cnvs || !ngn.cnvs.getContext) {
        return;
    }
    ngn.ctx = ngn.cnvs.getContext("2d");
    if (!ngn.ctx) {
        return;
    }
    ngn.cnvs.width = 320;
    ngn.cnvs.height = 320;
    //disable smoothing
    ngn.cnvs.style["image-rendering"] = "-webkit-optimize-contrast";
    ngn.ctx.mozImageSmoothingEnabled = false;

    // rest of setup
    // draw a blue background for now
    ngn.ctx.fillStyle = "#69abd9";
    ngn.ctx.fillRect(0, 0, ngn.cnvs.width, ngn.cnvs.height);

    ngn.loadSprites();

};// end engine setup

// start engine if the window loaded
if (document.readyState === 'complete') {
    ngn.setup();
} else {
    window.onload = function () {
        ngn.setup();
    };
}
