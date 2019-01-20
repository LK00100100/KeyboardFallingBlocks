/**
 * screenHighscore.js
 *
 * high score screen
 */

var screenHighScore = {

    hideScreen : function (){
        $("#highscorescreen").hide();
    },

    showScreen : function () {
        $("#highscorescreen").show();

        highscore.displayScores();
    },

    setKeyboard : function () {
        keyboard.setKeyboard(keyHighScore);
    }

};
