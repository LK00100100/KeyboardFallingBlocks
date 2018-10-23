/**
 * keyGame.js
 *
 * game-related key presses
 */

var keyGame = {

    //the exact placement of the 40 action keys.
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
        //if it exists, should return the row number.
        if(this.getKeyRotation(key) == -1)
            return false;

        return true;
    },

    //returns the number of piece rotations for a key
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
        this.nullifyCommands();

        game.commands.push({hold: true});
    },

    //space, "cancel"
    spaceKeyFunction: function () {  //space, "cancel", erase all commands
        this.nullifyCommands();
    },

    /*
     * the keys that are currently being pressed are inert
     * all commands in queue are not executed.
     */
    nullifyCommands: function () {
        this.activeKeys = [];
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
    activeKeys: [],

    executeKeyDown : function (e){

        var keyPressed = e.which;

        // forward slash - prevent default "quick find" for firefox.
        // quotes - prevent quick find
        if (keyPressed == 191 || keyPressed == 222) {
            e.preventDefault();
        }

        //\ - go back to main menu
        if(keyPressed == 220){
            game.end();
            screenManager.setScreenAndKeyboard(mainmenu);
        }

        //"enter" - reset game
        if(keyPressed == 13){
            game.endAndResetGame();
        }

        //shift (hold a piece)
        if(keyPressed == 16){
            this.shiftKeyFunction();
        }

        //space (cancel commands)
        if(keyPressed == 32) {
            console.log("space pressed");

            this.spaceKeyFunction();
        }

        //if this key is not being currently pressed

        //if 40-key doesn't exist, leave
        if(keyGame.isInKeyOrder(keyPressed) == false){
            return;
        }

        //40-key exists
        if (keyGame["isPressed"][keyPressed] == false) {
            keyGame["isPressed"][keyPressed] = true;

            if(game.rollingCancel)
                keyGame.nullifyCommands();

            if(game.keyDownDoesHardDrop == false) {
                keyGame.activeKeys.push(keyPressed);
            }

            keyGame.executeKeyAction(keyPressed);

            //then hard drop (if enabled)
            if(game.keyDownDoesHardDrop){
                game.commands.push({hardDropCommand: true});
            }
        }

    },

    executeKeyUp : function (e) {

        var keyPressed = e.which;

        keyGame["isPressed"][keyPressed] = false;

        //hold (shift)
        if (keyPressed == 16) {
            console.log("keyup:" + keyPressed + "CALL");

            this.shiftKeyFunction();
            return;
        }

        //if the key released isn't nullified
        //finalize the move and do a hard-drop
        //active hard-drop
        if (this.activeKeys.indexOf(keyPressed) != -1) {

            //all other keys are nullified.
            this.activeKeys = [];
            game.commands = [];

            //move the piece
            this.executeKeyAction(keyPressed);

            //then hard drop
            game.commands.push({hardDropCommand: true});
        }

    }

};

//init isPressed
for(var row = 0; row < keyGame.keyOrder.length; row++){
    for(var col = 0; col < keyGame.keyOrder[0].length; col++){
        var key = keyGame.keyOrder[row][col];
        keyGame["isPressed"][key] = false;
    }
}
