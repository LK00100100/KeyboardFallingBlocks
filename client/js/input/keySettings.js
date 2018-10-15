/**
 * keySettings.js
 *
 * settings screen keyboard handling
 */

var keySettings = {

    executeKeyDown : function(e) {

        var keyPressed = e.which;

        //"\"
        if (keyPressed == 220) {
            screenManager.setScreenAndKeyboard(mainmenu);
        }
    },

    executeKeyUp : function (e) {}

};


