class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('ground', 'assets/tijolos.png');
        this.load.image('bg', 'assets/bg.png');
        this.load.spritesheet('carinha', 'assets/carinha2.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('coin', 'assets/coin.png');
    }

    create() {
        let platforms = this.physics.add.staticGroup();
        //chao e plataformas
        platforms.create(400, 630, 'ground').setScale(5).refreshBody();
        platforms.create(600, 330, 'ground').setScale(2.5);
        platforms.create(150, 160, 'ground').setScale(2.5);
        //  A imagem de fundo do jogo
        this.add.image(400, 300, 'bg'); // Define a profundidade para colocar o fundo atrás das plataformas

        // sprite do personagem
        var player = this.physics.add.sprite(100, 450, 'carinha');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // movimento para direita
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('carinha', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'carinha', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('carinha', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // teclas de movimento
        let cursors = this.input.keyboard.createCursorKeys();
        let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // Variáveis para moedas
        let coins = this.physics.add.group({
            key: 'coin',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        coins.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        //  The score
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        //  Collide the player and the coins with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(coins, platforms);

        //  Checks to see if the player overlaps with any of the coins, if he does call the collectCoin function
        this.physics.add.overlap(player, coins, this.collectCoin, null, this);

        // Adicionando as variáveis ao contexto da cena
        this.player = player;
        this.platforms = platforms;
        this.cursors = cursors;
        this.keyA = keyA;
        this.keyW = keyW;
        this.keyD = keyD;
        this.coins = coins;
    }

    update() {
        // Lógica de movimento do personagem
        let player = this.player;
        let cursors = this.cursors;
        let keyA = this.keyA;
        let keyD = this.keyD;
        let keyW = this.keyW;

        if (cursors.left.isDown || keyA.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        } else if (cursors.right.isDown || keyD.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if ((cursors.up.isDown || keyW.isDown) && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
        score += 10;
        this.scoreText.setText('Score: ' + score);
    }
}
