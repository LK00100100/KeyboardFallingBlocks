/**
 * screenSettings.js
 *
 * a screen which displays user defined settings
 *
 * interacts with settings.js
 */

var screenSettings = {

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
