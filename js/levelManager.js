¡Perfecto! 🏗️

Paso 5: Crear 
js/levelManager.js

Ahora vamos a crear el sistema de niveles con plataformas, bloques y obstáculos:

¡Genial! 🎮 Ahora tenemos un sistema de niveles completo con:

Diferentes tipos de bloques
 (suelo, plataformas, ladrillos, tuberías)
Colisiones perfectas
 con todas las plataformas
Nivel de prueba
 con obstáculos variados
Fácil de expandir
 para crear más niveles
Siguiente paso:
 ¿Creamos el 
js/main.js
 final para que todo funcione junto? 🚀

// js/levelManager.js - Manejo de niveles y plataformas

// Clase para las plataformas/bloques
class Platform {
    constructor(x, y, width, height, type = 'ground') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type; // ground, platform, brick, pipe
    }
    
    // Dibujar la plataforma
    draw(ctx) {
        switch(this.type) {
            case 'ground':
                // Suelo marrón con césped verde
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = '#228B22';
                ctx.fillRect(this.x, this.y, this.width, 8);
                break;
                
            case 'platform':
                // Plataforma dorada
                ctx.fillStyle = '#DAA520';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                // Borde más oscuro
                ctx.strokeStyle = '#B8860B';
                ctx.lineWidth = 2;
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;
                
            case 'brick':
                // Ladrillo rojo
                ctx.fillStyle = '#CD853F';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                // Líneas de ladrillos
                ctx.strokeStyle = '#A0522D';
                ctx.lineWidth = 1;
                for (let i = 0; i < this.width; i += 16) {
                    ctx.beginPath();
                    ctx.moveTo(this.x + i, this.y);
                    ctx.lineTo(this.x + i, this.y + this.height);
                    ctx.stroke();
                }
                for (let i = 0; i < this.height; i += 16) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y + i);
                    ctx.lineTo(this.x + this.width, this.y + i);
                    ctx.stroke();
                }
                break;
                
            case 'pipe':
                // Tubería verde
                ctx.fillStyle = '#228B22';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                // Borde de la tubería
                ctx.fillStyle = '#32CD32';
                ctx.fillRect(this.x, this.y, this.width, 8);
                ctx.fillRect(this.x, this.y, 4, this.height);
                ctx.fillRect(this.x + this.width - 4, this.y, 4, this.height);
                break;
        }
    }
}

// Clase para manejar niveles
class LevelManager {
    constructor() {
        this.currentLevel = 1;
        this.platforms = [];
        this.loadLevel(1);
    }
    
    // Cargar un nivel específico
    loadLevel(levelNumber) {
        this.platforms = [];
        
        switch(levelNumber) {
            case 1:
                this.createLevel1();
                break;
            default:
                this.createLevel1();
        }
    }
    
    // Crear el nivel 1
    createLevel1() {
        // Suelo principal
        this.platforms.push(new Platform(0, 374, 300, 100, 'ground'));
        this.platforms.push(new Platform(350, 374, 200, 100, 'ground'));
        this.platforms.push(new Platform(600, 374, 200, 100, 'ground'));
        
        // Plataformas flotantes
        this.platforms.push(new Platform(200, 320, 80, 16, 'platform'));
        this.platforms.push(new Platform(400, 280, 100, 16, 'platform'));
        this.platforms.push(new Platform(150, 240, 60, 16, 'platform'));
        this.platforms.push(new Platform(500, 200, 80, 16, 'platform'));
        
        // Bloques de ladrillo
        this.platforms.push(new Platform(320, 300, 32, 32, 'brick'));
        this.platforms.push(new Platform(352, 300, 32, 32, 'brick'));
        this.platforms.push(new Platform(320, 268, 32, 32, 'brick'));
        
        // Tubería
        this.platforms.push(new Platform(650, 310, 48, 64, 'pipe'));
        
        // Plataformas altas
        this.platforms.push(new Platform(300, 160, 100, 16, 'platform'));
        this.platforms.push(new Platform(450, 120, 80, 16, 'platform'));
    }
    
    // Verificar colisiones del jugador con las plataformas
    checkCollisions(player) {
        player.onGround = false;
        
        this.platforms.forEach(platform => {
            // Verificar si hay colisión
            if (player.x < platform.x + platform.width &&
                player.x + player.width > platform.x &&
                player.y < platform.y + platform.height &&
                player.y + player.height > platform.y) {
                
                // Calcular overlaps para determinar el lado de colisión
                const overlapX = Math.min(
                    player.x + player.width - platform.x,
                    platform.x + platform.width - player.x
                );
                const overlapY = Math.min(
                    player.y + player.height - platform.y,
                    platform.y + platform.height - player.y
                );
                
                // Resolver colisión por el lado con menor overlap
                if (overlapX < overlapY) {
                    // Colisión horizontal
                    if (player.x < platform.x) {
                        player.x = platform.x - player.width;
                    } else {
                        player.x = platform.x + platform.width;
                    }
                    player.velX = 0;
                } else {
                    // Colisión vertical
                    if (player.y < platform.y) {
                        // Aterrizando en la plataforma
                        player.y = platform.y - player.height;
                        player.velY = 0;
                        player.onGround = true;
                    } else {
                        // Golpeando desde abajo
                        player.y = platform.y + platform.height;
                        player.velY = 0;
                    }
                }
            }
        });
    }
    
    // Dibujar todas las plataformas
    draw(ctx) {
        this.platforms.forEach(platform => {
            platform.draw(ctx);
        });
    }
    
    // Dibujar fondo del nivel
    drawBackground(ctx) {
        // Nubes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.drawCloud(ctx, 100, 80);
        this.drawCloud(ctx, 300, 60);
        this.drawCloud(ctx, 500, 90);
        this.drawCloud(ctx, 700, 70);
        
        // Montañas de fondo
        ctx.fillStyle = 'rgba(34, 139, 34, 0.6)';
        ctx.beginPath();
        ctx.moveTo(0, 450);
        ctx.lineTo(150, 200);
        ctx.lineTo(300, 450);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(200, 450);
        ctx.lineTo(400, 180);
        ctx.lineTo(600, 450);
        ctx.fill();
    }
    
    // Dibujar una nube
    drawCloud(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.arc(x + 20, y, 20, 0, Math.PI * 2);
        ctx.arc(x + 40, y, 15, 0, Math.PI * 2);
        ctx.arc(x + 20, y - 10, 12, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Crear el manejador de niveles
let levelManager = new LevelManager();


