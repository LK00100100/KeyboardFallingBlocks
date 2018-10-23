/**
 * main.js
 *
 * one of the first thing to be called
 * also, common.js is loaded and called.
 */

$(window).load(function () {

    if(window.mobileAndTabletcheck()){
        window.location.replace("./error.html");
    }

    cookies.readCookies();

    game.init();

    screenManager.setScreenAndKeyboard(mainmenu);
});

