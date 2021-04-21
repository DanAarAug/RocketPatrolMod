// WaterTile prefab
class WaterTile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.anims.create({
            key: 'waterTile',
            frames: this.anims.generateFrameNumbers('water', { start: 0, end: 31, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.play('waterTile');
    }
}