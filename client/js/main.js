/**
 * main.js
 *
 * one of the first thing to be called
 */

//note: common.js is also called

$(window).load(function () {
    game.init();

    screenManager.setScreenAndKeyboard(mainmenu);
});

