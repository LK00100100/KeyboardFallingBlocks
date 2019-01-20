"use strict";

/**
 * draw.js
 *
 * handles rendering various things on the game screen.
 */

var draw = {

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

    messageBoxX : 120,
    messageBoxY : 130,
    messageBoxHeight : 200,
    messageBoxLength : 350,
    enableMessageBox : false,
    messageBoxMessage : "",

    init : function() {

        this.backgroundCanvas = document.getElementById('gamebackgroundcanvas');
        this.backgroundContext = this.backgroundCanvas.getContext('2d');

        this.foregroundCanvas = document.getElementById('gameforegroundcanvas');
        this.foregroundContext = this.foregroundCanvas.getContext('2d');

        this.canvasWidth = this.backgroundCanvas.width;
        this.canvasHeight = this.backgroundCanvas.height;

        //some final stuff
        this.CURRENT_PIECE_X = this.DRAW_BOARD_X + (this.BLOCK_WIDTH * 11);
        this.CURRENT_PIECE_Y = this.BLOCK_WIDTH / 2;

    },

    /**
     * sets the draw order of things
     */
    drawFrame : function() {

        // Clear the foreground canvas
        this.foregroundContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.drawBoard();

        this.drawLosingLine();

        this.drawHoldPiece();

        this.drawNextPieces();

        this.drawGoal();

        this.drawTime();

        this.drawLinesCleared();

        this.drawHoldBox();

        if(this.enableMessageBox == true){
            this.drawMessageBox();
        }

        //draw score
        //TODO score?

        // Call the drawing loop for the next frame using request animation frame
        if (game.running) {
            requestAnimationFrame(draw.drawingLoop);
        }

    },

    drawBoard : function () {

        var x, y;

        // draw the board (empty and current piece)
        // (start drawing from the top-drawing row, the visible ceiling)
        for (var row = this.DRAW_BOARD_TOP_DRAWABLE_ROW; row < game.BOARD_ROWS; row++) {
            y = this.DRAW_BOARD_Y + ((row - this.DRAW_BOARD_TOP_DRAWABLE_ROW) * this.BLOCK_WIDTH);

            for (var col = 0; col < game.BOARD_COLS; col++) {

                x = this.DRAW_BOARD_X + (col * this.BLOCK_WIDTH);

                //draw an empty block
                if (board.theBoard[row][col] == 0) {
                    //empty border
                    //game.foregroundContext.fillStyle = "#FF0000";	//red
                    //game.foregroundContext.fillRect(x, y, game.BLOCK_WIDTH, game.BLOCK_WIDTH);
                    this.foregroundContext.strokeStyle = "#003300";	//green border
                    this.foregroundContext.lineWidth = 1;
                    this.foregroundContext.strokeRect(x, y, this.BLOCK_WIDTH, this.BLOCK_WIDTH);
                }
                //draw a block
                else {

                    //regular block
                    if(board.theBoard[row][col] == 1){
                        this.foregroundContext.fillStyle = "#00aa00";
                        this.foregroundContext.fillRect(x, y, this.BLOCK_WIDTH, this.BLOCK_WIDTH);
                        this.foregroundContext.strokeStyle = "#00ff00";	//green border
                        this.foregroundContext.lineWidth = 1;
                        this.foregroundContext.strokeRect(x, y, this.BLOCK_WIDTH, this.BLOCK_WIDTH);
                    }
                    //ghost block
                    else if(board.theBoard[row][col] == 3){
                        this.foregroundContext.fillStyle = "#005500";
                        this.foregroundContext.fillRect(x, y, this.BLOCK_WIDTH, this.BLOCK_WIDTH);
                        this.foregroundContext.strokeStyle = "#00ff00";	//green border
                        this.foregroundContext.lineWidth = 1;
                        this.foregroundContext.strokeRect(x, y, this.BLOCK_WIDTH, this.BLOCK_WIDTH);

                    }

                }
            }
        }

    },

    drawLosingLine : function () {

        var x, y;

        //draw losing limit line (under row[3])
        this.foregroundContext.beginPath();
        y = this.DRAW_BOARD_Y + ((game.GAME_OVER_ROW + 1) * this.BLOCK_WIDTH);
        this.foregroundContext.moveTo(this.DRAW_BOARD_X, y);
        x = this.DRAW_BOARD_X + (game.BOARD_COLS * this.BLOCK_WIDTH);
        this.foregroundContext.lineTo(x, y);
        this.foregroundContext.lineWidth = 4;
        this.foregroundContext.strokeStyle = '#00ff00';
        this.foregroundContext.stroke();

    },

    drawHoldPiece : function() {
        //draw holding piece
        if (game.holdPiece) {
            this.foregroundContext.fillStyle = "#00ff00";
            this.foregroundContext.strokeStyle = "#000000";	//black border
            this.foregroundContext.lineWidth = 1;

            //draw a piece
            for (var row = 0; row < game.holdPiece.rowSize; row++) {
                for (var col = 0; col < game.holdPiece.colSize; col++) {
                    if (game.holdPiece.space[row][col] != 0) {

                        this.foregroundContext.fillRect(
                            this.DRAW_HOLD_PIECE_X + (col * this.BLOCK_WIDTH)
                            , this.DRAW_HOLD_PIECE_Y + (row * this.BLOCK_WIDTH)
                            , this.BLOCK_WIDTH
                            , this.BLOCK_WIDTH);
                        this.foregroundContext.strokeRect(
                            this.DRAW_HOLD_PIECE_X + (col * this.BLOCK_WIDTH)
                            , this.DRAW_HOLD_PIECE_Y + (row * this.BLOCK_WIDTH)
                            , this.BLOCK_WIDTH
                            , this.BLOCK_WIDTH);

                    }
                }
            }

        }

    },

    drawNextPieces : function() {

        //draw next pieces
        var tempPiece;
        this.foregroundContext.fillStyle = "#00ff00";
        this.foregroundContext.strokeStyle = "#000000";	//black border
        this.foregroundContext.lineWidth = 1;
        for (var i = 0; i < game.nextPieces.length; i++) {
            tempPiece = game.nextPieces[i];

            //draw a piece
            for (var row = 0; row < tempPiece.rowSize; row++) {
                for (var col = 0; col < tempPiece.colSize; col++) {
                    if (tempPiece.space[row][col] != 0) {

                        this.foregroundContext.fillRect(
                            this.DRAW_NEXT_PIECE_X + (col * this.BLOCK_WIDTH)
                            , this.DRAW_NEXT_PIECE_Y + (row * this.BLOCK_WIDTH) + (i * this.DRAW_NEXT_PIECE_Y_GAP)
                            , this.BLOCK_WIDTH
                            , this.BLOCK_WIDTH);
                        this.foregroundContext.strokeRect(
                            this.DRAW_NEXT_PIECE_X + (col * this.BLOCK_WIDTH)
                            , this.DRAW_NEXT_PIECE_Y + (row * this.BLOCK_WIDTH) + (i * this.DRAW_NEXT_PIECE_Y_GAP)
                            , this.BLOCK_WIDTH
                            , this.BLOCK_WIDTH);

                    }
                }
            }
        }

    },

    drawGoal : function() {
      $("#goal").html(game.goal);
    },

    drawTime : function (){
        //draw time
        var truncTime = Number.parseFloat(game.time).toFixed(2);

        $('#time').html(truncTime);
    },

    drawLinesCleared : function() {
        //draw lines cleared
        $('#lines').html(game.linesCleared);
    },

    drawHoldBox : function (){

        this.foregroundContext.strokeStyle = "#00ff00";	//green border
        this.foregroundContext.lineWidth = 1;

        this.foregroundContext.strokeRect(20, 50, 120, 70);

    },

    /**
     * this is called to start the loop of drawing.
     */
    drawingLoop : function (){
        draw.drawFrame();
    },

    drawMessageBox : function(){

        this.foregroundContext.fillStyle = "#001100";
        this.foregroundContext.strokeStyle = "#00ff00";	//green border
        this.foregroundContext.lineWidth = 1;

        this.foregroundContext.fillRect(
            draw.messageBoxX
            , draw.messageBoxY
            , draw.messageBoxLength
            , draw.messageBoxHeight);

        this.foregroundContext.strokeRect(
            draw.messageBoxX
            , draw.messageBoxY
            , draw.messageBoxLength
            , draw.messageBoxHeight);

        $("#messagebox").html(this.messageBoxMessage);

    },

    showMessageBox : function (message) {
        this.messageBoxMessage = message;
        this.enableMessageBox = true;

        $("#messagebox").show();
    },

    hideMessageBox : function (){
        this.messageBoxMessage = "";
        this.enableMessageBox = false;

        $("#messagebox").hide();

    },

    drawKeyAssist : function () {
        //show key assist if enabled
        $('#keyAssist').html(
            "1 2 3 4 5 6 7 8 9 0<br>" +
            "Q W E R T Y U I O P<br>" +
            "A S D F G H J K L ;<br>" +
            "Z X C V B N M , . /").show();
    }

};