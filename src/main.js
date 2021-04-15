/*
Name: Daniel Aughenbaugh (daughenb@ucsc.edu)
Project Title:
Date:
Time to complete:
*
Points breakdown:
*
Sources citation:
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