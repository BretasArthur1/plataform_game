class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu',
            backgroundColor: '#000',
        });
    }

    preload() {
        // Carregar recursos
        this.load.image("menu", "assets/menu_florest.png");
        this.load.image("play_button", "assets/play_button.png");
        this.load.image("options_button", "assets/options_button.png");
    }

    create() {
        // Adicionar imagem de fundo
        this.add.image(400, 300, "menu");

        // Adicionar botão de "play"
        const playButton = this.add.image(400, 300, 'play_button').setOrigin(0.5).setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Adicionar botão de "options"
        const optionsButton = this.add.image(400, 500, 'options_button').setOrigin(0.5).setInteractive();
        optionsButton.on('pointerdown', () => {
            // Exibir texto de tutorial
            const tutorialText = this.add.text(400, 100, 'Use as teclas W, A, D para se mover', {
                fontFamily: 'Arial',
                fontSize: 24,
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            // Configurar um temporizador para remover o texto após alguns segundos
            this.time.delayedCall(5000, () => {
                tutorialText.destroy();
            });
        });

        // Configurar tecla ENTER para iniciar o jogo
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('GameScene');
        });
    }
}
