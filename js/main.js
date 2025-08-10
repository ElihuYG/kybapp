// Obtener el canvas y contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuración del juego
const gameConfig = {
    width: canvas.width,
    height: canvas.height,
    fps: 60,
    running: true
};

// Cámara del juego
const camera = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    smoothing: 0.1
};

// Función principal de actualización
function update() {
    if (!gameConfig.running) return;
    
    // Actualizar Mario
    mario.update();
    
    // Verificar colisiones con el nivel
    levelManager.checkCollisions(mario);
    
    // Actualizar cámara
    updateCamera();
    
    // Limpiar los inputs "pressed" después de usarlos
    clearInputPressed();
}

// Actualizar la cámara para seguir a Mario
function updateCamera() {
    // La cámara sigue a Mario horizontalmente
    camera.targetX = mario.x - gameConfig.width / 2;
    
    // Limitar la cámara para que no se salga del nivel
    if (camera.targetX < 0) camera.targetX = 0;
    if (camera.targetX > 800 - gameConfig.width) camera.targetX = 800 - gameConfig.width;
    
    // Suavizar el movimiento de la cámara
    camera.x += (camera.targetX - camera.x) * camera.smoothing;
    camera.y += (camera.targetY - camera.y) * camera.smoothing;
}

// Función principal de renderizado
function render() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, gameConfig.width, gameConfig.height);
    
    // Guardar el contexto para aplicar la cámara
    ctx.save();
    
    // Aplicar transformación de cámara
    ctx.translate(-camera.x, -camera.y);
    
    // Dibujar fondo del nivel
    levelManager.drawBackground(ctx);
    
    // Dibujar las plataformas del nivel
    levelManager.draw(ctx);
    
    // Dibujar a Mario
    mario.draw(ctx);
    
    // Restaurar el contexto
    ctx.restore();
    
    // Dibujar UI (sin cámara)
    drawUI();
}

// Dibujar interfaz de usuario
function drawUI() {
    // Información de debug (opcional)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 80);
    
    ctx.fillStyle = 'white';
    ctx.font = '8px "Press Start 2P"';
    ctx.fillText(`X: ${Math.round(mario.x)}`, 15, 25);
    ctx.fillText(`Y: ${Math.round(mario.y)}`, 15, 40);
    ctx.fillText(`VelX: ${mario.velX.toFixed(1)}`, 15, 55);
    ctx.fillText(`VelY: ${mario.velY.toFixed(1)}`, 15, 70);
    ctx.fillText(`Estado: ${mario.state}`, 15, 85);
    
    // Título del juego
    ctx.fillStyle = '#FF6B6B';
    ctx.font = '12px "Press Start 2P"';
    ctx.fillText('NEW SUPER MARIO BROS', gameConfig.width - 250, 25);
    
    // Controles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '6px "Press Start 2P"';
    ctx.fillText('WASD: MOVER | ESPACIO: SALTAR', gameConfig.width - 200, gameConfig.height - 10);
}

// Bucle principal del juego
function gameLoop() {
    update();
    render();
    
    if (gameConfig.running) {
        requestAnimationFrame(gameLoop);
    }
}

// Función para iniciar el juego
function startGame() {
    console.log('🎮 New Super Mario Bros iniciado!');
    console.log('🕹️ Controles: WASD para mover, Espacio para saltar');
    
    // Actualizar el texto de la página
    document.querySelector('.game-info p').textContent = 'Juego funcionando! 🎮';
    
    // Iniciar el bucle del juego
    gameLoop();
}

// Función para pausar/reanudar el juego
function togglePause() {
    gameConfig.running = !gameConfig.running;
    if (gameConfig.running) {
        gameLoop();
    }
}

// Eventos adicionales
document.addEventListener('keydown', function(e) {
    // Pausar con P
    if (e.code === 'KeyP') {
        togglePause();
    }
    
    // Reiniciar con R
    if (e.code === 'KeyR') {
        mario.x = 100;
        mario.y = 300;
        mario.velX = 0;
        mario.velY = 0;
        camera.x = 0;
        camera.y = 0;
    }
});

// Iniciar el juego cuando se carga la página
window.addEventListener('load', function() {
    // Pequeña pausa para asegurar que todo esté cargado
    setTimeout(startGame, 100);
});

// Manejar cambio de tamaño de ventana
window.addEventListener('resize', function() {
    // Aquí podrías ajustar el canvas si quisieras hacerlo responsive
});

// Prevenir el menú contextual en el canvas
canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Información de consola para debug
console.log('🍄 New Super Mario Bros - Sistema cargado');
console.log('📁 Archivos cargados: input.js, gameObjects.js, levelManager.js, main.js');
console.log('🎯 Listo para jugar!');
