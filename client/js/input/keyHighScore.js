/**
 * keyHighScore.js
 *
 * high score screen keyboard handling
 */

var keyHighScore = {

    executeKeyDown : function(e){

        var keyPressed = e.which;

        //a
        if(keyPressed == 65){

        }

        //b
        if(keyPressed == 66){

        }
        //c
        if(keyPressed == 67){

        }
        //d
        if(keyPressed == 68){


        }
        //\ - back to main menu
        if(keyPressed == 220){
            screenManager.setScreenAndKeyboard(screenMainMenu);
        }
    },

    executeKeyUp : function (e) {}

};
