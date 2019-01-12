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
    spaceDoesHardDrop : false,
    highScores : [],
    piecePreviewCount : 7,
    PIECE_PREVIEW_MAX: 7,  //limit of 7 (do not increase)
    pieceGenerator : pieceGeneratorBag,

    loadSettings : function(){

        game.enableGhost = this.enableGhost;
        game.NEXT_PIECES_MAXSIZE = this.piecePreviewCount;
        game.pieceGenerator = this.pieceGenerator;
        game.rollingCancel = this.rollingCancel;
        game.keyDownDoesHardDrop = this.keyDownDoesHardDrop;
	game.spaceDoesHardDrop = this.spaceDoesHardDrop;
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
	this.setTextColor("#settingsSpaceDoesHardDrop", "red");

        $("#settingsPreviewCount").text("p) Preview Count : " + this.piecePreviewCount);

        if(this.enableGhost)
            this.setTextColor("#settingsGhost", "green");

        if(this.rollingCancel)
            this.setTextColor("#settingsRolling", "green");

        if(this.keyDownDoesHardDrop)
            this.setTextColor("#settingsKeyDownHardDrop", "green");

	if(this.spaceDoesHardDrop)
	    this.setTextColor("#settingsSpaceDoesHardDrop", "green");

        $("#settingsPieceGenerator").text("i) Piece Generator: : " + this.pieceGenerator.name);

    },

    setTextColor : function (id, color){
        $(id).css("color", color);
    },

    togglePieceGenerator : function(){

        if(this.pieceGenerator == pieceGeneratorBag){
            this.pieceGenerator = pieceGeneratorRandom;
        }
        else{
            this.pieceGenerator = pieceGeneratorBag;
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
