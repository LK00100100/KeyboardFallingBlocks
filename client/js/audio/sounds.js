/**
 * sounds.js
 * handles sound-related things
 */

var sounds = {
    list: {
        //"message-received":["message"]
    },
    loaded: {},
    init: function () {
        for (var soundName in this.list) {
            var sound = {};
            sound.audioObjects = [];
            for (var i = 0; i < this.list[soundName].length; i++) {
                sound.audioObjects.push(loader.loadSound('audio/' + this.list[soundName][i]));
            }
            this.loaded [soundName] = sound;
        }
    },
    play: function (soundName) {
        var sound = sounds.loaded[soundName];
        if (sound && sound.audioObjects && sound.audioObjects.length > 0) {
            if (!sound.counter || sound.counter >= sound.audioObjects.length) {
                sound.counter = 0;
            }
            var audioObject = sound.audioObjects[sound.counter];
            sound.counter++;
            audioObject.play();
        }
    }
};
