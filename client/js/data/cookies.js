"use strict";

/**
 * cookies.js
 *
 * manages cookies
 */

var cookies = {

    dict : {},

    /**
     * assumed: keys and values do not use '=' or ';'
     *
     */
    convertCookieStringToDictionary : function(cookieString){

        var cookie = document.cookie.split(";");

        var keyVal;
        for(var i = 0; i < cookie.length; i++){
            keyVal = cookie[i].split("=");
            this.dict[keyVal[0].trim()] = keyVal[1];
        }
    },

    /**
     * puts this dict into settings
     */
    //note: chrome does not like cookie-reading/writing when doing it from file://
    loadCookies : function () {

        var cookie = document.cookie;

        if(cookie.length == 0){
            console.log("No cookies");
            return;
        }

        this.convertCookieStringToDictionary(cookie);

        console.log("loading cookies");

        if(this.dict["ghost"] == "1")
            settings.enableGhost = true;
        else
            settings.enableGhost = false;

        if(this.dict["rollingCancel"] == "1")
            settings.rollingCancel = true;
        else
            settings.rollingCancel = false;

        if(this.dict["keydownHard"] == "1")
            settings.keyDownDoesHardDrop = true;
        else
            settings.keyDownDoesHardDrop = false;

        if(this.dict["spaceHard"] == "1")
            settings.spaceDoesHardDrop = true;
        else
            settings.spaceDoesHardDrop = false;

        if(this.dict["piecePreview"] != null)
            settings.piecePreviewCount = parseInt(this.dict["piecePreview"]);

        if(this.dict["generator"] == "random")
            settings.pieceGenerator = pieceGeneratorRandom;
        else
            settings.pieceGenerator = pieceGeneratorBag;

        if(this.dict["highScore"] != ""){

            var scores = this.dict["highScore"].split(",");

            for(var i = 0; i < scores.length; i++){
                scores[i] = Number(scores[i]);
            }

            highscore.loadHighScores(scores);
        }

    },

    saveCookies : function (){
        //Some browsers will not let you delete a cookie if you don't specify the path.
        document.cookie = "path=";

        //set this cookie's expiration date so it stays persistent
        var d = new Date();
        var numDays = 365;
        d.setTime(d.getTime() + (numDays*24*60*60*1000));

        var expires = "expires="+ d.toUTCString();
        document.cookie = expires;

        /**
         * settings
         */
        if(settings.enableGhost)
            document.cookie = "ghost=1";
        else
            document.cookie = "ghost=0";

        if(settings.rollingCancel)
            document.cookie = "rollingCancel=1";
        else
            document.cookie = "rollingCancel=0";

        if(settings.keyDownDoesHardDrop)
            document.cookie = "keydownHard=1";
        else
            document.cookie = "keydownHard=0";

        if(settings.spaceDoesHardDrop)
            document.cookie = "spaceHard=1";
        else
            document.cookie = "spaceHard=0";

        document.cookie = "piecePreview=" + settings.piecePreviewCount;

        if(settings.keyDownDoesHardDrop)
            document.cookie = "keydownHard=1";
        else
            document.cookie = "keydownHard=0";

        if(settings.pieceGenerator == pieceGeneratorBag)
            document.cookie = "generator=bag";
        else if(settings.pieceGenerator == pieceGeneratorRandom)
            document.cookie = "generator=random";

        /**
         * high score
         */
        document.cookie = "highScore=" + highscore.toString();

    }

};

