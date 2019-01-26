"use strict";

/**
 * pieceGenerateBag.js
 *
 * holds 2 copies of every piece.
 */

var pieceGeneratorBag = {

    name : "7-bag",
    pieces: [pieceI, pieceJ, pieceL, pieceO, pieceS, pieceT, pieceZ],
    bag : [],

    generateRandomPiece: function () {

        if(this.bag.length == 0){
            this.fillBag();
        }

        return this.bag.pop();

    },

    reset : function(){
        this.bag = [];
    },

    //take the 7 pieces from the original "pieces" and place them randomly
    fillBag : function (){

        var tempBag = this.pieces.slice(0);

        var rand, pieceTemp;

        //take from the tempBag one at a time randomly.
        //and add it to our bag.
        while(tempBag.length > 0){

            rand = Math.floor(Math.random() * tempBag.length);

            pieceTemp = $.extend({}, tempBag[rand]);
            pieceTemp.init();
            this.bag.push(pieceTemp);

            tempBag.splice(rand, 1);
        }

    }

};