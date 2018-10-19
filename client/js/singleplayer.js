/*
 * singleplayer.js
 * Deals with setting up the game before the game.
 */

var singleplayer = {

    start10Lines: function () {
        //TODO fix this after testing
        game.LINES_TO_WIN = 1;

        $("#levelText").hide();
        $("#scoreText").hide();

        this.initStart();
    },

    start40Lines: function () {
        game.LINES_TO_WIN = 40;

        $("#levelText").hide();
        $("#scoreText").hide();

        this.initStart();
    },

    // Begin single player game
    initStart: function () {

        game.resetGame();

        //animate the sprites, update date; 30FPS
        game.animationLoop();
        game.animationInterval = setInterval(game.animationLoop, game.animationTimeout);

        //then draw the sprites (whenever you can)
        game.startGame();
    },

    //game's end() calls this.
    endGame: function () {
        game.running = false;

        clearInterval(game.animationInterval);

        //you won
        if (game.linesCleared >= game.LINES_TO_WIN) {
            draw.showMessageBox("Victory!<br>" +
                "[ENTER] to restart.<br>" +
                "[\\] to quit.");

        }
        //you failed
        else {
            draw.showMessageBox("Game Over<br>" +
            "[ENTER] to restart.<br>" +
            "[\\] to quit.");
        }

    }
};
