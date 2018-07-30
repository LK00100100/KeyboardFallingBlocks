/**
 * Created by Keh_L on 1/29/2017.
 */

var pieceO = {

    id: -1,
    pieceType: "PieceO",

    rowSize: 2,
    colSize: 2,

    rotations: 1,
    currentRotation: 1,

    init: function () {
        //the new rotated space matrix.
        this.space = new Array(this.rowSize);
        for (var i = 0; i < this.rowSize; i++)
            this.space[i] = new Array(this.colSize);

        this.clearSpace();

        //input the space with a non-zero number, which will be
        //replaced with an ID number for solution identification
        this.space[0][0] = this.id;
        this.space[0][1] = this.id;
        this.space[1][0] = this.id;
        this.space[1][1] = this.id;

    },

    /**
     * rotate clockwise once.
     * and shift the piece on a pivot point.
     */
    rotate: function () {
        //do nothing
    },

    /**
     * rotate counter clockwise once.
     * and shift the piece on a pivot point.
     */
    rotateCounterClockwise: function () {
        //do nothing
    },

    printPieceType: function () {
        console.log("O");
    }
};

pieceO = $.extend({}, piece, pieceO);
