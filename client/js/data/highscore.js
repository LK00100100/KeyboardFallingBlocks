"use strict";

/**
 * highscore.js
 *
 * manages and holds high score data
 */

var highscore = {

    scores : [],
    MAX_SCORE_SIZE : 3,

    /**
     * expects an array of scores (numbers)
     * @param scores
     */
    loadHighScores : function(scores){

        this.scores = scores;

    },

    /**
     * may update the high score if it's good
     *
     * currently a score is "time"
     *
     * @param newScore
     */
    updateHighScore : function (newScore){

        var written = false;

        //empty list. put it in
        if(this.scores.length < this.MAX_SCORE_SIZE){
            this.scores.push(newScore);

            written = true;
        }
        //push out worst score
        //TODO lower score is better for now
        else{
            if(this.scores[this.scores.length - 1] > newScore){
                this.scores.splice(this.scores.length - 1, 1);
                this.scores.push(newScore);

                written = true;
            }
        }

        if(written){
            //so we can sort floating numbers
            this.scores.sort(function(a,b) { return a - b;});

            cookies.saveCookies();
        }

    },

    displayScores : function (){

        var score;
        for(var i = 0; i < this.scores.length; i++){

            score = this.scores[i];
            if(score != null) {
                score = Number.parseFloat(score).toFixed(2);
                $("#highscore" + (i + 1)).text((i + 1) + ": " + score);

            }
        }
    },

    printScores : function (){

        for(var i = 0; i < this.scores.length; i++){
            console.log(this.scores[i]);
        }

    },

    toString : function () {

        var str = "";
        for(var i = 0; i < this.scores.length; i++){
            str += this.scores[i] + ",";
        }

        //remove comma
        if(str.length > 0)
            str = str.substring(0, str.length - 1);

        return str;

    }

};
