/**
 * settings.js
 *
 * holds user defined settings.
 *
 */

var settings = {

    inSettings: false,
    currentGameVersion : 1,

    //version of save
    version : null,
    enableGhost : true,
    rollingCancel : true,
    keyDownDoesHardDrop : false,
    highScores : null,

    readCookies : function (){
        var keys = document.cookie.split(";");

        this.version = keys[0];

        //null save file
        if(this.version == null)
            return;

        //bad save file
        if(this.version != this.currentGameVersion)
            return;


    },

    writeCookies : function (){


    }


};

settings.readCookies();