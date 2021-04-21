// Chicken prefab
class Chicken extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = game.settings.entitySpeed * 0.4;  //pixels per frame
        //create an inverse slope angle between bottom left and bottom right for the chicken to fly down at
        this.minX = (0 - this.x)/(game.config.height - this.y);
        this.maxX = (game.config.width - this.x)/(game.config.height - this.y);
        this.xAngle = Math.random() * (this.maxX - this.minX) + this.minX;
        this.anims.create({
            key: 'chickenFlap',
            frames: this.anims.generateFrameNumbers('chicken', { start: 0, end: 7, first: 0}),
            frameRate: 30,
            repeat: -1
        });
        this.anims.play('chickenFlap');
    }
    
    update() {
        // move Chicken down
        this.y += this.moveSpeed;
        this.x += this.xAngle;
        if(this.y > game.config.height) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.y = game.config.height + 50;
    }
}