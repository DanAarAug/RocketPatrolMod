// Bee prefab
class Bee extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;  //pixels per frame
        this.anims.create({
            key: 'beeFly',
            frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 59, first: 0}),
            frameRate: 30,
            repeat: -1
        });
        this.anims.play('beeFly');
    }

    update() {
        // move Bee left
        this.x -= this.moveSpeed;
        // wrap around from left to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.x = game.config.width;
        //this.anims.play('beeFly');
    }
}