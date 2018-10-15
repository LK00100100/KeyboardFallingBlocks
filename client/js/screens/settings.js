/**
 * settings.js
 *
 * a screen which holds user defined settings and displays them
 */

var settings = {

    //version of save
    enableGhost : true,
    rollingCancel : true,
    keyDownDoesHardDrop : false,
    highScores : null,

    hideScreen : function(){
        $("#settingsscreen").hide();
    },

    showScreen : function(){
        $("#settingsscreen").show();
    },

    setKeyboard : function () {
        keyboard.setKeyboard(keySettings);
    }

};
