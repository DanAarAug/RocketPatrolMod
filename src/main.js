/*
Name: Daniel Aughenbaugh (daughenb@ucsc.edu)
Project Title:
Date:
Time to complete:
*
Points breakdown:
    Mouse control for player movement and mouse click to fire (20)
*
Sources citation:
Personal help from: Colin O'Rourke (csorourk@ucsc.edu)
Minecraft animation assets: https://minecraft.fandom.com/wiki/Animation
Minecraft font: https://www.dafont.com/minecrafter.font - - - loader solution from https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
*/

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 480,
    height: 640,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;
// reserve mouse bindings
let mouse1, mouseX, mouseY;

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}