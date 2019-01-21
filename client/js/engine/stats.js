"use strict";

/**
 * stats.js
 *
 * handles all of the numbers to be displayed.
 */

var stats = {

    goal: -1,   //the remaining lines needed to win
    levels : -1,
    linesCleared : -1,
    score: -1,

    resetStats : function(){

        stats.goal = game.linesToWin;

        stats.levels  = 1;
        stats.linesCleared = 0;

        stats.score = 0;

    },

    incrementLinesCleared: function () {

        //limit reached, do nothing.
        if (stats.linesCleared == gameConst.LINES_CLEARED_LIMIT)
            return;

        stats.linesCleared++;

        stats.calculateGoal();

        //if the number of lines cleared is now divisble by 10,
        //make the level speed faster
        if (stats.linesCleared % 10 == 0) {
            //TODO maybe do?
            //game.incrementLevel();
        }

    },

    calculateGoal : function(){
        stats.goal = game.linesToWin - stats.linesCleared;

        if(stats.goal < 0)
            stats.goal = 0;
    }

};

