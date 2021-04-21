class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        // load egg
        this.load.image('egg', './assets/egg.png');
        // load custom minecraft background
        this.load.image('background', './assets/EggPatrolBG1.png');
        // load spritesheets
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('bee', './assets/minecraftBee.png', {frameWidth: 150, frameHeight: 150, startFrame: 0, endFrame: 59});
        this.load.spritesheet('bat', './assets/bat.png', {frameWidth: 224, frameHeight: 281, startFrame: 0, endFrame: 150});
        this.load.spritesheet('cod', './assets/codAnim.png', {frameWidth: 300, frameHeight: 228, startFrame: 0, endFrame: 11});
        this.load.spritesheet('rabbit', './assets/rabbit.png', {frameWidth: 230, frameHeight: 300, startFrame: 0, endFrame: 17});
    }

    create() {
        // place starfield

        // // green UI background
        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // // white borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // set scale for sprites
        this.beeScale = 0.4;
        this.eggScale = 0.4;
        this.batScale = 0.3;
        this.codScale = 0.2;
        this.rabbitScale = 0.3;
        // custom minecraft background
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        // add egg (player 1)
        this.p1Egg = new Egg(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'egg').setOrigin(0.5, 0).setScale(this.eggScale);

        // add bee
        this.bee01 = new Bee(this, game.config.width + 20, borderUISize * 3.5, 'bee', 0, 30).setOrigin(0, 0).setScale(this.beeScale);
        // add bat
        this.bat01 = new Bat(this, game.config.width + 20, borderUISize * 11, 'bat', 0, -5).setOrigin(0, 0).setScale(this.batScale);
        //add cod
        this.cod01 = new Cod(this, game.config.width - 20, borderUISize * 7, 'cod', 0, 20).setOrigin(0, 0).setScale(this.codScale);
        //add rabbit
        this.rabbit01 = new Rabbit(this, 1, borderUISize * 5, 'rabbit', 0, 50).setOrigin(0, 0).setScale(this.rabbitScale);
        // bee bounds debug
        // let bee01bounds = this.bee01.getBounds();
        // this.rect1 = this.add.rectangle(bee01bounds.x, bee01bounds.y, bee01bounds.width, bee01bounds.height, 0xFF0000).setOrigin(0, 0);
        // this.rect1.isFilled = false;
        // this.rect1.isStroked = true;
        // this.rect1.setStrokeStyle(2, 0xFF0000, 1);
        
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
        //this.rect1.x = this.bee01.x;
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

            this.bee01.update();    // update bee
            this.bat01.update();    // update bat
            this.cod01.update();    // update cod
            this.rabbit01.update();    // update rabbit
        } 
        //check bee collisions
        if (this.checkCollision(this.p1Egg, this.bee01, this.beeScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.bee01, 'explosion', 'explode', 'sfx_bee_death');
        }
        //check bat collisions
        if (this.checkCollision(this.p1Egg, this.bat01, this.batScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.bat01, 'explosion', 'explode', 'sfx_bat_death');
        }
        //check cod collisions
        if (this.checkCollision(this.p1Egg, this.cod01, this.codScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.cod01, 'explosion', 'explode', 'sfx_cod_death');
        }
        //check rabbit collisions
        if (this.checkCollision(this.p1Egg, this.rabbit01, this.rabbitScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.rabbit01, 'explosion', 'explode', 'sfx_rabbit_death');
        }
    }
    checkCollision(egg, entity, scale) {
        if(egg.x < entity.x + entity.width*scale && egg.x + egg.width*scale/2 > entity.x && egg.y < entity.y + entity.height*scale && egg.height*this.eggScale + egg.y > entity.y) {
            return true;
        } else {
            return false;
        }
    }

      entityExplode(entity, animSpritesheet, animKey, sfx) {
        //temporarily hide entity
        entity.alpha = 0;
        // create anim sprite at entity's position
        let boom = this.add.sprite(entity.x, entity.y, animSpritesheet).setOrigin(0, 0);
        boom.anims.play(animKey);             // play animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          entity.reset();                         // reset entity position
          entity.alpha = 1;                       // make entity visible again
          boom.destroy();                       // remove anim sprite
        });
        entity.reset();                         // reset entity position
        // score add and repaint
        this.p1Score += entity.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play(sfx);
      }

}
