/**
 * Created by Keh,L on 1/16/2017.
 */

var keyFuncs = {

    //rotate - clockwise # times
    //col - column to place, upper-left corner of piece

    /*
     * 1st row of keys
     */
    49:function(){  //1, rotate 0, col 0
        game.commands.push({rotate:0, col:0});
    },
    50:function(){  //2, rotate 0, col 1
        game.commands.push({rotate:0, col:1});
    },
    51:function(){  //3, rotate 0, col 2
        game.commands.push({rotate:0, col:2});
    },
    52:function(){  //4, rotate 0, col 3
        game.commands.push({rotate:0, col:3});
    },
    53:function(){  //5, rotate 0, col 4
        game.commands.push({rotate:0, col:4});
    },
    54:function(){  //6, rotate 0, col 5
        game.commands.push({rotate:0, col:5});
    },
    55:function(){  //7, rotate 0, col 6
        game.commands.push({rotate:0, col:6});
    },
    56:function(){  //8, rotate 0, col 7
        game.commands.push({rotate:0, col:7});
    },
    57:function(){  //9, rotate 0, col 8
        game.commands.push({rotate:0, col:8});
    },
    48:function(){  //0, rotate 0, col 9
        game.commands.push({rotate:0, col:9});
    },

    /*
     * 2nd rows of key
     */
    81:function(){  //q, rotate 1, col 0,
        game.commands.push({rotate:1, col:0});
    },
    87:function(){  //w, rotate 1, col 1,
        game.commands.push({rotate:1, col:1});
    },
    69:function(){  //e, rotate 1, col 2,
        game.commands.push({rotate:1, col:2});
    },
    82:function(){  //r, rotate 1, col 3,
        game.commands.push({rotate:1, col:3});
    },
    84:function(){  //t, rotate 1, col 4,
        game.commands.push({rotate:1, col:4});
    },
    89:function(){  //y, rotate 1, col 5,
        game.commands.push({rotate:1, col:5});
    },
    85:function(){  //u, rotate 1, col 6,
        game.commands.push({rotate:1, col:6});
    },
    73:function(){  //i, rotate 1, col 7,
        game.commands.push({rotate:1, col:7});
    },
    79:function(){  //o, rotate 1, col 8,
        game.commands.push({rotate:1, col:8});
    },
    80:function(){  //p, rotate 1, col 9,
        game.commands.push({rotate:1, col:9});
    },

    /*
     * 3rd rows of keys
     */
    65:function(){  //a, rotate 2, col 0,
        game.commands.push({rotate:2, col:0});
    },
    83:function(){  //s, rotate 2, col 1,
        game.commands.push({rotate:2, col:1});
    },
    68:function(){  //d, rotate 2, col 2,
        game.commands.push({rotate:2, col:2});
    },
    70:function(){  //f, rotate 2, col 3,
        game.commands.push({rotate:2, col:3});
    },
    71:function(){  //g, rotate 2, col 4,
        game.commands.push({rotate:2, col:4});
    },
    72:function(){  //h, rotate 2, col 5,
        game.commands.push({rotate:2, col:5});
    },
    74:function(){  //j, rotate 2, col 6,
        game.commands.push({rotate:2, col:6});
    },
    75:function(){  //k, rotate 2, col 7,
        game.commands.push({rotate:2, col:7});
    },
    76:function(){  //l, rotate 2, col 8,
        game.commands.push({rotate:2, col:8});
    },
    59:function(){  //;, rotate 2, col 9,
        game.commands.push({rotate:2, col:9});
    },

    /*
     * 4th row of keys
     */
    90:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:0});
    },
    88:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:1});
    },
    67:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:2});
    },
    86:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:3});
    },
    66:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:4});
    },
    78:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:5});
    },
    77:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:6});
    },
    188:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:7});
    },
    190:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:8});
    },
    191:function(){  //w, rotate 3, col 1,
        game.commands.push({rotate:3, col:9});
    },

    //shift, "hold" (if it wasn't recently used)
    16:function(){

        if(game.justPressedHold)
            return;

        keyFuncs.nullifyCommands();

        game.commands.push({hold:true});
    },

    //space, "cancel"
    32:function(){  //space, "cancel", erase all commands
        game.commandCancel = true;

        keyFuncs.nullifyCommands();
    },

    /*
     * the keys that are currently being pressed are inert
     * all commands in queue are not executed.
     */
    nullifyCommands: function(){

        keyFuncs.activeKeys = [];
        game.commands = [];
        game.hardDrop = false;
    },

    /*
     * these help notify if the key is already being pressed dwon
     * so we don't keep calling it again and again.
     * this will make sure keydown activates only once.
     */
    pressed49:false,
    pressed50:false,
    pressed51:false,
    pressed52:false,
    pressed53:false,
    pressed54:false,
    pressed55:false,
    pressed56:false,
    pressed57:false,
    pressed48:false,

    pressed81:false,
    pressed87:false,
    pressed69:false,
    pressed82:false,
    pressed84:false,
    pressed89:false,
    pressed85:false,
    pressed73:false,
    pressed79:false,
    pressed80:false,

    pressed65:false,
    pressed83:false,
    pressed68:false,
    pressed70:false,
    pressed71:false,
    pressed72:false,
    pressed74:false,
    pressed75:false,
    pressed76:false,
    pressed59:false,

    pressed90:false,
    pressed88:false,
    pressed67:false,
    pressed86:false,
    pressed66:false,
    pressed78:false,
    pressed77:false,
    pressed188:false,
    pressed190:false,
    pressed191:false,

    /*
     * notes if the keyup should be used or ignored
     * if the key's been cancelled or hard-dropped by another piece on the frame,
     * then these keys should be nullified.
     */
    activeKeys:[]

};

//keydown
$(window).keydown(function(e){

    //TODO remove
    console.log(keyPressed);

    //TODO implement chat? probably not. dont feel like being called names
    // Chatting only allowed in multiplayer when game is running
    if(game.type != "multiplayer" || !game.running){
        // return;
    }

    //do a keyboard action.
    var keyPressed = e.which;

    //shift (hold) or space (cancel)
    if(keyPressed == 32){
        keyFuncs[keyPressed].call();
        return;
    }

    //if this keydown function exists
    if(keyFuncs[keyPressed]) {

        //if this key is not being currently pressed
        if(keyFuncs["pressed" + keyPressed] == false){
            keyFuncs["pressed" + keyPressed] = true;

            keyFuncs.activeKeys.push(keyPressed);

            //TODO remove this
            console.log("pressed:" + keyPressed);

            keyFuncs[keyPressed].call();
        }
    }

    //console.log(e.which)

    //var isVisible = $('#chatmessage').val(e.which);
    //if (e.which == 13){ // Enter key pressed
    //    var isVisible = $('#chatmessage').is(':visible');
    //    if (isVisible){
    //        // if chat box is visible, pressing enter sends the message and hides the chat box
    //        if ($('#chatmessage').val()!= ''){
    //            multiplayer.sendWebSocketMessage({type:"chat",message:$('#chatmessage').val()});
    //            $('#chatmessage').val('');
    //        }
    //        $('#chatmessage').hide();
    //    } else {
    //        // if chat box is not visible, pressing enter shows the chat box
    //        $('#chatmessage').show();
    //        $('#chatmessage').focus();
    //    }
    //    e.preventDefault();
    //} else if (e.which==27){ // Escape key pressed
    //    // Pressing escape hides the chat box
    //    $('#chatmessage').hide();
    //    $('#chatmessage').val('');
    //    e.preventDefault();
    //}
});

//keyup
$(window).keyup(function(e){

    var keyPressed = e.which;
    keyFuncs["pressed" + keyPressed] = false;

    //TODO remove this
    console.log("keyup:" + keyPressed);

    //hold
    if(keyPressed == 16){
        console.log("keyup:" + keyPressed + "CALL");
        keyFuncs[keyPressed].call();
        return;
    }

    //space bar
    //do nothing, do not hard drop.
    if(keyPressed == 32)
        return;

    //TODO implement hold, dont hard drop


    //if the key released isn't nullified
    //finalize the move and do a harddrop
    //active harddrop
    if(keyFuncs.activeKeys.indexOf(keyPressed) != -1) {

        //all other keys are nullified.
        keyFuncs.activeKeys = [];
        game.commands = [];
        keyFuncs[keyPressed].call();

        game.hardDrop = true;

    }

});
