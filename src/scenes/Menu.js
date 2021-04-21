class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_MC_select', './assets/mc_select.wav');
        this.load.audio('sfx_egg_throw', './assets/egg_throw.wav');
        this.load.audio('sfx_egg_pop', './assets/egg_pop.wav');
        this.load.audio('sfx_bee_death', './assets/bee_death.wav');
        this.load.audio('sfx_bat_death', './assets/bat_death.wav');
        this.load.audio('sfx_cod_death', './assets/cod_death.wav');
        this.load.audio('sfx_rabbit_death', './assets/rabbit_death.wav');

        // load UI images
        this.load.image('border', './assets/EggPatrolBorder.png');
        // load egg
        this.load.image('egg', './assets/egg.png');

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
        this.add.text(game.config.width/2, game.config.height/2, 'Use mouse to move\nand click to fire.\nBeware of bats!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#333333';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 40, 'Press ← for Novice\nor → for Expert', menuConfig).setOrigin(0.5);
        // add border
        this.add.sprite(0, 0, 'border').setOrigin(0, 0);
        // add egg
        this.add.sprite(game.config.width/2, game.config.height/10, 'egg').setOrigin(0.5, 0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            entitySpeed: 2,
            gameTimer: 60000,
            bats: 2    
          }
          this.sound.play('sfx_MC_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            entitySpeed: 4,
            gameTimer: 45000,    
            bats: 3
          }
          this.sound.play('sfx_MC_select');
          this.scene.start('playScene');    
        }
      }
}