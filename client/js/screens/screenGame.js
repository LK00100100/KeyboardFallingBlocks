"use strict";

/**
 * screenGame.js
 *
 * game screen
 */

var screenGame = {

    showScreen : function () {
        $('.gamelayer').hide();
        $('#gameinterfacescreen').show();
    },

    hideScreen : function(){
        $('.gamelayer').hide();
        $('#gameinterfacescreen').hide();
    },

    setKeyboard : function () {
        keyboard.setKeyboard(keyGame);
    }

};
