/*
 * keyboard.js
 * Deals with all keyboard-related stuff
 */

var keyPressFunctions = {

    //the order of the 40 action keys.
    //rotate - clockwise # times
    //col - column to place, upper-left corner of piece
    //[rotate amount][col location]
    keyOrder: [
        [49, 50, 51, 52, 53, 54, 55, 56, 57, 48],
        [81, 87, 69, 82, 84, 89, 85, 73, 79, 80],
        [65, 83, 68, 70, 71, 72, 74, 75, 76, 186],
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

        if (game.justPressedHold)
            return;

        keyPressFunctions.nullifyCommands();

        game.commands.push({hold: true});
    },

    //space, "cancel"
    spaceKeyFunction: function () {  //space, "cancel", erase all commands
        game.commandCancel = true;

        keyPressFunctions.nullifyCommands();
    },

    /*
     * the keys that are currently being pressed are inert
     * all commands in queue are not executed.
     */
    nullifyCommands: function () {

        keyPressFunctions.activeKeys = [];
        game.commands = [];
        game.hardDrop = false;
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

    if(keyPressed == 16){
        keyPressFunctions.shiftKeyFunction();
        return;
    }

    //shift (hold) or space (cancel)
    if (keyPressed == 32) {

        console.log("key down 32");
        keyPressFunctions.spaceKeyFunction();
        return;
    }

    //if this key is not being currently pressed

    //if 40-key doesn't exist, leave
    if(keyPressFunctions.isInKeyOrder(keyPressed) == false){
        return;
    }

    if (keyPressFunctions["isPressed"][keyPressed] == false) {
        keyPressFunctions["isPressed"][keyPressed] = true;

        keyPressFunctions.activeKeys.push(keyPressed);

        //TODO remove this
        console.log("pressed:" + keyPressed);

        keyPressFunctions.executeKeyAction(keyPressed);
        //keyPressFunctions[keyPressed].call();
    }

});

//keyup actions
$(window).keyup(function (e) {

    var keyPressed = e.which;
    keyPressFunctions["isPressed"][keyPressed] = false;

    //TODO disable this
    console.log("keyup:" + keyPressed);

    //hold (shift)
    if (keyPressed == 16) {
        console.log("keyup:" + keyPressed + "CALL");

        keyPressFunctions.shiftKeyFunction();
        return;
    }

    //if the key released isn't nullified
    //finalize the move and do a hard-drop
    //active hard-drop
    if (keyPressFunctions.activeKeys.indexOf(keyPressed) != -1) {

        //all other keys are nullified.
        keyPressFunctions.activeKeys = [];
        game.commands = [];

        keyPressFunctions.executeKeyAction(keyPressed);

        game.hardDrop = true;

    }

});

//init isPressed
var numKeys = 200;
var i;
for(i = 0; i < numKeys; i++){
    keyPressFunctions["isPressed"][i] = false;
}
