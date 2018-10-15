/**
 * highscore.js
 *
 * high score screen
 */

var highscore = {

    readHighScores : function(){

        //TODO
        //var scores = document.cookie;

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
