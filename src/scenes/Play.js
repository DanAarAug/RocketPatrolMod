class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        // load custom minecraft backgrounds
        this.load.image('background', './assets/EggPatrolBG1.png');
        this.load.image('backgroundNight', './assets/EggPatrolBGNight.png');
        // load particle
        this.load.image('egg_particle', './assets/eggParticle.png');
        // load spritesheets
        this.load.spritesheet('water', './assets/water.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 31});
        this.load.spritesheet('bee', './assets/minecraftBee.png', {frameWidth: 150, frameHeight: 150, startFrame: 0, endFrame: 59});
        this.load.spritesheet('bat', './assets/bat.png', {frameWidth: 224, frameHeight: 281, startFrame: 0, endFrame: 150});
        this.load.spritesheet('cod', './assets/codAnim.png', {frameWidth: 300, frameHeight: 228, startFrame: 0, endFrame: 11});
        this.load.spritesheet('rabbit', './assets/rabbit.png', {frameWidth: 230, frameHeight: 300, startFrame: 0, endFrame: 17});
        this.load.spritesheet('chicken', './assets/chicken.png', {frameWidth: 300, frameHeight: 319, startFrame: 0, endFrame: 7});
    }

    create() {
        // // green UI background
        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // // white borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.eggScale = 0.4;
        this.eggCanThrow = false;
        // set entity variables
        this.beeScale = 0.35;
        this.beePoints = 30;

        this.batScale = 0.3;
        this.batPoints = -10;
        if (game.settings.bats == 3) {
            this.batPoints = -15;
        }

        this.codScale = 0.2;
        this.codPoints = 20;

        this.rabbitScale = 0.28;
        this.rabbitPoints = 50;

        this.chickenScale = 0.2;
        this.chickenPoints = 100;

        // moving water
        // row 1
        this.watertile01 = new WaterTile(this, 256, 288, 'water', 0).setOrigin(0, 0);
        this.watertile02 = new WaterTile(this, 288, 288, 'water', 0).setOrigin(0, 0);
        this.watertile03 = new WaterTile(this, 320, 288, 'water', 0).setOrigin(0, 0);
        this.watertile04 = new WaterTile(this, 352, 288, 'water', 0).setOrigin(0, 0);
        this.watertile05 = new WaterTile(this, 384, 288, 'water', 0).setOrigin(0, 0);
        this.watertile06 = new WaterTile(this, 416, 288, 'water', 0).setOrigin(0, 0);
        // row 2
        this.watertile07 = new WaterTile(this, 288, 320, 'water', 0).setOrigin(0, 0);
        this.watertile08 = new WaterTile(this, 320, 320, 'water', 0).setOrigin(0, 0);
        this.watertile09 = new WaterTile(this, 352, 320, 'water', 0).setOrigin(0, 0);
        this.watertile10 = new WaterTile(this, 384, 320, 'water', 0).setOrigin(0, 0);
        this.watertile11 = new WaterTile(this, 416, 320, 'water', 0).setOrigin(0, 0);
        // row 3
        this.watertile12 = new WaterTile(this, 320, 352, 'water', 0).setOrigin(0, 0);
        this.watertile13 = new WaterTile(this, 352, 352, 'water', 0).setOrigin(0, 0);
        this.watertile14 = new WaterTile(this, 384, 352, 'water', 0).setOrigin(0, 0);
        this.watertile15 = new WaterTile(this, 416, 352, 'water', 0).setOrigin(0, 0);
        // custom minecraft background
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        if (game.settings.night) {
            this.add.sprite(0, 0, 'backgroundNight').setOrigin(0, 0);
        }
        
        // add bee
        this.bee01 = new Bee(this, game.config.width + 20, borderUISize * 3.7, 'bee', 0, this.beePoints).setOrigin(0, 0).setScale(this.beeScale);
        // add bats
        this.bat01 = new Bat(this, game.config.width + 20, borderUISize * 11, 'bat', 0, this.batPoints).setOrigin(0, 0).setScale(this.batScale);
        this.bat02 = new Bat(this, 20, borderUISize * 11, 'bat', 0, this.batPoints).setOrigin(0, 0).setScale(this.batScale);
        if (game.settings.bats == 3) {
            this.bat03 = new Bat(this, game.config.width/2, borderUISize * 11, 'bat', 0, this.batPoints).setOrigin(0, 0).setScale(this.batScale);
        }
        //add cod
        this.cod01 = new Cod(this, game.config.width - 20, borderUISize * 7, 'cod', 0, this.codPoints).setOrigin(0, 0).setScale(this.codScale);
        //add rabbit
        this.rabbit01 = new Rabbit(this, 1, borderUISize * 5, 'rabbit', 0, this.rabbitPoints).setOrigin(0, 0).setScale(this.rabbitScale);
        // bee bounds debug
        // let bee01bounds = this.bee01.getBounds();
        // this.rect1 = this.add.rectangle(bee01bounds.x, bee01bounds.y, bee01bounds.width, bee01bounds.height, 0xFF0000).setOrigin(0, 0);
        // this.rect1.isFilled = false;
        // this.rect1.isStroked = true;
        // this.rect1.setStrokeStyle(2, 0xFF0000, 1);

        //add bg border
        this.add.sprite(0, 0, 'border').setOrigin(0, 0);

        // add egg (player 1)
        this.p1Egg = new Egg(this, game.config.width/2, game.config.height - borderUISize - 5, 'egg').setOrigin(0.5, 0).setScale(this.eggScale);
        
        // define keys
        // keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

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
            // restart button
            let restartButton = this.add.text(game.config.width/2, game.config.height/2 + 64, 'RESTART', scoreConfig).setOrigin(0.5);
            restartButton.setInteractive();
            restartButton.on('pointerdown', () => {
                this.sound.play('sfx_MC_select');
                this.scene.restart(); 
            });
            // menu button
            let menuButton = this.add.text(game.config.width/2, game.config.height/2 + 120, 'MENU', scoreConfig).setOrigin(0.5);
            menuButton.setInteractive();
            menuButton.on('pointerdown', () => {
                this.sound.play('sfx_MC_select');
                this.scene.start("menuScene");
            });
            this.gameOver = true;
        }, null, this);
    }

    update(time, delta) {
        //this.rect1.x = this.bee01.x;
        // check key input for restart
        // if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        //     this.sound.play('sfx_MC_select');
        //     this.scene.restart();
        // }
        // // check key input for menu
        // if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //     this.sound.play('sfx_MC_select');
        //     this.scene.start("menuScene");
        // }

        //this.starfield.tilePositionX -= starSpeed;

        if (!this.gameOver) {
            // add delay before egg is interactable to avoid misfires
            if(!this.eggCanThrow) {
                this.time.delayedCall(100, () => {            
                    this.p1Egg.update();    // update egg sprite
                }, null, this);
            }
            else {
                this.p1Egg.update();    // update egg sprite
            }

            this.bee01.update(time, delta);    // update bee
            this.bat01.update();    // update bats
            this.bat02.update();
            if (game.settings.bats == 3) {
                this.bat03.update();
            }
            this.cod01.update();    // update cod
            this.rabbit01.update();    // update rabbit
            if(this.chickenExists) {    //update chicken if it exists
                this.chicken01.update();
            }
        } 
        //check bee collisions
        if (this.checkCollision(this.p1Egg, this.bee01, this.beeScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.bee01, this.beeScale, this.beePoints, 'explosion', 'explode', 'sfx_bee_death');
        }
        //check bat collisions
        if (this.checkCollision(this.p1Egg, this.bat01, this.batScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.bat01, this.batScale, this.batPoints, 'explosion', 'explode', 'sfx_bat_death');
        }
        if (this.checkCollision(this.p1Egg, this.bat02, this.batScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.bat02, this.batScale, this.batPoints, 'explosion', 'explode', 'sfx_bat_death');
        }
        if (game.settings.bats == 3) {
            if (this.checkCollision(this.p1Egg, this.bat03, this.batScale)) {
                this.p1Egg.reset();
                this.entityExplode(this.bat03, this.batScale, this.batPoints, 'explosion', 'explode', 'sfx_bat_death');
            }
        }
        //check cod collisions
        if (this.checkCollision(this.p1Egg, this.cod01, this.codScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.cod01, this.codScale, this.codPoints, 'explosion', 'explode', 'sfx_cod_death');
        }
        //check rabbit collisions
        if (this.checkCollision(this.p1Egg, this.rabbit01, this.rabbitScale)) {
            this.p1Egg.reset();
            this.entityExplode(this.rabbit01, this.rabbitScale, this.rabbitPoints, 'explosion', 'explode', 'sfx_rabbit_death');
        }
        if(this.chickenExists) {
            if (this.checkCollision(this.p1Egg, this.chicken01, this.chickenScale)) {
                this.p1Egg.reset();
                this.entityExplode(this.chicken01, this.chickenScale, this.chickenPoints, 'explosion', 'explode', 'sfx_rabbit_death');
                this.chicken01.destroy();
                this.chickenExists = false;
            }
        }
    }
    checkCollision(egg, entity, scale) {
        if(egg.x < entity.x + entity.width*scale && egg.x + egg.width*scale/2 > entity.x && egg.y < entity.y + entity.height*scale && egg.height*this.eggScale + egg.y > entity.y) {
            return true;
        } else {
            return false;
        }
    }

    entityExplode(entity, scale, points, animSpritesheet, animKey, sfx) {
        //temporarily hide entity
        entity.alpha = 0;

        // simple particle emitter on entity death
        let particles = this.add.particles('egg_particle');
        particles.createEmitter({
            x : entity.x + entity.width*scale / 2,
            y : entity.y + entity.height*scale / 2,
            speed: { min: 0, max: 80 },
            angle: { min: 0, max: 360 },
            scale: { start: 3, end: 0 },
            blendMode: 'SCREEN',
            lifespan: 500,
            gravityY: 0
        });
        this.time.delayedCall(500, () => {
            particles.destroy();
            entity.reset();                   // reset entity position
            entity.alpha = 1;                 // make entity visible again
        });
        // text config for scoring points
        let goodTextConfig = {
            fontFamily: 'minecraft1',
            fontSize: '24px',
            color: '#00FF00',
            align: 'center',
        }
        // text config for subtracting points
        let badTextConfig = {
            fontFamily: 'minecraft1',
            fontSize: '24px',
            color: '#FF0000',
            align: 'center',
        }
        // + points text
        if(points > 0) {
            let scoreUp = this.add.text(entity.x + entity.width*scale / 2, entity.y + entity.height*scale / 2 + 20, '+' + points, goodTextConfig).setOrigin(0.5);
            this.time.delayedCall(500, () => {
                scoreUp.destroy();
            });
        }
        // - points text
        if(points < 0) {
            let scoreDown = this.add.text(entity.x + entity.width*scale / 2, entity.y + entity.height*scale / 2 + 20, points, badTextConfig).setOrigin(0.5);
            this.time.delayedCall(500, () => {
                scoreDown.destroy();
            });
        }
        if(Math.random() < 0.10 && entity != this.chicken01 && entity != this.bat01 && entity != this.bat02 && entity != this.bat03) {
            this.chicken01 = new Chicken(this, entity.x + entity.width*scale / 2, entity.y + entity.height*scale / 2, 'chicken', 0, this.chickenPoints).setOrigin(0, 0).setScale(this.chickenScale);
            this.chickenExists = true;
        }

        // create anim sprite at entity's position
        // let boom = this.add.sprite(entity.x, entity.y, animSpritesheet).setOrigin(0, 0);
        // boom.anims.play(animKey);             // play animation
        // boom.on('animationcomplete', () => {    // callback after anim completes
        //   entity.reset();                         // reset entity position
        //   entity.alpha = 1;                       // make entity visible again
        //   boom.destroy();                       // remove anim sprite
        // });
        entity.reset();                         // extra reset entity position to ensure it cant be immediately hit again
        // score add and repaint
        this.p1Score += entity.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play(sfx);
      }

}
