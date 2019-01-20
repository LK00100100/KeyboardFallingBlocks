/**
 * screenSettings.js
 *
 * a screen which holds user defined settings and displays them
 */

var screenSettings = {

    //version of save
    enableGhost : true,
    rollingCancel : true,
    keyDownDoesHardDrop : false,
    spaceDoesHardDrop : false,
    highScores : [],
    piecePreviewCount : 7,
    PIECE_PREVIEW_MAX: 7,  //limit of 7 (do not increase)
    pieceGenerator : pieceGeneratorBag,

    loadSettings : function(){

        game.enableGhost = settings.enableGhost;
        game.NEXT_PIECES_MAXSIZE = settings.piecePreviewCount;
        game.pieceGenerator = settings.pieceGenerator;
        game.rollingCancel = settings.rollingCancel;
        game.keyDownDoesHardDrop = settings.keyDownDoesHardDrop;
	    game.spaceDoesHardDrop = settings.spaceDoesHardDrop;
    },

    incrementPiecePreview : function () {
        if(settings.piecePreviewCount == settings.PIECE_PREVIEW_MAX)
            settings.piecePreviewCount = 1;
        else
            settings.piecePreviewCount++;
    },

    updateSettingsDraw : function (){

        this.setTextColor("#settingsGhost", "red");
        this.setTextColor("#settingsRolling", "red");
        this.setTextColor("#settingsKeyDownHardDrop", "red");
	    this.setTextColor("#settingsSpaceDoesHardDrop", "red");

        $("#settingsPreviewCount").text("p) Preview Count : " + settings.piecePreviewCount);

        if(settings.enableGhost)
            this.setTextColor("#settingsGhost", "green");

        if(settings.rollingCancel)
            this.setTextColor("#settingsRolling", "green");

        if(settings.keyDownDoesHardDrop)
            this.setTextColor("#settingsKeyDownHardDrop", "green");

        if(settings.spaceDoesHardDrop)
            this.setTextColor("#settingsSpaceDoesHardDrop", "green");

        $("#settingsPieceGenerator").text("i) Piece Generator: : " + settings.pieceGenerator.name);

    },

    setTextColor : function (id, color){
        $(id).css("color", color);
    },

    togglePieceGenerator : function(){

        if(settings.pieceGenerator == pieceGeneratorBag){
            settings.pieceGenerator = pieceGeneratorRandom;
        }
        else{
            settings.pieceGenerator = pieceGeneratorBag;
        }


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
