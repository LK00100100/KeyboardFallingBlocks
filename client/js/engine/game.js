"use strict";

/**
 * game.js
 * holds all the information for the game state
 * does game calculations.
 */

var game = {

    //GAME INFO
    linesToWin: -1,

    //{col, rotate, hold, pause}
    commands: [],				//stores player commands. only processed during the "waiting command" stage
    currentPieceOriginal: null,	//the starting position/orientation for currentPiece.
    currentPiece: null,
    ghostPiece: null,
    holdPiece: null,

    nextPieces: [],
    justPressedHold: false,		//to ensure that we don't press hold infinitely. only once per drop.
    gameOver: false,
    newHighScore : false,       //if a new high score has been placed, highlight it red.

    // Start pre-loading assets.
    // Call once before you enter the game screen.
    init: function () {
        loader.init();
        sounds.init();
        draw.init();

        board.initBoard();

        timing.init();

        draw.drawingLoop();
    },

    //reset all game variables to square-0.
    resetGame: function () {

        //reset stats
        game.commands = [];
        game.newHighScore = false;

        stats.resetStats();
        timing.resetTiming();

        board.clearBoard();

        //get the current piece and a copy.
        game.currentPieceOriginal = pieceS;
        while(game.currentPieceOriginal.pieceType == "PieceS" || game.currentPieceOriginal.pieceType == "PieceZ")
            game.currentPieceOriginal = settings.pieceGenerator.generateRandomPiece();

        game.setPieceInStartPosition(game.currentPieceOriginal);
        game.currentPiece = $.extend({}, game.currentPieceOriginal);

        //get the next pieces
        var pieceTemp;
        settings.pieceGenerator.reset();
        game.nextPieces = [];
        for (var i = 0; i < settings.piecePreviewCount; i++) {
            pieceTemp = settings.pieceGenerator.generateRandomPiece();
            game.setPieceInStartPosition(pieceTemp);
            game.nextPieces.push(pieceTemp);
        }

        game.holdPiece = null;
        game.justPressedHold = false;

        //put the currentPiece on the board
        board.placePiece(game.currentPiece, game.currentPiece.row, game.currentPiece.col);

        board.generateGhostPiece();

        draw.hideMessageBox();
    },

    startGame: function () {

        game.running = true;

    },

    /**
     * remove the currentPiece and
     * attempt to move it into the new position.
     *
     * @param command - Player's command {row, col, hold, pause, cancel}
     */
    processInput: function (command) {

        board.removeGhostPiece();

        //if hold piece pressed and we can activate it.
        if (command.hold && game.justPressedHold == false) {

            //TODO make this more efficient later?

            game.holdPieceCommand();

            board.generateGhostPiece();

            //do not execute any moves. after holding
            return;
        }

        //for the current piece,
        //attempt to rotate and move to col.
        if (typeof command.col !== 'undefined' || typeof command.rotate !== 'undefined') {

            //TODO move this in commands.js

            //reset this piece to the original orientation
            board.removePiece(game.currentPiece);
            game.currentPiece = $.extend({}, game.currentPieceOriginal);

            game.attemptToMovePiece(command);
        }

        //HARD DROP
        if (typeof command.hardDropCommand !== 'undefined') {
            game.hardDropCommand();
        }

        board.generateGhostPiece();

    },

    holdPieceCommand : function() {
        //TODO move this in commands.js

        game.justPressedHold = true;

        //remove the current piece
        board.removePiece(game.currentPiece);

        //rotate piece until it's back at its starting rotation for presentation
        //while(game.currentPiece.currentRotation != 1)
        //game.currentPiece.rotate();

        if (game.holdPiece == null) {//new holdPiece
            game.holdPiece = game.currentPieceOriginal;
            game.getNextAndPlaceCurrentPiece();
        }
        else {//swap pieces currentPiece and holdPiece
            var tempSwap = game.currentPieceOriginal;
            game.currentPieceOriginal = game.holdPiece;
            game.holdPiece = tempSwap;

            game.currentPiece = $.extend({}, game.currentPieceOriginal);
        }

        board.attemptToMoveCurrentPiece(game.currentPiece.row, game.currentPiece.col);

    },

    /**
     * Set this piece's start position.
     */
    setPieceInStartPosition: function (tempPiece) {

        tempPiece.row = gameConst.START_ROW;
        tempPiece.col = gameConst.START_COL;
        tempPiece.setId(1);

    },

    /**
     * gets the next piece in the Pieces Queue
     * adds another piece to the end of the Pieces Queue
     */
    getNextAndPlaceCurrentPiece: function () {

        //get next piece in queue.
        game.currentPieceOriginal = game.nextPieces.shift();
        game.currentPiece = $.extend({}, game.currentPieceOriginal);

        //add a new piece to the queue.
        var pieceTemp = settings.pieceGenerator.generateRandomPiece();
        game.setPieceInStartPosition(pieceTemp);
        game.nextPieces.push(pieceTemp);

    },

    /**
     * tries to move the currentPiece in the direction of the argument.
     *
     * will overlap with other pieces.
     *
     * @param {{col:string, rotate:string}} command
     */
    attemptToMovePiece: function (command) {

        //rotate on a pivot X-amount
        if (typeof command.rotate !== 'undefined') {

            //rotate it and place.
            while (command.rotate-- > 0)
                game.currentPiece.rotate();

            //we're above bounds, put it back under
            if (game.currentPiece.row < 0)
                game.currentPiece.row = 0;

            //place the piece in the new spot
            board.attemptToMoveCurrentPiece(game.currentPiece.row, game.currentPiece.col);

        }

        //move left/right
        if (typeof command.col !== 'undefined') {

            //out of bounds, push it back in to the left
            if (command.col + game.currentPiece.colSize > gameConst.BOARD_COLS)
                command.col = gameConst.BOARD_COLS - game.currentPiece.colSize;

            board.attemptToMoveCurrentPiece(game.currentPiece.row, command.col);

        }

    },

    hardDropCommand: function () {

        //TODO move this in commands.js

        game.justPressedHold = false;

        //drop the piece down one row at a time
        board.removePiece(game.currentPiece);
        var i = 1;
        while (board.doesPieceFit(game.currentPiece, game.currentPiece.row + i, game.currentPiece.col)) {
            i += 1;
        }

        //go back one (should fit or potentially not if the piece never moved)
        board.placePiece(game.currentPiece, game.currentPiece.row + i - 1, game.currentPiece.col);

        //check that the piece placed causes lines clears
        board.checkLineClears(game.currentPiece.row, game.currentPiece.rowSize);
        board.clearLines();

        game.getNextAndPlaceCurrentPiece();
        board.placePiece(game.currentPiece, game.currentPiece.row, game.currentPiece.col);

        //if the "red line" has been breached, it is all over
        if (game.isGameOver()) {

            //cleared enough lines
            if (stats.linesCleared >= game.linesToWin) {

                highscore.updateHighScore(timing.time);
                highscore.printScores();

                //new high score
                if(highscore.scores[0] == timing.time){
                    game.newHighScore = true;
                }

            }

            game.end();

        }

    },

    //note: if get a certain amount of lines and die on the same frame, it's a victory.
    isGameOver: function () {

        //cleared enough lines
        if (stats.linesCleared >= game.linesToWin)
            return true;

        //if the losing line has been touched.
        return board.isBoardGameOver();

    },

    end: function () {
        singleplayer.endGame();
    },

    /**
     * ends and restarts the game completely
     */
    endAndResetGame : function (){

        game.end();

        if(game.linesToWin == 40){
            singleplayer.start40Lines();
        }

    }

};
