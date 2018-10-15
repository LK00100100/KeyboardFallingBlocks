/**
 * main.js
 *
 * one of the first thing to be called
 * also, common.js is loaded and called.
 */

$(window).load(function () {
    game.init();

    screenManager.setScreenAndKeyboard(mainmenu);
});

