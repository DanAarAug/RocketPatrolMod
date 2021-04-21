/*
Name: Daniel Aughenbaugh (daughenb@ucsc.edu)
Project Title: Minecraft Egg Patrol
Date: 4-21-21
Time to complete: 20+ hours
*
Points breakdown:
    Mouse control for player movement and mouse click to fire (20)
    Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
    Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
    Create and implement a new weapon (w/ new behavior and graphics) (20)
    Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
    Total: 140
*
Sources citation:
    Personal help with debugging from Colin O'Rourke (csorourk@ucsc.edu)
    Minecraft assets (other than custom background): https://minecraft.fandom.com/wiki/
    Minecraft font: https://www.dafont.com/minecrafter.font - - font loader solution from https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
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