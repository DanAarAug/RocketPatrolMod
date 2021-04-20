class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load egg
        this.load.image('egg', './assets/egg.png');
        // load custom minecraft background
        this.load.image('background', './assets/EggPatrolBG1.png');
        // load spritesheets
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('bee', './assets/minecraftBee.png', {frameWidth: 150, frameHeight: 150, startFrame: 0, endFrame: 59});
    }

    create() {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // set scale for sprites
        this.beeScale = 0.4;
        this.eggScale = 0.4;
        // custom minecraft background
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        // add egg (player 1)
        this.p1Egg = new Egg(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'egg').setOrigin(0.5, 0).setScale(this.eggScale);

        // add bee(s)
        this.bee01 = new Bee(this, game.config.width, borderUISize * 4, 'bee', 0, 30).setOrigin(0, 0).setScale(this.beeScale);
        // bee bounds debug
        let bee01bounds = this.bee01.getBounds();
        this.rect1 = this.add.rectangle(bee01bounds.x, bee01bounds.y, bee01bounds.width, bee01bounds.height, 0xFF0000).setOrigin(0, 0);
        this.rect1.isFilled = false;
        this.rect1.isStroked = true;
        this.rect1.setStrokeStyle(2, 0xFF0000, 1);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //pointer down input
        this.input.on('pointerdown', function (pointer) {
            if(pointer.leftButtonDown()) {
                mouse1 = true;
            }
        }, this);
        //pointer up input
        this.input.on('pointerup', function (pointer) {
            if(pointer.event.button === 0) {
                mouse1 = false;
            }
        });
        //pointer x and y
        this.input.on('pointermove', function (pointer) {
            mouseX = pointer.x;
            mouseY = pointer.y;
        }, this);
    

        // animations config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // this.anims.create({
        //     key: 'beeFly',
        //     frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 59, first: 0}),
        //     frameRate: 30,
        //     repeat: 1
        // });
        // this.bee01.anims.play('beeFly');
        // this.bee01.on('animationcomplete', () => {    // callback after anim completes
        //     this.bee01.anims.play('beeFly');            
        //   });

        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'minecraft1',
            fontSize: '36px',
            backgroundColor: '#555555',
            color: '#FFFFFF',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 120
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 0.5, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart\nor ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        this.rect1.x = this.bee01.x;
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_MC_select');
            this.scene.restart();
        }
        // check key input for menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_MC_select');
            this.scene.start("menuScene");
        }

        //this.starfield.tilePositionX -= starSpeed;

        if (!this.gameOver) {               
            this.p1Egg.update();    // update egg sprite

            this.bee01.update();    // update bee(s)
        } 
        //check bee collisions
        if (this.checkBeeCollision(this.p1Egg, this.bee01)) {
            this.p1Egg.reset();
            this.beeExplode(this.bee01);
        }
    }
    checkBeeCollision(egg, bee) {
        if(egg.x < bee.x + bee.width*this.beeScale && egg.x + egg.width*this.eggScale/2 > bee.x && egg.y < bee.y + bee.height*this.beeScale && egg.height*this.eggScale + egg.y > bee.y) {
            return true;
        } else {
            return false;
        }
    }

      beeExplode(bee) {
        //temporarily hide bee
        bee.alpha = 0;
        // create explosion sprite at bee's position
        let boom = this.add.sprite(bee.x, bee.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          bee.reset();                         // reset bee position
          bee.alpha = 1;                       // make bee visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += bee.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_bee_death');
      }

}
