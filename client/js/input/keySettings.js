/**
 * keySettings.js
 *
 * settings screen keyboard handling
 */

var keySettings = {

    executeKeyDown : function(e) {

        var keyPressed = e.which;

        //g - toggle ghost piece
        if (keyPressed == 71) {
            settings.enableGhost = !settings.enableGhost;
        }

        //r - rolling key cancel
        if (keyPressed == 82) {
            settings.rollingCancel = !settings.rollingCancel;
        }

        //h - keydown harddrop
        if (keyPressed == 72) {
            settings.keyDownDoesHardDrop = !settings.keyDownDoesHardDrop;
        }

	//s - space harddrop
	if (keyPressed == 83) {
            settings.spaceDoesHardDrop = !settings.spaceDoesHardDrop;
	}

        //p - preview count
        if (keyPressed == 80) {
            settings.incrementPiecePreview();
        }

        //i - preview count
        if (keyPressed == 73) {
            settings.togglePieceGenerator();
        }

        //"\"
        if (keyPressed == 220) {
            cookies.writeCookies();

            screenManager.setScreenAndKeyboard(mainmenu);
        }

        settings.updateSettingsDraw();
    },

    executeKeyUp : function (e) {}

};


