/**
 * Created by Keh_L on 1/12/2017.
 */
var piece = {

    id: -1,             //unique piece ID (optional) maybe for color?
    pieceType: "empty", //type of piece
    rowSize: -1,	    //# rows occupied
    colSize: -1,	    //# cols occupied
    row: -1,		    //current row
    col: -1,		    //current col

    //shows the space-array the piece is occupying.
    //0 is unoccupied, nonzero is occupied.
    space: -1,
    rotations: -1,		//# of possible (unique) rotations

    //which rotation number you're on.
    //1 is the minimum starting rotation.
    currentRotation: -1,

    /**
     * sets the id & updates the matrix
     * @param theId - the new id
     */
    setId: function (theId) {
        this.id = theId;

        for (var i = 0; i < this.rowSize; i++) {
            for (var j = 0; j < this.colSize; j++) {
                if (this.space[i][j] != 0)
                    this.space[i][j] = this.id;
            }
        }

    },

    /**
     * rotate clockwise once.
     * updates space[][], row, col.
     */
    rotatePiece: function () {
        if (this.currentRotation == this.rotations)
            this.currentRotation = 1;
        else
            this.currentRotation++;

        //the new rotated space matrix. (colsize, rowsize)
        var newSpace = new Array(this.colSize);
        for (i = 0; i < this.colSize; i++)
            newSpace[i] = new Array(this.rowSize);

        //copy the old space into the new to rotate it 90 degrees clockwise.
        //XX  will become XX
        //XO			  OX
        var tempCol = this.rowSize - 1;
        var tempRow;
        for (var i = 0; i < this.rowSize; i++) {
            tempRow = 0;

            for (var j = 0; j < this.colSize; j++) {
                newSpace[tempRow++][tempCol] = this.space[i][j];
            }
            tempCol--;
        }

        //the rotated matrix is the new one.
        this.space = newSpace;
        var temp = this.rowSize;
        this.rowSize = this.colSize;
        this.colSize = temp;

    },

    /**
     * rotate counter clockwise once.
     * updates space[][], row, col.
     */
    rotateCounterClockwisePiece: function () {
        if (this.currentRotation == 1)
            this.currentRotation = this.rotations;
        else
            this.currentRotation--;

        //the new rotated space matrix.
        var newSpace = new Array(this.colSize);
        for (i = 0; i < this.colSize; i++)
            newSpace[i] = new Array(this.rowSize);

        //copy the old space into the new to rotate it 90 degrees counter clockwise.
        //XX  will become +OO
        //XO			  +++
        //XO

        var tempCol = 0;
        var tempRow;
        for (var i = 0; i < this.rowSize; i++) {
            tempRow = this.colSize - 1;

            //fill a column in newspace
            for (var j = 0; j < this.colSize; j++) {
                newSpace[tempRow--][tempCol] = this.space[i][j];
            }
            tempCol++;
        }

        //the rotated matrix is the new one.
        this.space = newSpace;
        var temp = this.rowSize;
        this.rowSize = this.colSize;
        this.colSize = temp;

    },

    /**
     * checks the spaces. returns true, if true
     *
     * @param theSpace
     * @return boolean - true if same.
     */
    isSpaceEquals: function (theSpace) {

        //range checked
        if (this.rowSize != theSpace.length)
            return false;
        if (this.colSize != theSpace[0].length)
            return false;

        //compare box by box
        for (var i = 0; i < this.rowSize; i++) {
            for (var j = 0; j < this.colSize; j++) {
                //if one is occupied and the other isn't, return false
                if (this.space[i][j] == 0 && theSpace[i][j] != 0)
                    return false;
                if (this.space[i][j] != 0 && theSpace[i][j] == 0)
                    return false;

            }
        }

        return true;

    },

    /**
     * clears the space matrix
     */
    clearSpace: function () {
        for (var i = 0; i < this.rowSize; i++)
            for (var j = 0; j < this.colSize; j++)
                this.space[i][j] = 0;
    },

    /**
     * @return int - the number of blocks a Piece is made up of. (PieceT = 4 blocks)
     */
    getBlockSize: function () {
        var blocks = 0;

        for (var i = 0; i < this.rowSize; i++) {
            for (var j = 0; j < this.colSize; j++) {
                if (this.space[i][j] == this.id)
                    blocks++;
            }
        }

        return blocks;

    },

    /**
     * this prints the space matrix
     */
    printPiece: function () {
        for (var i = 0; i < this.rowSize; i++) {
            for (var j = 0; j < this.colSize; j++) {
                if (this.space[i][j] == 0)
                    console.log("0");
                else
                    console.log("X");
            }
            console.log("\n");
        }

    },

    /**
     * compares two piece types
     *
     * @param otherPiece - the other Piece to compare with
     * @return boolean - true if same type; false if not.
     */
    equals: function (otherPiece) {
        return this.pieceType === otherPiece.pieceType;
    },

    /**
     * prints the pieceType
     */
    printPieceType: "empty"

};
