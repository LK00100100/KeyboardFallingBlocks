/**
 * Created by Keh_L on 1/25/2017.
 */

var pieceGeneratorRandom = {

    name : "random",
    pieces: [pieceI, pieceJ, pieceL, pieceO, pieceS, pieceT, pieceZ],

    generateRandomPiece: function () {

        //randomly pick a piece
        var rand = Math.floor(Math.random() * this.pieces.length);

        //make a new piece and return that
        var pieceTemp = $.extend({}, this.pieces[rand]);
        pieceTemp.init();
        return pieceTemp;
    }

};