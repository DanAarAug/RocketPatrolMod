class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_MC_select', './assets/mc_select.wav');
        this.load.audio('sfx_egg_throw', './assets/egg_throw.wav');
        this.load.audio('sfx_bee_death', './assets/bee_death.wav');
        this.load.audio('sfx_egg_pop', './assets/egg_pop.wav');

        // load minecraft font
        loadFont("minecraft1", "./assets/Minecrafter.Reg.ttf");

    }
    create() {
        // menu text config
        let menuConfig = {
            fontFamily: 'minecraft1',
            fontSize: '28px',
            backgroundColor: '#333333',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 40, 'EGG PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use mouse to move\nand click to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#333333';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 40, 'Press ← for Novice\nor → for Expert', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_MC_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_MC_select');
          this.scene.start('playScene');    
        }
      }
}