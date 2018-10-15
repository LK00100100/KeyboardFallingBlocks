/**
 * mainmenu.js
 *
 * main menu screen
 */

var mainmenu = {

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
