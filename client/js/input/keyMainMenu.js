/**
 * keyMainMenu.js
 *
 * key presses for the main menu
 */

var keyMainMenu = {

    executeKeyDown : function(e){

        var keyPressed = e.which;

        //a
        if(keyPressed == 65){
            screenManager.setScreenAndKeyboard(game);

            singleplayer.start10Lines();
        }

        //b
        if(keyPressed == 66){
            screenManager.setScreenAndKeyboard(game);

            singleplayer.start40Lines();
        }
        //c
        if(keyPressed == 67){

        }
        //d
        if(keyPressed == 68){


        }
        //h - high score
        if(keyPressed == 72){
            screenManager.setScreenAndKeyboard(highscore);
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
            screenManager.setScreenAndKeyboard(settings);
        }

    },

    executeKeyUp : function (e) {}

};
