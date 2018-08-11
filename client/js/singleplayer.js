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
        //TODO fix this after testing
        game.LINES_TO_WIN = 1;

        this.initStart();
    },

    start40Lines: function () {
        game.LINES_TO_WIN = 40;

        this.initStart();
    },

    // Begin single player game
    initStart: function () {

        // Hide the starting menu layer
        $('.gamelayer').hide();

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

            //TODO fix this crap

            draw.showMessageBox("Victory!<br>" +
            "[ENTER] to continue.<br>" +
            "[BACKSPACE] to quit.");

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
