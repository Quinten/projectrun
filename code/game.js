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

ngn.loadSprites = function () {
    var nLoaded = 0;
    for (var i = 0; i < ngn.sprites.length; i++){
        ngn.sprites[i].img = new Image();
        ngn.sprites[i].img.onload = function (e) {
            nLoaded++;
            if (nLoaded === ngn.sprites.length) {
                // all images have loaded
                //console.log('All images have been loaded');
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

