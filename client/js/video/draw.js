/**
 * draw.js
 *
 * handles rendering various things on the screen.
 */

var draw = {
    drawFrame : function() {

        // Clear the foreground canvas
        game.foregroundContext.clearRect(0, 0, game.canvasWidth, game.canvasHeight);

        this.drawBoard();

        this.drawLosingLine();

        this.drawHoldPiece();

        this.drawNextPieces();

        this.drawTime();

        this.drawLinesCleared();

        this.drawHoldBox();

        //draw score
        //TODO score?

        // Call the drawing loop for the next frame using request animation frame
        if (game.running) {
            requestAnimationFrame(game.drawingLoop);
        }

    },

    drawBoard : function () {

        var x, y;

        // draw the board (empty and current piece)
        // (start drawing from the top-drawing row, the visible ceiling)
        for (var row = game.DRAW_BOARD_TOP_DRAWABLE_ROW; row < game.BOARD_ROWS; row++) {
            y = game.DRAW_BOARD_Y + ((row - game.DRAW_BOARD_TOP_DRAWABLE_ROW) * game.BLOCK_WIDTH);

            for (var col = 0; col < game.BOARD_COLS; col++) {

                x = game.DRAW_BOARD_X + (col * game.BLOCK_WIDTH);

                //draw an empty block
                if (board.theBoard[row][col] == 0) {
                    //empty border
                    //game.foregroundContext.fillStyle = "#FF0000";	//red
                    //game.foregroundContext.fillRect(x, y, game.BLOCK_WIDTH, game.BLOCK_WIDTH);
                    game.foregroundContext.strokeStyle = "#003300";	//green border
                    game.foregroundContext.lineWidth = 1;
                    game.foregroundContext.strokeRect(x, y, game.BLOCK_WIDTH, game.BLOCK_WIDTH);
                }
                //draw a block
                else {

                    //regular block
                    if(board.theBoard[row][col] == 1){
                        game.foregroundContext.fillStyle = "#00aa00";
                        game.foregroundContext.fillRect(x, y, game.BLOCK_WIDTH, game.BLOCK_WIDTH);
                        game.foregroundContext.strokeStyle = "#00ff00";	//green border
                        game.foregroundContext.lineWidth = 1;
                        game.foregroundContext.strokeRect(x, y, game.BLOCK_WIDTH, game.BLOCK_WIDTH);
                    }
                    //ghost block
                    else if(board.theBoard[row][col] == 3){
                        game.foregroundContext.fillStyle = "#005500";
                        game.foregroundContext.fillRect(x, y, game.BLOCK_WIDTH, game.BLOCK_WIDTH);
                        game.foregroundContext.strokeStyle = "#00ff00";	//green border
                        game.foregroundContext.lineWidth = 1;
                        game.foregroundContext.strokeRect(x, y, game.BLOCK_WIDTH, game.BLOCK_WIDTH);

                    }

                }
            }
        }

    },

    drawLosingLine : function () {

        var x, y;

        //draw losing limit line (under row[3])
        game.foregroundContext.beginPath();
        y = game.DRAW_BOARD_Y + ((game.GAME_OVER_ROW + 1) * game.BLOCK_WIDTH);
        game.foregroundContext.moveTo(game.DRAW_BOARD_X, y);
        x = game.DRAW_BOARD_X + (game.BOARD_COLS * game.BLOCK_WIDTH);
        game.foregroundContext.lineTo(x, y);
        game.foregroundContext.lineWidth = 4;
        game.foregroundContext.strokeStyle = '#00ff00';
        game.foregroundContext.stroke();

    },

    drawGhostLines : function (){

        //TODO draw actual faint ghost piece
        //draw ghost piece
        game.foregroundContext.lineWidth = 2;
        game.foregroundContext.strokeStyle = '#ff0000';

        //draw left line.
        game.foregroundContext.beginPath();
        x = game.DRAW_BOARD_X + (game.currentPiece.col * game.BLOCK_WIDTH);
        y = game.DRAW_BOARD_Y + (game.currentPiece.row * game.BLOCK_WIDTH);
        game.foregroundContext.moveTo(x, y);
        y = game.DRAW_BOARD_Y + (game.BLOCK_WIDTH * game.BOARD_ROWS);
        game.foregroundContext.lineTo(x, y);
        game.foregroundContext.stroke();

        //draw right line
        game.foregroundContext.beginPath();
        x = game.DRAW_BOARD_X + (game.currentPiece.col * game.BLOCK_WIDTH) + (game.currentPiece.colSize * game.BLOCK_WIDTH);
        y = game.DRAW_BOARD_Y + (game.currentPiece.row * game.BLOCK_WIDTH);
        game.foregroundContext.moveTo(x, y);
        y = game.DRAW_BOARD_Y + (game.BLOCK_WIDTH * game.BOARD_ROWS);
        game.foregroundContext.lineTo(x, y);
        game.foregroundContext.stroke();


    },

    drawHoldPiece : function() {
        //draw holding piece
        if (game.holdPiece) {
            game.foregroundContext.fillStyle = "#00ff00";
            game.foregroundContext.strokeStyle = "#000000";	//black border
            game.foregroundContext.lineWidth = 1;

            //draw a piece
            for (var row = 0; row < game.holdPiece.rowSize; row++) {
                for (var col = 0; col < game.holdPiece.colSize; col++) {
                    if (game.holdPiece.space[row][col] != 0) {

                        game.foregroundContext.fillRect(
                            game.DRAW_HOLD_PIECE_X + (col * game.BLOCK_WIDTH)
                            , game.DRAW_HOLD_PIECE_Y + (row * game.BLOCK_WIDTH)
                            , game.BLOCK_WIDTH
                            , game.BLOCK_WIDTH);
                        game.foregroundContext.strokeRect(
                            game.DRAW_HOLD_PIECE_X + (col * game.BLOCK_WIDTH)
                            , game.DRAW_HOLD_PIECE_Y + (row * game.BLOCK_WIDTH)
                            , game.BLOCK_WIDTH
                            , game.BLOCK_WIDTH);

                    }
                }
            }

        }

    },

    drawNextPieces : function() {

        //draw next pieces
        var tempPiece;
        game.foregroundContext.fillStyle = "#00ff00";
        game.foregroundContext.strokeStyle = "#000000";	//black border
        game.foregroundContext.lineWidth = 1;
        for (var i = 0; i < game.nextPieces.length; i++) {
            tempPiece = game.nextPieces[i];

            //draw a piece
            for (var row = 0; row < tempPiece.rowSize; row++) {
                for (var col = 0; col < tempPiece.colSize; col++) {
                    if (tempPiece.space[row][col] != 0) {

                        game.foregroundContext.fillRect(
                            game.DRAW_NEXT_PIECE_X + (col * game.BLOCK_WIDTH)
                            , game.DRAW_NEXT_PIECE_Y + (row * game.BLOCK_WIDTH) + (i * game.DRAW_NEXT_PIECE_Y_GAP)
                            , game.BLOCK_WIDTH
                            , game.BLOCK_WIDTH);
                        game.foregroundContext.strokeRect(
                            game.DRAW_NEXT_PIECE_X + (col * game.BLOCK_WIDTH)
                            , game.DRAW_NEXT_PIECE_Y + (row * game.BLOCK_WIDTH) + (i * game.DRAW_NEXT_PIECE_Y_GAP)
                            , game.BLOCK_WIDTH
                            , game.BLOCK_WIDTH);

                    }
                }
            }
        }

    },

    drawTime : function (){
        //draw time
        $('#time').html(game.time);
    },

    drawLinesCleared : function() {
        //draw lines cleared
        $('#lines').html(game.linesCleared);
    },

    drawHoldBox : function (){

        game.foregroundContext.strokeStyle = "#00ff00";	//green border
        game.foregroundContext.lineWidth = 1;

        game.foregroundContext.strokeRect(20, 50, 120, 70);

    },

    drawMessageBox : function(){



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