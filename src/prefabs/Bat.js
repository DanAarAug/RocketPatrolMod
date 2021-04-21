// Bat prefab
class Bat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = game.settings.entitySpeed * 0.7;  //pixels per frame
        this.anims.create({
            key: 'batFly',
            frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 150, first: 0}),
            frameRate: 60,
            repeat: -1
        });
        this.anims.play('batFly');
    }

    update() {
        // move bat left
        this.x -= this.moveSpeed;
        // wrap around from left to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.x = game.config.width;
    }
}