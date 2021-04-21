// Rabbit prefab
class Rabbit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = game.settings.entitySpeed * 0.8;  //pixels per frame
        this.facingLeft = false;
        this.flipX = true;
        this.anims.create({
            key: 'rabbitHop',
            frames: this.anims.generateFrameNumbers('rabbit', { start: 0, end: 17, first: 0}),
            frameRate: 60,
            repeat: -1
        });
        this.anims.play('rabbitHop');
    }

    update() {
        // move rabbit
        if(this.x < 100 && !this.facingLeft) {
            this.x += this.moveSpeed;
        }
        else if (this.x >= 100 || this.facingLeft) {
            this.flipX = false;
            this.facingLeft = true;
            this.x -= this.moveSpeed;
            if(this.x < -150) {
                this.facingLeft = false;
                this.flipX = true;
                this.reset();
            }
        }
    }
    // position reset
    reset() {
        this.x = -150;
    }
}