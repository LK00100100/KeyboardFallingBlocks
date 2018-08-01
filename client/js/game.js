/* game.js
 * holds all the information for the game state
 */

//TODO draw board only when it needs updating.
//TODO draw holding pieces when it needs updating
//TODO implement time limit to prevent negative overflow

$(window).load(function () {
    game.init();
});

var game = {

    //TIMING INFO
    FPS: 30,                //30 frames per second
    currentTick: 0,
    tickTimePieceDrop: 0,	//drop timer counter
    pieceDropTick: 0,		//automatic dropping time threshold.
    animationTimeout: -1, 	// 100 = 100 milliseconds or 10 times a second, i set it to 30 SPF

    //DRAWING INFO
    BLOCK_WIDTH: 25,
    CURRENT_PIECE_X: -1,
    CURRENT_PIECE_Y: -1,
    DRAW_BOARD_X: 175,
    DRAW_BOARD_Y: 0,
    DRAW_BOARD_TOP_DRAWABLE_ROW: 0,	//the first row (top) we draw from.
    DRAW_LINES_CLEARED_X: 215,
    DRAW_LINES_CLEARED_Y: 280,
    DRAW_GAME_TIMER_X: 215,
    DRAW_GAME_TIMER_Y: 340,
    DRAW_LEVEL_X: 215,
    DRAW_LEVEL_Y: 400,
    DRAW_NEXT_PIECE_X: 510,
    DRAW_NEXT_PIECE_Y: 50,
    DRAW_NEXT_PIECE_Y_GAP: 80,
    DRAW_HOLD_PIECE_X: 30,
    DRAW_HOLD_PIECE_Y: 60,

    //GAME INFO
    BOARD_ROWS: 25,			//total rows, including invisible ceiling. 0 is the top
    BOARD_CEILING_ROWS: 5,	//number of invisible ceiling rows
    BOARD_COLS: 10,
    START_ROW: 0,			//current piece's starting area
    START_COL: 3,
    LINES_TO_LEVEL_UP: 10,
    LINES_TO_WIN: -1,
    LINES_CLEARED_LIMIT: 9999,
    GAME_OVER_ROW: 4,		//stuff filled in this row[x] is bad
    NEXT_PIECES_MAXSIZE: 7,

    //GAME INFO
    level: -1,
    score: -1,
    linesCleared: -1,
    board: [],					//0 = empty, 1 = occupied, 2 = marked for clearing, 3 = ghost piece
    tempSwap: null,
    holdPiece: null,
    hardDrop: false,		    //if there was a keyup
    //{col, rotate, hold, pause}
    commands: [],				//stores player commands. only processed during the "waiting command" stage
    currentPiece: null,
    ghostPiece: null,
    currentPieceOriginal: null,	//the starting position/orientation for currentPiece.
    nextPieces: [],
    justPressedHold: false,		//to ensure that we don't press hold infinitely. only once per drop.
    gameOver: false,
    time: 0,

    // Start preloading assets
    init: function () {
        loader.init();
        sounds.init();

        $('.gamelayer').hide();
        $('#mainscreen').show();

        game.backgroundCanvas = document.getElementById('gamebackgroundcanvas');
        game.backgroundContext = game.backgroundCanvas.getContext('2d');

        game.foregroundCanvas = document.getElementById('gameforegroundcanvas');
        game.foregroundContext = game.foregroundCanvas.getContext('2d');

        game.canvasWidth = game.backgroundCanvas.width;
        game.canvasHeight = game.backgroundCanvas.height;

        //top 4 rows are "ceiling" rows. The rest are "visible" rows.
        var totalRows = game.BOARD_ROWS;
        game.board = new Array(totalRows);
        for (var i = 0; i < totalRows; i++)
            game.board[i] = new Array(game.BOARD_COLS);

        //some final stuff
        game.CURRENT_PIECE_X = game.DRAW_BOARD_X + (game.BLOCK_WIDTH * 11);
        game.CURRENT_PIECE_Y = game.BLOCK_WIDTH / 2;

        //seconds per frame
        var SPF = 1000 / game.FPS;
        game.animationTimeout = SPF;
    },

    startGame: function () {
        $('.gamelayer').hide();
        $('#gameinterfacescreen').show();

        game.running = true;

        draw.drawKeyAssist();

        game.drawingLoop();

        $('#gamemessages').html("");
    },

    //A control loop that runs at a fixed period of time
    //this does the game calculations
    animationLoop: function () {

        if (!game.running)
            return;

        game.currentTick++;

        //update timer
        if (game.currentTick % 30 == 0)
            game.time++;

        //TODO possibly consolidate all this command input

        //hold a piece (there's only one command)
        if (game.commands.length > 0 && game.commands[0].hold) {
            game.processInput(game.commands.shift());
        }

        //hard drop
        //TODO remove this variable, just cause
        if (game.hardDrop) {
            game.hardDrop = false;

            //move currentPiece to keyup's location and hard drop.
            //there should be only this one command.
            game.processInput(game.commands.shift());
            game.processInput({hardDrop: true});
        }

        //process user keyboard inputs (in order)
        for (var i = 0; i < game.commands.length; i++) {
            game.processInput(game.commands.shift());
        }

        //TODO we can remove this variable if we just check commands length and move this to the top.
        //if we need to play one movement sound.
        //if(game.movementButtonWasPressed) {

        //TODO implement sound
        //if (Settings.soundEnabled)
        //	Assets.beep.play(1);

        //game.movementButtonWasPressed = false;
        //}

    },

    //TODO, move this out to another function.
    //draws the sprites onto the game.
    drawingLoop: function () {
        draw.drawFrame();
    },

    //note: if get a certain amount of lines and die on the same frame, it's a victory.
    isGameOver: function () {

        //cleared enough lines
        if (game.linesCleared >= game.LINES_TO_WIN)
            return true;

        //if the losing line has been touched.
        for (var i = 0; i < game.BOARD_COLS; i++) {
            if (game.board[game.GAME_OVER_ROW][i] != 0)
                return true;
        }

        return false;

    },

    end: function () {

        if (game.type == "singleplayer")
            singleplayer.endGame();

    },

    clearBoard: function() {

        //clear the board
        for (var row = 0; row < game.board.length; row++) {
            for (var col = 0; col < game.board[0].length; col++) {
                game.board[row][col] = 0;
            }
        }
    },

    //reset all game variables to square-0.
    resetGame: function () {

        game.level = 1;
        game.score = 0;
        game.linesCleared = 0;
        game.time = 0;

        game.currentTick = 0;

        game.commands = [];

        game.hardDrop = false;

        game.clearBoard();

        //get the current piece and a copy.
        game.currentPieceOriginal = pieceFactory.generateRandomPieceSizeFour();
        game.placePieceInStart(game.currentPieceOriginal);

        game.currentPiece = $.extend({}, game.currentPieceOriginal);

        //get the next pieces
        var pieceTemp;
        game.nextPieces = [];
        for (var i = 0; i < game.NEXT_PIECES_MAXSIZE; i++) {
            pieceTemp = pieceFactory.generateRandomPieceSizeFour();
            game.placePieceInStart(pieceTemp);
            game.nextPieces.push(pieceTemp);
        }

        game.holdPiece = null;
        game.justPressedHold = false;

        //put the currentPiece on the board
        game.placePiece(game.currentPiece, game.currentPiece.row, game.currentPiece.col);

    },

    /**
     * returns true if the piece fits at the requested location and is in bounds.
     * false if not.
     *
     * @param thePiece
     * @param row, top-left corner
     * @param col
     * @return boolean
     */
    doesPieceFit: function (thePiece, row, col) {

        //out of side boundaries
        //not within the left walls.
        if (col < 0)
            return false;
        //not within the right walls.
        else if (col + thePiece.colSize - 1 >= game.BOARD_COLS)
            return false;

        //out of bottom boundaries
        if (row + thePiece.rowSize - 1 >= game.BOARD_ROWS)
            return false;

        //note: it is impossible to hit above the top.

        //attempt to see if we can fit thePiece in the currentBox.
        for (var i = 0; i < thePiece.rowSize; i++) {
            for (var j = 0; j < thePiece.colSize; j++) {
                //if piece section exists, remove it from the currentBox
                if (thePiece.space[i][j] != 0) {
                    //currentBox has that spot occupied
                    if (game.board[row + i][col + j] != 0)
                        return false;
                }

            }
        }

        return true;
    },

    /**
     * jams in a piece at the set coordinates.
     * assumes the piece fits to begin with.
     * (or else overlap)
     *
     * @param thePiece - the Piece to attempt to fit
     * @param row - top-left corner
     * @param col
     */
    placePiece: function (thePiece, row, col) {

        //put the piece in.
        for (var i = 0; i < thePiece.rowSize; i++) {
            for (var j = 0; j < thePiece.colSize; j++) {
                if (thePiece.space[i][j] != 0) {
                    //board has that spot occupied
                    game.board[row + i][col + j] = thePiece.id;
                }

            }
        }

        //the new place.
        thePiece.row = row;
        thePiece.col = col;

    },

    /**
     * removes the piece
     * it is implied that the piece exists when you call this method
     *
     * @param thePiece
     * @param row - top left corner
     * @param col
     */
    removePiece: function (thePiece) {

        var row = thePiece.row;
        var col = thePiece.col;

        //go through every square in the piece and only remove a piece section if
        //the piece section exists
        for (var i = 0; i < thePiece.rowSize; i++) {
            for (var j = 0; j < thePiece.colSize; j++) {
                //if piece section exists, remove it from the board
                if (thePiece.space[i][j] != 0) {
                    game.board[row + i][col + j] = 0;
                }

            }
        }

    },

    /**
     * init new piece.
     * Put it in the starting position
     */
    placePieceInStart: function (tempPiece) {

        tempPiece.row = game.START_ROW;
        tempPiece.col = game.START_COL;
        tempPiece.setId(1);

    },

    /**
     * gets the next piece in the Pieces Queue
     * adds another piece to the end of the Pieces Queue
     */
    getNextCurrentPiece: function () {

        //get next piece in queue.
        game.currentPieceOriginal = game.nextPieces.shift();
        game.currentPiece = $.extend({}, game.currentPieceOriginal);

        //add a new piece to the queue.
        var pieceTemp = pieceFactory.generateRandomPieceSizeFour();
        game.placePieceInStart(pieceTemp);
        game.nextPieces.push(pieceTemp);

    },

    /**
     * this method can be used to:
     * (if implemented) end the game if currentPiece cannot be placed.
     *
     * it'll place the piece down regardless of failure. (with overlap)
     */
    attemptToPlaceCurrentPiece: function () {

        //TODO implement this in later game modes.

        //check to see if there's a collision at the starting spot.
        //if(!game.doesPieceFit(game.currentPiece, game.currentPiece.row, game.currentPiece.col))
        //	game.end();

        //fit piece anyways to demonstrate the player's incompetence.
        game.placePiece(game.currentPiece, game.currentPiece.row, game.currentPiece.col);

    },

    /**
     * checks and marks specified lines for clearing with the board ID of 2,
     * the lines that are marked for clearing get the ID of 2 only in the
     * first column.
     *
     * @param topRow - the top row that is affected.
     * @param numberOfRowsBelow - below the topRow
     */
    checkLineClears: function (topRow, numberOfRowsBelow) {

        var rowNeedsToBeCleared;
        //check the rows for a clear
        for (var i = 0; i < numberOfRowsBelow; i++) {
            //true until proved false
            rowNeedsToBeCleared = true;
            //check a row
            for (var j = 0; j < game.board[0].length; j++) {

                //check if there's clear
                if (game.board[topRow + i][j] == 0) {
                    rowNeedsToBeCleared = false;
                    break;
                }

            }
            //mark for clearing
            if (rowNeedsToBeCleared) {
                //game.boardState = BoardState.DISPLAYCLEARING;
                game.board[topRow + i][0] = 2;
            }

        }

    },

    /**
     * finds lines that are set to be CLEARED, and then
     * clear and shift.
     *
     * sets linesNeedClearing to false
     * increments linesCleared
     */
    clearLines: function () {

        //TODO make this more efficient
        //TODO you can use 2 pointers (next empty, current line) instead

        //check all the board from bottom to top
        for (var row = game.board.length - 1; row >= 0; row--) {

            //if this line needs to be cleared.
            if (game.board[row][0] == 2) {
                game.incrementLinesCleared();

                //clear line
                for (var col = 0; col < game.board[0].length; col++) {
                    game.board[row][col] = 0;
                }

                //shift everything above, down one row.
                //only 19 rows need to be ever shifted max.
                for (var i = row - 1; i >= 0; i--) {
                    for (var j = 0; j < game.board[0].length; j++) {
                        game.board[i + 1][j] = game.board[i][j];
                    }

                }
                row++;//check the same row again.
            }

        }

        //clear the top most row. "haircut"
        for (col = 0; col < game.board[0].length; col++) {
            game.board[0][col] = 0;
        }

    },

    /**
     * tries to move the currentPiece in the direction of the argument.
     *
     * @param command {col, rotate}
     * @return true if the piece was successfully moved. false if nothing happened.
     */
    attemptToMovePiece: function (command) {

        //rotate on a pivot X-amount
        if (typeof command.rotate !== 'undefined') {

            //remove the piece in the original place.
            game.removePiece(game.currentPiece);

            //rotate it and place.
            while (command.rotate-- > 0)
                game.currentPiece.rotate();

            //we're above bounds, put it back under
            if (game.currentPiece.row < 0)
                game.currentPiece.row = 0;

            //place the piece in the new spot
            game.placePiece(game.currentPiece, game.currentPiece.row, game.currentPiece.col);

        }

        //move left/right
        if (typeof command.col !== 'undefined') {

            //remove the piece in the original place.
            game.removePiece(game.currentPiece);

            //out of bounds, push it back in to the left
            if (command.col + game.currentPiece.colSize > game.BOARD_COLS)
                command.col = game.BOARD_COLS - game.currentPiece.colSize;

            //see if it fits in the new place
            //place the piece in the new spot
            game.placePiece(game.currentPiece, game.currentPiece.row, command.col);

        }

    },

    hardDropPiece: function () {

        game.justPressedHold = false;

        //drop the piece down one row at a time
        while (true) {
            game.removePiece(game.currentPiece);

            if (game.doesPieceFit(game.currentPiece, game.currentPiece.row + 1, game.currentPiece.col)) {
                //place the piece in the new spot
                game.placePiece(game.currentPiece, game.currentPiece.row + 1, game.currentPiece.col);
            }
            else {//doesn't fit in the new spot.
                //place the piece back in the original spot.
                game.placePiece(game.currentPiece, game.currentPiece.row, game.currentPiece.col);
                break;
            }
        }

        //check that the piece placed causes lines clears
        game.checkLineClears(game.currentPiece.row, game.currentPiece.rowSize);
        game.clearLines();

        game.getNextCurrentPiece();
        game.attemptToPlaceCurrentPiece();

        //if the "red line" has been breached, it is all over
        if (game.isGameOver())
            game.end();

    },

    /**
     * remove the currentPiece and
     * attempt to move it into the new position.
     *
     * @param command - Player's command {row, col, hold, pause, cancel}
     */
    processInput: function (command) {

        //if hold piece pressed and we can activate it.
        if (command.hold && game.justPressedHold == false) {
            game.justPressedHold = true;

            //TODO remove the ghost piece

            //remove the current piece
            game.removePiece(game.currentPiece);

            //rotate piece until it's back at its starting rotation for presentation
            //while(game.currentPiece.currentRotation != 1)
            //game.currentPiece.rotate();

            if (game.holdPiece == null) {//new holdPiece
                game.holdPiece = game.currentPieceOriginal;
                game.getNextCurrentPiece();
            }
            else {//swap pieces currentPiece and holdPiece
                game.tempSwap = game.currentPieceOriginal;
                game.currentPieceOriginal = game.holdPiece;
                game.holdPiece = game.tempSwap;

                game.currentPiece = $.extend({}, game.currentPieceOriginal);
            }

            game.attemptToPlaceCurrentPiece();

            //do not execute any moves. after holding
            return;
        }

        //for the current piece,
        //attempt to rotate and move to col,
        if (typeof command.col !== 'undefined' || typeof command.rotate !== 'undefined') {

            //TODO make this more efficient later?

            //reset this piece to the original orientation
            game.removePiece(game.currentPiece);
            game.currentPiece = $.extend({}, game.currentPieceOriginal);

            game.attemptToMovePiece(command);

            //generate ghost piece
            game.generateGhostPiece();

        }

        if (typeof command.hardDrop !== 'undefined') {
            game.hardDropPiece();
        }

    },

    generateGhostPiece : function() {

        //remove current piece


        //place ghost piece


        //shove it down to the bottom.

    },

    incrementLinesCleared: function () {

        //limit reached, do nothing.
        if (game.linesCleared == game.LINES_CLEARED_LIMIT)
            return;

        game.linesCleared++;

        //if the number of lines cleared is now divisble by 10,
        //make the level speed faster
        if (game.linesCleared % 10 == 0) {
            //TODO maybe inplement?
            //game.incrementLevel();
        }

    }

};
