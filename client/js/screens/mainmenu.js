/**
 * mainmenu.js
 */

var mainmenu = {

    inMenu: false,

    init : function(){
        this.inMenu = true;
    },

    executeKeyAction : function(keypress){

        //a
        if(keypress == 65){
            this.inMenu = false;
            singleplayer.start10Lines();
        }

        //b
        if(keypress == 66){
            this.inMenu = false;
            singleplayer.start40Lines();
        }
        //c
        if(keypress == 67){

        }
        //d
        if(keypress == 68){


        }
        //h - high score
        if(keypress == 72){
            mainmenu.inMenu = false;
            highscore.inHighScore = true;

            $("#highscorescreen").show();
            $("#mainscreen").hide();

        }

        //g - github
        if(keypress == 71){
            window.open("https://github.com/00100100/KeyboardFallingBlocks");
        }

        //m - manual
        if(keypress == 77){
            window.open("./manual_READ_FIRST.txt");
        }

    }

};
