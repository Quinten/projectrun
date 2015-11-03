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
var ngn = {cnvs: null, ctx: null};

ngn.sprites = [{name: 'runner', path: 'assets/sprites/runner.png', img: null},{name: 'tiles', path: 'assets/sprites/tiles.png', img: null}];

ngn.getSpriteByName = function (targetName) {
    for (var n = 0; n < ngn.sprites.length; n++) {
        if (ngn.sprites[n].name === targetName) {
            return ngn.sprites[n];
        }
    }
};

ngn.runner = {x: 96, y: 288, velocityY: 0, pixelVelocityY:0, gravity: 40, jumpPower: 240, alive: true, onGround: false, uInput: false, walkFrame: 0, aniFrame: 0};

ngn.inputStart = function () {
    console.log('input start');
/*
    if(ngn.runner.alive && !ngn.runner.uInput && ngn.runner.onGround && !sndJump.ended){
        sndJump.play();
    }else if(!ngn.runner.alive && !ngn.runner.uInput && !sndGameOver.ended){
        sndGameOver.play();
    }
    ngn.runner.uInput = true;
*/
};

ngn.inputEnd = function () {
    console.log('input end');
/*
    ngn.runner.uInput = false;
    if(paused){
        paused = false;
        restart();
    }else if(vX == 0){
        vX = 120;
        speedUp = .2;
        //document.getElementById("instructions-pane").style.display = "none";
        //document.getElementById("score-pane").style.display = "none";
    }
*/
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
    window.addEventListener('keydown', ngn.onKD, false);
    window.addEventListener('keyup', ngn.onKU, false);
    ngn.cnvs.addEventListener('touchstart', ngn.onTS, false);
    ngn.cnvs.addEventListener('touchend', ngn.onTE, false);
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

