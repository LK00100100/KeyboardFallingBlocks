/**
 * common.js
 *
 * loads assets
 *
 */

// Setup requestAnimationFrame and cancelAnimationFrame for use in the game code
(function () {
    var lastTime = 0;
    var vendors = ['ms', ';', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

var loader = {
    loaded: true,
    loadedCount: 0, // Assets that have been loaded so far
    totalCount: 0, // Total number of assets that need to be loaded

    init: function () {
        // check for sound support
        var mp3Support, oggSupport;
        var audio = document.createElement('audio');
        if (audio.canPlayType) {
            // Currently canPlayType() returns: "", "maybe" or "probably"
            mp3Support = "" != audio.canPlayType('audio/mpeg');
            oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
        } else {
            //The audio tag is not supported
            mp3Support = false;
            oggSupport = false;
        }

        // Check for ogg, then mp3, and finally set soundFileExtn to undefined
        loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
    },
    loadImage: function (url) {
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var image = new Image();
        image.src = url;
        image.onload = loader.itemLoaded;
        return image;
    },
    soundFileExtn: ".ogg",
    loadSound: function (url) {
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var audio = new Audio();
        audio.src = url + loader.soundFileExtn;
        audio.addEventListener("canplaythrough", loader.itemLoaded, false);
        return audio;
    },
    itemLoaded: function () {
        loader.loadedCount++;
        $('#loadingmessage').html('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);
        if (loader.loadedCount === loader.totalCount) {
            loader.loaded = true;
            $('#loadingscreen').hide();
            if (loader.onload) {
                loader.onload();
                loader.onload = undefined;
            }
        }
    }
}

/* The default load() method used by all our game entities*/
function loadItem(name) {
    var item = this.list[name];
    // if the item sprite array has already been loaded then no need to do it again
    if (item.spriteArray) {
        return;
    }
    item.spriteSheet = loader.loadImage('images/' + this.defaults.type + '/' + name + '.png');
    item.spriteArray = [];
    item.spriteCount = 0;

    for (var i = 0; i < item.spriteImages.length; i++) {
        var constructImageCount = item.spriteImages[i].count;
        var constructDirectionCount = item.spriteImages[i].directions;
        if (constructDirectionCount) {
            for (var j = 0; j < constructDirectionCount; j++) {
                var constructImageName = item.spriteImages[i].name + "-" + j;
                item.spriteArray[constructImageName] = {
                    name: constructImageName,
                    count: constructImageCount,
                    offset: item.spriteCount
                };
                item.spriteCount += constructImageCount;
            }
            ;
        } else {
            var constructImageName = item.spriteImages[i].name;
            item.spriteArray[constructImageName] = {
                name: constructImageName,
                count: constructImageCount,
                offset: item.spriteCount
            };
            item.spriteCount += constructImageCount;
        }
    }
    ;
    // Load the weapon if item has one
    if (item.weaponType) {
        bullets.load(item.weaponType);
    }

}

/* The default add() method used by all our game entities*/
function addItem(details) {
    var item = {};
    var name = details.name;
    $.extend(item, this.defaults);
    $.extend(item, this.list[name]);
    item.life = item.hitPoints;
    $.extend(item, details);
    return item;
}


