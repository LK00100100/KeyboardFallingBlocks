"use strict";

/**
 * singleplayer.js
 * Deals with setting up the game before the game.
 */

var singleplayer = {

    start40Lines: function () {
        game.linesToWin = 40;

        $("#levelText").hide();
        $("#scoreText").hide();

        this.initStart();
    },

    // Begin single player game
    initStart: function () {

        game.resetGame();

        //animate the sprites, update date; 30FPS
        timing.animationInterval = setInterval(game.calculationLoop, timing.animationTimeout);

        //then draw the sprites (whenever you can)
        game.startGame();
    },

    //game's end() calls this.
    endGame: function () {
        game.running = false;

        clearInterval(timing.animationInterval);

        var highScoreText = "";
        var score;
        for(var i = 0; i < highscore.scores.length; i++){

            score = Number.parseFloat(highscore.scores[i]).toFixed(2);

            if(game.newHighScore == true && i == 0){
                highScoreText += "<font color=\"red\">" + (i + 1) + ": " + score + "</font><br>";
            }
            else
                highScoreText += (i + 1) + ": " + score + "<br>";

        }

        //you won
        if (stats.linesCleared >= stats.linesToWin) {

            draw.showMessageBox("Victory!<br>" +
                "[ENTER] to restart.<br>" +
                "[\\] to quit.<br>" +
                highScoreText
            );

        }
        //you failed
        else {
            draw.showMessageBox("Game Over<br>" +
            "[ENTER] to restart.<br>" +
            "[\\] to quit.<br>" +
            highScoreText);
        }

    }
};
