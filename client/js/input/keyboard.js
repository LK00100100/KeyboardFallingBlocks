/**
 * keyboard.js
 * Deals with all keyboard-related stuff
 */

var keyboard = {

    //the order of the 40 action keys.
    //rotate - clockwise # times
    //col - column to place, upper-left corner of piece
    //[rotate amount][col location]
    keyOrder: [
        [49, 50, 51, 52, 53, 54, 55, 56, 57, 48],
        [81, 87, 69, 82, 84, 89, 85, 73, 79, 80],
        [65, 83, 68, 70, 71, 72, 74, 75, 76, 59],
        [90, 88, 67, 86, 66, 78, 77, 188, 190, 191]
    ],

    isInKeyOrder: function(key){
        if(this.getKeyRotation(key) == -1)
            return false;

        return true;
    },

    //returns the number of rotations for a key
    getKeyRotation: function(key) {
        var row;

        for(row = 0; row < this.keyOrder.length; row++){

            if(this.keyOrder[row].indexOf(key) != -1)
                return row;
        }
        return -1;
    },

    //returns the column location for a key
    getKeyColumn: function(key, row) {
        return this.keyOrder[row].indexOf(key);
    },

    executeKeyAction: function(keyPressed){
        var numRotations = this.getKeyRotation(keyPressed);
        var row = numRotations;

        var numCols = this.getKeyColumn(keyPressed, row);

        game.commands.push({rotate: numRotations, col: numCols});
    },

    //shift, "hold" (if it wasn't recently used)
    shiftKeyFunction: function () {
        keyboard.nullifyCommands();

        game.commands.push({hold: true});
    },

    //space, "cancel"
    spaceKeyFunction: function () {  //space, "cancel", erase all commands
        keyboard.nullifyCommands();
    },

    /*
     * the keys that are currently being pressed are inert
     * all commands in queue are not executed.
     */
    nullifyCommands: function () {
        keyboard.activeKeys = [];
        game.commands = [];
    },

    /*
     * these help notify if the key is already being pressed dwon
     * so we don't keep calling it again and again.
     * this will make sure keydown activates only once.
     */
    isPressed : {},

    /*
     * notes if the key-up should be used or ignored
     * if the key's been cancelled or hard-dropped by another piece on the frame,
     * then these keys should be nullified.
     */
    activeKeys: []

};

//keydown actions
$(window).keydown(function (e) {

    //get the button press
    var keyPressed = e.which;
    console.log("keyPressed: " + e.which);

    //TODO consolidate screens code

    if(mainmenu.inMenu){
        mainmenu.executeKeyAction(e.which);
        return;
    }

    if(highscore.inHighScore){
        highscore.executeKeyAction(e.which);
        return;
    }

    // forward slash - prevent default "quick find" for firefox.
    // quotes - prevent quick find
    if (keyPressed == 191 || keyPressed == 222) {
        e.preventDefault();
    }


    //\ - go back to main menu
    if(keyPressed == 220){
        game.goToMainMenu();
    }

    //enter pressed
    //reset game
    if(keyPressed == 13){
        game.endAndResetGame();
    }

    //shift (hold a piece)
    if(keyPressed == 16){
        keyboard.shiftKeyFunction();
    }

    //space (cancel commands)
    if (keyPressed == 32) {
        console.log("space pressed");

        keyboard.spaceKeyFunction();
    }

    //if this key is not being currently pressed

    //if 40-key doesn't exist, leave
    if(keyboard.isInKeyOrder(keyPressed) == false){
        return;
    }

    //40-key exists
    if (keyboard["isPressed"][keyPressed] == false) {
        keyboard["isPressed"][keyPressed] = true;

        keyboard.nullifyCommands();

        keyboard.activeKeys.push(keyPressed);

        keyboard.executeKeyAction(keyPressed);
        //keyboard[keyPressed].call();
    }

});

//keyup actions
$(window).keyup(function (e) {

    var keyPressed = e.which;
    keyboard["isPressed"][keyPressed] = false;

    //TODO disable this
    console.log("keyup:" + keyPressed);

    //hold (shift)
    if (keyPressed == 16) {
        console.log("keyup:" + keyPressed + "CALL");

        keyboard.shiftKeyFunction();
        return;
    }

    //if the key released isn't nullified
    //finalize the move and do a hard-drop
    //active hard-drop
    if (keyboard.activeKeys.indexOf(keyPressed) != -1) {

        //all other keys are nullified.
        keyboard.activeKeys = [];
        game.commands = [];

        //move
        keyboard.executeKeyAction(keyPressed);

        //then hard drop
        game.commands.push({hardDropCommand: true});
    }

});

//init isPressed

for(var row = 0; row < keyboard.keyOrder.length; row++){
    for(var col = 0; col < keyboard.keyOrder[0].length; col++){
        var key = keyboard.keyOrder[row][col];
        keyboard["isPressed"][key] = false;
    }
}

