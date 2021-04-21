// Bee prefab
class Bee extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = -1*game.settings.entitySpeed;  //pixels per frame
        this.facingLeft = true;
        this.pollinating = 0;
        this.pollTime = 500;
        this.anims.create({
            key: 'beeFly',
            frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 59, first: 0}),
            frameRate: 60,
            repeat: -1
        });
        this.anims.play('beeFly');
    }

    update(time, delta) {
        // move Bee
        // if(this.x > 190 && this.facingLeft) {
        //     this.x -= this.moveSpeed;
        // }
        // else if (this.x <= 190 || !this.facingLeft) {
        //     this.flipX = true;
        //     this.facingLeft = false;
        //     this.x += this.moveSpeed;
        //     if(this.x > 500) {
        //         this.facingLeft = true;
        //         this.flipX = false;
        //         this.reset();
        //     }
        // }
        if(this.x <= 190 && this.pollinating <= this.pollTime){
            this.pollinating += delta;
        }
        else if (this.pollinating > this.pollTime){
            this.flipX = true;
            this.moveSpeed *= -1;
            this.pollinating = 0;
            this.pollTime = Math.random() * 1000 + 250;
            this.x = 190 + this.moveSpeed;
        }
        else {
            this.x += this.moveSpeed;
        }
        if (this.x > 500) {
            this.reset();
        }
        
    }
    // position reset
    reset() {
        this.flipX = false;
        this.moveSpeed *= -1;
        this.x = 500 + this.moveSpeed;
    }
}