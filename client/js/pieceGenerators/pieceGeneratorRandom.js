"use strict";

/**
 * pieceGeneratroRandom.js
 *
 * holds random pieces.
 */

var pieceGeneratorRandom = {

    name : "random",
    pieces: [pieceI, pieceJ, pieceL, pieceO, pieceS, pieceT, pieceZ],

    reset : function () {},

    generateRandomPiece: function () {

        //randomly pick a piece
        var rand = Math.floor(Math.random() * this.pieces.length);

        //make a new piece and return that
        var pieceTemp = $.extend({}, this.pieces[rand]);
        pieceTemp.init();
        return pieceTemp;
    }

};