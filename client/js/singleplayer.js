/*
 * singleplayer.js
 * Deals with setting up the game before the game.
 */

var singleplayer = {

    exit: function () {
        // go back to the main screen
        $('.gamelayer').hide();
        $('#mainscreen').show();
    },

    start10Lines: function () {
        game.LINES_TO_WIN = 10;

        this.initStart();
    },

    start100Lines: function () {
        game.LINES_TO_WIN = 100;

        this.initStart();
    },

    // Begin single player game
    initStart: function () {

        // Hide the starting menu layer
        $('.gamelayer').hide();

        game.type = "singleplayer";

        game.resetGame();

        //animate the sprites, update date; 30FPS
        game.animationLoop();
        game.animationInterval = setInterval(game.animationLoop, game.animationTimeout);

        //then draw the sprites (whenever you can)
        game.start();
    },

    //game's end() calls this.
    endGame: function () {
        game.running = false;
        clearInterval(game.animationInterval);

        //you won
        if (game.linesCleared >= game.LINES_TO_WIN) {

            //TODO fix this crap

        }
        //you failed
        else {

            /*
            game.showMessageBox("Mission Failed.<br><br>Try again?", function () {
                $('.gamelayer').hide();
                singleplayer.start100Lines();
            }, function () {
                $('.gamelayer').hide();
                $('#mainscreen').show();
            });
            */
        }
    }
};
