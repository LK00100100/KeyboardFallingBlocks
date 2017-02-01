/**
 * Created by Keh_L on 1/25/2017.
 */

var pieceFactory = {

    pieces:[null, pieceI, pieceJ, pieceL, pieceO, pieceS, pieceT, pieceZ],

    generateRandomPieceSizeFour:function(){

        //randomly pick a piece
        var rand =  Math.floor((Math.random() * (this.pieces.length - 1)) + 1);

        //make a new piece and return that
        var pieceTemp = $.extend({}, this.pieces[rand]);
        pieceTemp.init();
        return pieceTemp;
    }

};