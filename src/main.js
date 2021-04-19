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
*/

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
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