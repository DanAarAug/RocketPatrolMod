// Egg (player) prefab
class Egg extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;      // track Egg firing status
        this.moveSpeed = 10;        // pixels per frame

        this.sfxEggThrow = scene.sound.add('sfx_egg_throw'); // add egg throw sfx
        this.sfxEggPop = scene.sound.add('sfx_egg_pop'); // add egg pop sfx
    }

    update() {
        
        // if fired, move the egg up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }

        // mouse fire
        if(mouse1 && !this.isFiring) {
            this.isFiring = true;
            this.sfxEggThrow.play();  // play sfx
        }
        // mouse left/right movement
        if(!this.isFiring && mouseX >= this.width * 0.5 && mouseX <= game.config.width - this.width * 0.5) {
            this.x = mouseX;
        }
    }
    reset() {
        this.sfxEggPop.play();  // play sfx
        this.isFiring = false;
        this.y = game.config.height - borderUISize - 5;
    }
}