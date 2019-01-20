"use strict";

/**
 * keyboard.js
 * All keyboard presses go through here first.
 *
 * holds what the current custom keyboard is.
 */

var keyboard = {

    currentKeyboard : null,

    setKeyboard : function(nextKeyboard){
        this.currentKeyboard = nextKeyboard;
    }

};

//keydown actions
$(window).keydown(function (e) {

    if(keyboard.currentKeyboard == null)
        return;

    //get the button press
    var keyPressed = e.which;
    console.log("keyPressed: " + e.which);

    keyboard.currentKeyboard.executeKeyDown(e);

});

//keyup actions
$(window).keyup(function (e) {

    if(keyboard.currentKeyboard == null)
        return;

    var keyPressed = e.which;
    console.log("keyup: " + keyPressed);

    keyboard.currentKeyboard.executeKeyUp(e);

});
