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
    PIECE_PREVIEW_MAX: 7,  //limit of 7

    loadSettings : function(){
        game.enableGhost = this.enableGhost;
        game.NEXT_PIECES_MAXSIZE = this.piecePreviewCount;
    },

    incrementPiecePreview : function () {
        if(this.piecePreviewCount == this.PIECE_PREVIEW_MAX)
            this.piecePreviewCount = 1;
        else
            this.piecePreviewCount++;
    },

    updateSettingsDraw : function (){

        this.setTextColor("#settingsGhost", "red");
        this.setTextColor("#settingsRolling", "red");
        this.setTextColor("#settingsKeyDownHardDrop", "red");

        $("#settingsPreviewCount").text("p) Preview Count : " + this.piecePreviewCount);

        if(this.enableGhost)
            this.setTextColor("#settingsGhost", "green");

        if(this.rollingCancel)
            this.setTextColor("#settingsRolling", "green");

        if(this.keyDownDoesHardDrop)
            this.setTextColor("#settingsKeyDownHardDrop", "green");

    },

    setTextColor : function (id, color){
        $(id).css("color", color);
    },

    hideScreen : function(){
        $("#settingsscreen").hide();
    },

    showScreen : function(){
        $("#settingsscreen").show();

        this.updateSettingsDraw();
    },

    setKeyboard : function () {
        keyboard.setKeyboard(keySettings);
    }

};
