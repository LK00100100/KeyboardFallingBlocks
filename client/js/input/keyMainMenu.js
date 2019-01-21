"use strict";

/**
 * keyMainMenu.js
 *
 * keyboard handling for screenMainMenu
 */

var keyMainMenu = {

    executeKeyDown : function(e){

        var keyPressed = e.which;

        //b
        if(keyPressed == 66){
            screenManager.setScreenAndKeyboard(screenGame);

            singleplayer.start40Lines();
        }

        //h - high score
        if(keyPressed == 72){
            screenManager.setScreenAndKeyboard(screenHighScore);
        }

        //g - github
        if(keyPressed == 71){
            window.open("https://github.com/00100100/KeyboardFallingBlocks");
        }

        //m - manual
        if(keyPressed == 77){
            window.open("./manual_READ_FIRST.txt");
        }

        //s - settings
        if(keyPressed == 83){
            screenManager.setScreenAndKeyboard(screenSettings);
        }

    },

    executeKeyUp : function (e) {}

};
