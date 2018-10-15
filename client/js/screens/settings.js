/**
 * settings.js
 *
 * a screen which holds user defined settings and displays them
 */

var settings = {

    //version of save
    enableGhost : true,
    rollingCancel : false,
    keyDownDoesHardDrop : false,
    highScores : [],
    piecePreviewCount : 7,  //limit of 7

    loadSettings : function(){
        game.enableGhost = this.enableGhost;
        game.NEXT_PIECES_MAXSIZE = this.piecePreviewCount;
    },

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
