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
        this.load.audio('sfx_chicken_squawk', './assets/chicken_squawk.wav');
        this.load.audio('sfx_chicken_death', './assets/chicken_death.wav');

        // load UI images
        this.load.image('blueBackground', './assets/EggPatrolMenuBG.png');
        this.load.image('border', './assets/EggPatrolBorder.png');
        // load egg
        this.load.image('egg', './assets/egg.png');

        // load minecraft font
        loadFont("minecraft1", "./assets/Minecrafter.Reg.ttf");

    }
    create() {
        // blue background
        this.add.sprite(0, 0, 'blueBackground').setOrigin(0, 0);
        // menu text config
        let menuConfig = {
            fontFamily: 'minecraft1',
            fontSize: '48px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
            fixedWidth: 0,
        }
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'minecraft\nEGG PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '24px';
        this.add.text(game.config.width/2, game.config.height/2 + 80, 'Use mouse to move\nAnd click to fire.\nBewAre of bats!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#555555';
        menuConfig.fontSize = '28px';
        let normalButton = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 120, 'normAl', menuConfig).setOrigin(0.5);
        let hardButton = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 180, 'hard', menuConfig).setOrigin(0.5);
        // add border
        this.add.sprite(0, 0, 'border').setOrigin(0, 0);
        // add egg
        this.add.sprite(game.config.width/2, game.config.height/9, 'egg').setOrigin(0.5, 0);

        // normal difficulty button
        normalButton.setInteractive();
        normalButton.on('pointerdown', () => {
            game.settings = {
            entitySpeed: 2,
            gameTimer: 60000,
            bats: 2,    
            night: false
          }
          this.sound.play('sfx_MC_select');
          this.scene.start('playScene');
        });
        // hard difficulty button
        hardButton.setInteractive();
        hardButton.on('pointerdown', () => {
          game.settings = {
            entitySpeed: 4,
            gameTimer: 45000,    
            bats: 3,
            night: true
          }
          this.sound.play('sfx_MC_select');
          this.scene.start('playScene'); 
        });

        // define keys
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        // if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //   // easy mode
        //   game.settings = {
        //     entitySpeed: 2,
        //     gameTimer: 60000,
        //     bats: 2,    
        //     night: false
        //   }
        //   this.sound.play('sfx_MC_select');
        //   this.scene.start('playScene');    
        // }
        // if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        //   // hard mode
        //   game.settings = {
        //     entitySpeed: 4,
        //     gameTimer: 45000,    
        //     bats: 3,
        //     night: true
        //   }
        //   this.sound.play('sfx_MC_select');
        //   this.scene.start('playScene');    
        // }
      }
}