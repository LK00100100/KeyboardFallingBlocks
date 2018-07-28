/*
 * singleplayer.js
 * Deals with setting up the game before the game.
 */

var singleplayer = {

    // Begin single player game
    start: function () {

        // Hide the starting menu layer
        $('.gamelayer').hide();

        game.type = "singleplayer";

        // Finally start the level
        singleplayer.start100Lines();

    },
    exit: function () {
        // go back to the main screen
        $('.gamelayer').hide();
        $('#mainscreen').show();
    },


    start100Lines: function () {

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
