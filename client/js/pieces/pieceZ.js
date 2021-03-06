"use strict";

/**
 * Created by Keh_L on 1/29/2017.
 */

var pieceZ = {

    id: -1,
    pieceType: "PieceZ",

    rowSize: 2,
    colSize: 3,

    rotations: 2,
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
        this.space[1][1] = this.id;
        this.space[1][2] = this.id;

    },

    /**
     * rotate clockwise once.
     * and shift the piece on a pivot point.
     */
    rotate: function () {
        this.rotatePiece();

        //shift on a pivot
        switch (this.currentRotation) {
            case 1:
                this.row += 1;
                this.col -= 1;
                break;
            case 2:
                this.row -= 1;
                this.col += 1;
                break;
        }

    },

    /**
     * rotate counter clockwise once.
     * and shift the piece on a pivot point.
     */
    rotateCounterClockwise: function () {
        this.rotateCounterClockwisePiece();

        //shift on a pivot
        switch (this.currentRotation) {
            case 1:
                this.row += 1;
                this.col -= 1;
                break;
            case 2:
                this.row -= 1;
                this.col += 1;
                break;
        }

    },

    printPieceType: function () {
        console.log("Z");
    }
};

pieceZ = $.extend({}, piece, pieceZ);
