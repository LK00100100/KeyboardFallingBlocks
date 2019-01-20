"use strict";

/**
 * keyHighScore.js
 *
 * keyboard handling for screenHighScore
 */

var keyHighScore = {

    executeKeyDown : function(e){

        var keyPressed = e.which;

        //"\" - back to main menu
        if(keyPressed == 220){
            screenManager.setScreenAndKeyboard(screenMainMenu);
        }
    },

    executeKeyUp : function (e) {}

};
