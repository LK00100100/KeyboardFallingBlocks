/**
 * highscore.js
 */

var highscore = {

    inHighScore: false,

    init : function(){
        this.inHighscore = true;
    },

    executeKeyAction : function(keypress){

        //a
        if(keypress == 65){

        }

        //b
        if(keypress == 66){

        }
        //c
        if(keypress == 67){

        }
        //d
        if(keypress == 68){


        }
        //z - back to main menu
        if(keypress == 90){
            highscore.inHighScore = false;
            mainmenu.inMenu = true;

            $("#highscorescreen").hide();
            $("#mainscreen").show();
        }
    }

};
