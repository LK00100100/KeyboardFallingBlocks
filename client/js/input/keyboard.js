/**
 * keyboard.js
 * All keyboard presses go through here first.
 */

var keyboard = {

    currentKeyboard : null,

    setKeyboard : function(nextKeyboard){
        this.currentKeyboard = nextKeyboard;
    }

};

//keydown actions
$(window).keydown(function (e) {

    //get the button press
    var keyPressed = e.which;
    console.log("keyPressed: " + e.which);

    keyboard.currentKeyboard.executeKeyDown(e);

});

//keyup actions
$(window).keyup(function (e) {

    var keyPressed = e.which;
    console.log("keyup: " + keyPressed);

    keyboard.currentKeyboard.executeKeyUp(e);

});


