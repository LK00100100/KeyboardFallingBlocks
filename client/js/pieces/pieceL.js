/**
 * Created by Keh, L on 1/16/2017.
 */

var pieceL = {

    id: -1,
    pieceType: "PieceL",

    rowSize: 2,
    colSize: 3,

    rotations: 4,
    currentRotation: 1,

    init: function () {
        //the new rotated space matrix.
        this.space = new Array(this.rowSize);
        for (var i = 0; i < this.rowSize; i++)
            this.space[i] = new Array(this.colSize);

        this.clearSpace();

        //input the space with a non-zero number, which will be
        //replaced with an ID number for solution identification
        this.space[0][2] = this.id;
        this.space[1][0] = this.id;
        this.space[1][1] = this.id;
        this.space[1][2] = this.id;

    },

    /**
     * rotate clockwise once.
     * and shift the piece on a pivot point.
     */
    rotate: function () {
        this.rotateA();

        //shift on a pivot
        switch (this.currentRotation) {
            case 1:
                this.row += 1;
                this.col -= 1;
                break;
            case 2:
                this.row -= 1;
                break;
            case 3:
                //nothing
                break;
            case 4:
                this.col += 1;
                break;
        }

    },

    /**
     * rotate counter clockwise once.
     * and shift the piece on a pivot point.
     */
    rotateCounterClockwise: function () {
        this.rotateCounterClockwiseA();

        //shift on a pivot
        switch (this.currentRotation) {
            case 1:
                this.row += 1;
                break;
            case 2:
                //nothing
                break;
            case 3:
                this.col -= 1;
                break;
            case 4:
                this.row -= 1;
                this.col += 1;
                break;
        }

    },
    printPieceType: function () {
        console.log("L");
    }

};

pieceL = $.extend({}, piece, pieceL);
