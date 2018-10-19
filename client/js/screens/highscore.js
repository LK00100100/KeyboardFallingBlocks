/**
 * highscore.js
 *
 * high score screen
 */

var highscore = {

    scores : [],
    MAX_SCORE_SIZE : 3,

    readHighScores : function(){

        //TODO
        //var scores = document.cookie;

    },

    updateHighScore : function (newScore){

        //empty list. put it in
        if(this.scores.length < this.MAX_SCORE_SIZE){
            this.scores.push(newScore);
        }
        //push out worst score
        else{
            this.scores.splice(this.scores.length - 1, 1);
            this.scores.push(newScore);
        }

        //so we can sort floating numbers
        this.scores.sort(function(a,b) { return a - b;});

    },

    printScores : function (){

        for(var i = 0; i < this.scores.length; i++){
            console.log(this.scores[i]);
        }

    },

    hideScreen : function (){
        $("#highscorescreen").hide();
    },

    showScreen : function () {
        $("#highscorescreen").show();
    },

    setKeyboard : function () {
        keyboard.setKeyboard(keyHighScore);
    }

};

highscore.readHighScores();
