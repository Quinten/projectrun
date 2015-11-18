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

ngn.sprites = [{name: 'runner', path: 'assets/sprites/runner.png', img: null},{name: 'tiles', path: 'assets/sprites/tiles.png', img: null}];

ngn.getSpriteByName = function (targetName) {
    for (var n = 0; n < ngn.sprites.length; n++) {
        if (ngn.sprites[n].name === targetName) {
            return ngn.sprites[n];
        }
    }
};

ngn.sndJump = {ended: true};
ngn.sndGameOver = {ended: true};

// our protagonist
ngn.runner = {x: 96, y: 288, velocityY: 0, pixelVelocityY:0, gravity: 40, jumpPower: 240, alive: true, onGround: false, uInput: false, walkFrame: 0, aniFrame: 0};

// globals floor collisions
ngn.platforms = [];
ngn.platforms[0] = {startX: -16, endX: 336, y: 288};
ngn.platforms[1] = {startX: 400, endX: 720, y: 288};

// main game loop
ngn.loop= function () {
    console.log('loop de loop');
}

// restart the game method
ngn.restart = function () {
    console.log('restarting game');
    // draw stuff
    // reset and draw platforms
    ngn.platforms[0] = {startX: -16, endX: 336, y: 288};
    ngn.platforms[1] = {startX: 400, endX: 720, y: 288};
/*
    for(var cCol = 0; cCol < 20; cCol++){
    ngn.bffr.ctx.drawImage(sprtsht, ngn.lib.tiles[4].x, ngn.lib.tiles[4].y, 16, 16, cCol*16, platforms[0].y, 16, 16);
    ngn.bffr.ctx.drawImage(sprtsht, ngn.lib.tiles[5].x, ngn.lib.tiles[5].y, 16, 16, cCol*16, platforms[0].y + 16, 16, 16);
    }
    ngn.bffr.ctx.drawImage(sprtsht, ngn.lib.tiles[2].x, ngn.lib.tiles[2].y, 16, 16, 20*16, platforms[0].y, 16, 16);
    ngn.bffr.ctx.drawImage(sprtsht, ngn.lib.tiles[3].x, ngn.lib.tiles[3].y, 16, 16, 20*16, platforms[0].y + 16, 16, 16);
    // draw the title
    ngn.bffr.ctx.drawImage(sprtsht, ngn.lib.title.x, ngn.lib.title.y, ngn.lib.title.w, ngn.lib.title.h, 52, 144, ngn.lib.title.w, ngn.lib.title.h);
*/
    // reset motion variables and actor
    ngn.vX = 0;
    ngn.fVX = 50;
    ngn.dst = 0;
    ngn.dstInt = 0;
    ngn.diff = 0;
    ngn.cpy = 16;
    ngn.speedUp = 0;
    ngn.runner = {x: 96, y: 288, velocityY: 0, pixelVelocityY:0, gravity: 2400, jumpPower: 1200, alive: true, onGround: false, uInput: false, walkFrame: 0, aniFrame: 0};
    ngn.loop(); // run frames!!!
}

// input
ngn.inputStart = function () {
    console.log('input start');
    if(ngn.runner.alive && !ngn.runner.uInput && ngn.runner.onGround && !ngn.sndJump.ended){
        ngn.sndJump.play();
    }else if(!ngn.runner.alive && !ngn.runner.uInput && !ngn.sndGameOver.ended){
        ngn.sndGameOver.play();
    }
    ngn.runner.uInput = true;
};

ngn.inputEnd = function () {
    console.log('input end');
    ngn.runner.uInput = false;
    if(ngn.paused){
        ngn.paused = false;
        ngn.restart();
    }else if(ngn.vX == 0){
        ngn.vX = 120;
        ngn.speedUp = .2;
        //document.getElementById("instructions-pane").style.display = "none";
        //document.getElementById("score-pane").style.display = "none";
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
}

ngn.onTE = function (e) {
    ngn.inputEnd();
}

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
}

ngn.loadSprites = function () {
    var nLoaded = 0;
    for (var i = 0; i < ngn.sprites.length; i++){
        ngn.sprites[i].img = new Image();
        ngn.sprites[i].img.onload = function (e) {
            nLoaded++;
            if (nLoaded === ngn.sprites.length) {
                // all images have loaded
                //console.log('All images have been loaded');
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

    //console.log(ngn.getSpriteByName("runner"));
    ngn.loadSprites();

}// end engine setup

// start engine if the window loaded
if (document.readyState === 'complete') {
    ngn.setup();
} else {
    window.onload = function () {
        ngn.setup();
    };
}

