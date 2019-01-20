"use strict";

/**
 * screenMainMenu.js
 *
 * main menu screen
 */

var screenMainMenu = {

    hideScreen : function (){
        $("#mainscreen").hide();
    },

    showScreen : function (){
        $("#mainscreen").show();
    },

    setKeyboard : function () {
        keyboard.setKeyboard(keyMainMenu);
    }

};
