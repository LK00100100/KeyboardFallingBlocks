/**
 * screenManager.js
 *
 * Manages the state of screens
 */

var screenManager = {

    currentScreen : mainmenu,

    /**
     * set the next screen and show the ui elements
     *
     * @param nextScreen
     */
    setScreenAndKeyboard : function(nextScreen){
        this.currentScreen.hideScreen();

        //next screen stuff
        this.currentScreen = nextScreen;
        this.currentScreen.showScreen();
        this.currentScreen.setKeyboard();
    }

};

