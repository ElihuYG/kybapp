// js/gameObjects.js - Objetos del juego (Mario, enemigos, etc.)

// Clase principal del jugador (Mario)
class Player {
    constructor(x, y) {
        // Posición y tamaño
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 24;
        
        // Velocidad
        this.velX = 0;
        this.velY = 0;
        
        // Propiedades de física
        this.speed = 3;
        this.jumpPower = 12;
        this.gravity = 0.5;
        this.friction = 0.8;
        this.maxSpeed = 5;
        
        // Estado
        this.onGround = false;
        this.facing = 1; // 1 = derecha, -1 = izquierda
        this.state = 'idle'; // idle, walking, jumping, falling
        
        // Animación
        this.animFrame = 0;
        this.animSpeed = 0.15;
    }
    
    // Actualizar el jugador cada frame
    update() {
        this.handleInput();
        this.applyPhysics();
        this.updateAnimation();
        this.checkBounds();
    }
    
    // Manejar controles WASD
    handleInput() {
        // Movimiento horizontal
        if (input.left) {
            this.velX -= 0.5;
            this.facing = -1;
            if (this.onGround) this.state = 'walking';
        }
        
        if (input.right) {
            this.velX += 0.5;
            this.facing = 1;
            if (this.onGround) this.state = 'walking';
        }
        
        // Salto (W o Espaciadora)
        if ((input.upPressed || input.jumpPressed) && this.onGround) {
            this.velY = -this.jumpPower;
            this.onGround = false;
            this.state = 'jumping';
        }
        
        // Limitar velocidad horizontal
        if (this.velX > this.maxSpeed) this.velX = this.maxSpeed;
        if (this.velX < -this.maxSpeed) this.velX = -this.maxSpeed;
    }
    
    // Aplicar física (gravedad, fricción)
    applyPhysics() {
        // Fricción horizontal
        this.velX *= this.friction;
        
        // Gravedad
        if (!this.onGround) {
            this.velY += this.gravity;
        }
        
        // Actualizar posición
        this.x += this.velX;
        this.y += this.velY;
        
        // Determinar estado según velocidad
        if (!this.onGround) {
            this.state = this.velY < 0 ? 'jumping' : 'falling';
        } else if (Math.abs(this.velX) < 0.1) {
            this.state = 'idle';
        }
    }
    
    // Actualizar animación
    updateAnimation() {
        if (this.state === 'walking') {
            this.animFrame += this.animSpeed;
        } else {
            this.animFrame += 0.05;
        }
    }
    
    // Verificar límites de pantalla
    checkBounds() {
        // Suelo temporal (después lo quitamos cuando tengamos niveles)
        if (this.y > 350) {
            this.y = 350;
            this.velY = 0;
            this.onGround = true;
        }
        
        // Límites laterales
        if (this.x < 0) this.x = 0;
        if (this.x > 800 - this.width) this.x = 800 - this.width;
    }
    
    // Dibujar el jugador
    draw(ctx) {
        ctx.save();
        
        // Voltear sprite si mira a la izquierda
        if (this.facing === -1) {
            ctx.scale(-1, 1);
            ctx.translate(-(this.x + this.width), 0);
        } else {
            ctx.translate(this.x, 0);
        }
        
        // Color base según estado
        let bodyColor = '#FF6B6B';
        if (this.state === 'jumping') bodyColor = '#FF8E8E';
        if (this.state === 'falling') bodyColor = '#FF4444';
        
        // Cuerpo principal
        ctx.fillStyle = bodyColor;
        ctx.fillRect(0, this.y, this.width, this.height);
        
        // Gorra roja
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(2, this.y - 4, this.width - 4, 8);
        
        // Logo M en la gorra
        ctx.fillStyle = 'white';
        ctx.fillRect(6, this.y - 2, 2, 4);
        ctx.fillRect(10, this.y - 2, 2, 4);
        ctx.fillRect(8, this.y - 1, 2, 2);
        
        // Cara
        ctx.fillStyle = '#FFDBAC';
        ctx.fillRect(3, this.y + 4, this.width - 6, 8);
        
        // Ojos
        ctx.fillStyle = 'black';
        ctx.fillRect(5, this.y + 6, 2, 2);
        ctx.fillRect(11, this.y + 6, 2, 2);
        
        // Bigote
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(6, this.y + 10, 6, 2);
        
        // Overol azul
        ctx.fillStyle = '#0066CC';
        ctx.fillRect(2, this.y + 12, this.width - 4, 8);
        
        // Botones del overol
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(4, this.y + 14, 2, 2);
        ctx.fillRect(12, this.y + 14, 2, 2);
        
        // Piernas (animación de caminar)
        ctx.fillStyle = '#0066CC';
        if (this.state === 'walking') {
            const legOffset = Math.sin(this.animFrame * 2) * 1;
            ctx.fillRect(3, this.y + 20, 4, 4 + legOffset);
            ctx.fillRect(11, this.y + 20, 4, 4 - legOffset);
        } else {
            ctx.fillRect(3, this.y + 20, 4, 4);
            ctx.fillRect(11, this.y + 20, 4, 4);
        }
        
        // Zapatos
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(2, this.y + 22, 6, 3);
        ctx.fillRect(10, this.y + 22, 6, 3);
        
        ctx.restore();
    }
}

// Crear el jugador Mario
let mario = new Player(100, 300);
