/**
 * settings.js
 *
 * holds user defined settings.
 */

var cookies = {

    readCookies : function (){
        document.cookie = null;

        var cookie = document.cookie;

        if(cookie.length == 0){
            console.log("No cookies");
            return;
        }


        cookie = convertCookieStringToDictionary(cookie);


    },

    convertCookieStringToDictionary : function(){

        var cookie = document.cookie.split(";");

    },

    writeSettingsCookies : function (){
        document.cookie = "";

        //set or else it'll expire when the browser closes
        //expires=date
    }


};

cookies.readCookies();
