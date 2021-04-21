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
        // move bat
        if(this.x > -100 && this.facingLeft) {
            this.x -= this.moveSpeed;
        }
        else if (this.x <= -100 || !this.facingLeft) {
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
        if(Math.random() < 0.50) {
            this.x = game.config.width;
        } else {
            this.x = -100;
        }
    }
}