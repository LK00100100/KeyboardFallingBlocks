/**
 * game.js
 * holds all the information for the game state
 * does game calculations.
 */


var game = {

    //TIMING INFO
    FPS: 30,                //30 frames per second
    currentTick: 0,
    tickTimePieceDrop: 0,	//drop timer counter
    pieceDropTick: 0,		//automatic dropping time threshold.
    animationTimeout: -1, 	// 100 = 100 milliseconds or 10 times a second, i set it to 30 SPF

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
    goal: -1,
    time: 0,
    level: -1,
    score: -1,
    linesCleared: -1,
    holdPiece: null,
    //{col, rotate, hold, pause}
    commands: [],				//stores player commands. only processed during the "waiting command" stage
    currentPiece: null,
    ghostPiece: null,
    enableGhost: true,
    currentPieceOriginal: null,	//the starting position/orientation for currentPiece.
    nextPieces: [],
    justPressedHold: false,		//to ensure that we don't press hold infinitely. only once per drop.
    gameOver: false,
    pieceGenerator : pieceGeneratorRandom,
    newHighScore : false,
    rollingCancel : false,
    keyDownDoesHardDrop : false,


    // Start pre-loading assets.
    // Call once before you enter the game screen.
    init: function () {
        loader.init();
        sounds.init();
        draw.init();

        board.initBoard();

        //equals "seconds per frame"
        game.animationTimeout = 1000 / game.FPS;
    },

    //reset all game variables to square-0.
    resetGame: function () {

        settings.loadSettings();

        //reset stats
        game.goal = game.LINES_TO_WIN;
        game.level = 1;
        game.score = 0;
        game.linesCleared = 0;
        game.time = 0;
        game.currentTick = 0;
        game.commands = [];
        game.newHighScore = false;

        board.clearBoard();

        //get the current piece and a copy.
        game.currentPieceOriginal = pieceS;
        while(game.currentPieceOriginal.pieceType == "PieceS" || game.currentPieceOriginal.pieceType == "PieceZ")
            game.currentPieceOriginal = this.pieceGenerator.generateRandomPiece();

        game.setPieceInStartPosition(game.currentPieceOriginal);
        game.currentPiece = $.extend({}, game.currentPieceOriginal);

        //get the next pieces
        var pieceTemp;
        game.nextPieces = [];
        for (var i = 0; i < game.NEXT_PIECES_MAXSIZE; i++) {
            pieceTemp = this.pieceGenerator.generateRandomPiece();
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

        draw.drawKeyAssist();

        draw.drawingLoop();

        $('#gamemessages').html("");
    },

    /**
     * A control loop that runs at a fixed period of time
     * this does the game calculations
     */
    animationLoop: function () {
        //note: careful when you use the "this" keyword in this method.

        if (!game.running)
            return;

        game.currentTick++;

        //update timer
        //game.time += (game.currentTick / 30);
        if (game.currentTick % 30 == 0){

           // game.time++;
        }

        var frameSecond = (1 / game.FPS);

        game.setTimer(frameSecond);

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

    setTimer : function (deltaTime) {

        if(game.time == 9999.99)
            return;

        game.time += deltaTime;

        if(game.time > 9999.99)
            game.time = 9999.99;

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

        game.attemptToMoveCurrentPiece(game.currentPiece.row, game.currentPiece.col);

    },


    /**
     * Set this piece's start position.
     */
    setPieceInStartPosition: function (tempPiece) {

        //TODO move this to piece.js
        tempPiece.row = game.START_ROW;
        tempPiece.col = game.START_COL;
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
        var pieceTemp = this.pieceGenerator.generateRandomPiece();
        game.setPieceInStartPosition(pieceTemp);
        game.nextPieces.push(pieceTemp);

    },

    /**
     * it'll place the piece down regardless of failure. (with overlap)
     * @param row
     * @param col
     */
    attemptToMoveCurrentPiece: function (row, col) {

        board.removePiece(game.currentPiece);
        board.placePiece(game.currentPiece, row, col);

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
            game.attemptToMoveCurrentPiece(game.currentPiece.row, game.currentPiece.col);

        }

        //move left/right
        if (typeof command.col !== 'undefined') {

            //out of bounds, push it back in to the left
            if (command.col + game.currentPiece.colSize > game.BOARD_COLS)
                command.col = game.BOARD_COLS - game.currentPiece.colSize;

            //see if it fits in the new place
            //place the piece in the new spot

            game.attemptToMoveCurrentPiece(game.currentPiece.row, command.col);

        }

    },

    hardDropCommand: function () {

        //TODO move this in commands.js

        game.justPressedHold = false;

        //TODO redo this
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
            if (game.linesCleared >= game.LINES_TO_WIN) {

                highscore.updateHighScore(game.time);
                highscore.printScores();

                //new high score
                if(highscore.scores[0] == game.time){
                    game.newHighScore = true;
                }

            }

            game.end();

        }

    },

    incrementLinesCleared: function () {

        //limit reached, do nothing.
        if (game.linesCleared == game.LINES_CLEARED_LIMIT)
            return;

        game.linesCleared++;

        game.calculateGoal();

        //if the number of lines cleared is now divisble by 10,
        //make the level speed faster
        if (game.linesCleared % 10 == 0) {
            //TODO maybe do?
            //game.incrementLevel();
        }

    },

    calculateGoal : function(){
        game.goal = game.LINES_TO_WIN - game.linesCleared;

        if(game.goal < 0)
            game.goal = 0;
    },

    //note: if get a certain amount of lines and die on the same frame, it's a victory.
    isGameOver: function () {

        //cleared enough lines
        if (game.linesCleared >= game.LINES_TO_WIN)
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

        //TODO fix this to 10

        if(game.LINES_TO_WIN == 1){
            singleplayer.start10Lines();
        }

        if(game.LINES_TO_WIN == 40){
            singleplayer.start40Lines();
        }

    },

    showScreen : function () {
        $('.gamelayer').hide();
        $('#gameinterfacescreen').show();
    },

    hideScreen : function(){
        $('.gamelayer').hide();
        $('#gameinterfacescreen').hide();
    },

    setKeyboard : function () {
        keyboard.setKeyboard(keyGame);
    }

};
