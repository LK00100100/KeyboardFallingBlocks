"use strict";

/**
 * timing.js
 *
 * handles all of the game's timing.
 */

var timing = {

    //TIMING INFO
    FPS: 30,                //30 frames per second
    currentTick: 0,
    animationInterval: -1,
    animationTimeout: -1, 	// 100 = 100 milliseconds or 10 times a second, i set it to 30 SPF

    init : function (){

        //equals "seconds per frame"
        timing.animationTimeout = 1000 / timing.FPS;

    },

    /**
     * A control loop that runs at a fixed period of time
     * this does the game calculations
     */
    calculationLoop: function () {
        //note: careful when you use the "this" keyword in this method. 'this' is global.

        if (!game.running)
            return;

        timing.currentTick++;

        var frameSecond = (1 / timing.FPS);

        timing.setTimer(frameSecond);

        //process user keyboard inputs (in order)
        for (var i = 0; i < game.commands.length; i++) {
            game.processInput(game.commands.shift());
        }

    },

    resetTiming : function(){

        timing.time = 0;
        timing.currentTick = 0;

    },

    setTimer : function (deltaTime) {

        if(timing.time == 9999.99)
            return;

        timing.time += deltaTime;

        if(timing.time > 9999.99)
            timing.time = 9999.99;

    }

};

