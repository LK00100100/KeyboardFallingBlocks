/**
 * boardHelper.js
 *
 * does various things with pieces
 */

var board = {

    theBoard: [],   //0 = empty, 1 = occupied, 2 = marked for clearing, 3 = ghost piece

    initBoard : function () {
        //top 4 rows are "ceiling" rows. The rest are "visible" rows.
        var totalRows = game.BOARD_ROWS;
        board.theBoard = new Array(totalRows);
        for (var i = 0; i < totalRows; i++)
            board.theBoard[i] = new Array(game.BOARD_COLS);

    },

    clearBoard: function() {

        //clear the board
        for (var row = 0; row < board.theBoard.length; row++) {
            for (var col = 0; col < board.theBoard[0].length; col++) {
                board.theBoard[row][col] = 0;
            }
        }
    },


    /**
     * returns true if the piece fits at the requested location and is in bounds.
     * false if not.
     *
     * @param thePiece
     * @param row - top-left corner
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
                    if (board.theBoard[row + i][col + j] != 0)
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
                    board.theBoard[row + i][col + j] = thePiece.id;
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
                    board.theBoard[row + i][col + j] = 0;
                }

            }
        }

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
            for (var j = 0; j < board.theBoard[0].length; j++) {

                //check if there's clear
                if (board.theBoard[topRow + i][j] == 0) {
                    rowNeedsToBeCleared = false;
                    break;
                }

            }
            //mark for clearing
            if (rowNeedsToBeCleared) {
                //board.theBoardState = BoardState.DISPLAYCLEARING;
                board.theBoard[topRow + i][0] = 2;
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
        for (var row = board.theBoard.length - 1; row >= 0; row--) {

            //if this line needs to be cleared.
            if (board.theBoard[row][0] == 2) {
                game.incrementLinesCleared();

                //clear line
                for (var col = 0; col < board.theBoard[0].length; col++) {
                    board.theBoard[row][col] = 0;
                }

                //shift everything above, down one row.
                //only 19 rows need to be ever shifted max.
                for (var i = row - 1; i >= 0; i--) {
                    for (var j = 0; j < board.theBoard[0].length; j++) {
                        board.theBoard[i + 1][j] = board.theBoard[i][j];
                    }

                }
                row++;//check the same row again.
            }

        }

        //clear the top most row. "haircut"
        for (col = 0; col < board.theBoard[0].length; col++) {
            board.theBoard[0][col] = 0;
        }

    },

    /**
     * if the board's game over line has been passed, the game is over.
     * @returns {boolean}
     */
    isBoardGameOver : function() {

        //if the losing line has been touched.
        for (var i = 0; i < game.BOARD_COLS; i++) {
            if (board.theBoard[game.GAME_OVER_ROW][i] != 0)
                return true;
        }

        return false;
    }

};

