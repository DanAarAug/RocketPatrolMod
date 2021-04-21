// Bee prefab
class Bee extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = game.settings.entitySpeed;  //pixels per frame
        this.facingLeft = true;
        this.anims.create({
            key: 'beeFly',
            frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 59, first: 0}),
            frameRate: 60,
            repeat: -1
        });
        this.anims.play('beeFly');
    }

    update() {
        // move Bee left
        if(this.x > 190 && this.facingLeft) {
            this.x -= this.moveSpeed;
        }
        else if (this.x <= 190 || !this.facingLeft) {
            this.flipX = true;
            this.facingLeft = false;
            this.x += this.moveSpeed;
            if(this.x > 500) {
                this.facingLeft = true;
                this.flipX = false;
                this.reset();
            }
        }
    }
    // position reset
    reset() {
        this.x = game.config.width;
    }
}